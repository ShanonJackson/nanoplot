import React, { CSSProperties, HTMLAttributes, ReactNode, useId } from "react";
import {
  CartesianDataset,
  GraphContext,
  GraphContextProvider,
  InternalGraphContext,
  SegmentDataset,
  useGraphColumn,
} from "../../hooks/use-graph/use-graph";
import { ChildrenUtils } from "../../utils/children/children";
import { GraphUtils } from "../../utils/graph/graph";
import { ColorUtils } from "../../utils/color/color";
import { tw } from "../../utils/cx/cx";
import { useIsServerComponent } from "../../hooks/use-is-server-component";

type Props = {
  data?: CartesianDataset | SegmentDataset;
  datasets?: Record<string, CartesianDataset | SegmentDataset>;
  gap?: { top?: number; right?: number; bottom?: number; left?: number };
  interactions?: { hovered?: string[]; pinned?: string[] };
  zoom?: { x?: [number, number]; y?: [number, number] };
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

// Draft goals:
// - Defer domain ticks: leave ctx.domain empty; let axes populate via their .context
// - Avoid heavy per-series transforms; only set minimal defaults (id/stroke/fill)
// - Build dataset contexts shallowly without computing their domains up-front

export const GraphDraft = ({ data = [], gap, children, interactions, datasets = {}, zoom, style, className }: Props) => {
  const id = useId();
  const X_SCALE = 3000;
  const Y_SCALE = 3000;
  const isServerComponent = useIsServerComponent();

  // Minimal defaults for series (id/stroke/fill) without domain computation
  const colorize = (ctx: GraphContext): InternalGraphContext => {
    const colors = ColorUtils.scheme.contrast;
    const dxy = GraphUtils.isXYData(ctx.data)
      ? ctx.data.map((dp, i) => ({
          id: dp.id ?? dp.name,
          stroke: dp.stroke ?? dp.fill ?? colors[i] ?? colors.at(-1),
          fill: dp.fill ?? dp.stroke ?? colors[i] ?? colors.at(-1),
          ...dp,
        }))
      : ctx.data
          .toSorted((a, b) => Number(b.value) - Number(a.value))
          .map((dp, i) => ({
            id: dp.id ?? dp.name,
            stroke: dp.stroke ?? dp.fill ?? colors[i] ?? colors.at(-1),
            fill: dp.fill ?? dp.stroke ?? colors[i] ?? colors.at(-1),
            ...dp,
          }));

    // Build shallow dataset contexts: no domain ticks yet (axes will fill)
    const ds: InternalGraphContext["datasets"] = Object.fromEntries(
      Object.entries(datasets).map(([datasetId, dataset]) => {
        const dctx: GraphContext = {
          id: ctx.id,
          attributes: ctx.attributes,
          gap: ctx.gap,
          viewbox: ctx.viewbox,
          data: dataset,
          layout: ctx.layout,
          zoom: ctx.zoom,
          domain: { x: [], y: [] },
          colors,
          interactions: ctx.interactions,
          datasets: {},
        };
        const series = GraphUtils.isXYData(dataset)
          ? (dataset as CartesianDataset).map((dp, i) => ({
              id: dp.id ?? dp.name,
              stroke: dp.stroke ?? dp.fill ?? colors[i] ?? colors.at(-1),
              fill: dp.fill ?? dp.stroke ?? colors[i] ?? colors.at(-1),
              ...dp,
            }))
          : (dataset as SegmentDataset)
              .toSorted((a, b) => Number(b.value) - Number(a.value))
              .map((dp, i) => ({
                id: dp.id ?? dp.name,
                stroke: dp.stroke ?? dp.fill ?? colors[i] ?? colors.at(-1),
                fill: dp.fill ?? dp.stroke ?? colors[i] ?? colors.at(-1),
                ...dp,
              }));
        return [datasetId, { ...dctx, data: series }];
      }),
    );

    return {
      id: ctx.id,
      attributes: ctx.attributes,
      gap: ctx.gap,
      viewbox: ctx.viewbox,
      data: dxy as any,
      layout: ctx.layout,
      zoom: ctx.zoom,
      // Defer ticks to axes via .context
      domain: { x: [], y: [] },
      colors,
      interactions: ctx.interactions,
      datasets: ds,
    };
  };

  const base: GraphContext = {
    id,
    zoom: { x: zoom?.x ?? [0, 100], y: zoom?.y ?? [0, 100] },
    layout: { rows: "[graph]auto", columns: "[graph]auto" },
    viewbox: { x: X_SCALE, y: Y_SCALE },
    data,
    gap: { top: gap?.top ?? 0, left: gap?.left ?? 0, right: gap?.right ?? 0, bottom: gap?.bottom ?? 0 },
    attributes: {
      className: "@container/graph relative grid h-full w-full isolate",
    },
    // Leave empty; axes will populate
    domain: { x: [], y: [] },
    colors: ColorUtils.scheme.contrast,
    interactions: { hovered: interactions?.hovered ?? [], pinned: interactions?.pinned ?? [] },
    datasets, // keep raw; we’ll colorize shallowly in colorize()
  };

  // Let children’s .context mutate the base context first
  const ctxWithChildren = ChildrenUtils.context(children, base);
  // Then apply minimal colorization and shallow dataset contexts (no domain ticks)
  const colorized = colorize(ctxWithChildren);

  return (
    <div
      id={id}
      data-ctx={"graph"}
      {...base.attributes}
      style={{
        ...style,
        ...base.attributes.style,
        gridTemplateColumns: base.layout.columns,
        gridTemplateRows: base.layout.rows,
        padding: `${base.gap.top}px ${base.gap.right}px ${base.gap.bottom}px ${base.gap.left}px`,
      }}
      className={tw(base.attributes.className, className)}
    >
      {isServerComponent && (
        <script id={id + "-context"} type={"application/json"} dangerouslySetInnerHTML={{ __html: JSON.stringify(colorized) }} />
      )}
      <GraphContextProvider value={colorized}>{children}</GraphContextProvider>
    </div>
  );
};

GraphDraft.Row = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  const column = useGraphColumn();
  return (
    <>
      {column.left === 1 ? <div /> : new Array(column.left).fill(null).map((_, i) => <div key={i} />)}
      <div {...rest}>{children}</div>
      {column.right === 1 ? <div /> : new Array(column.right).fill(null).map((_, i) => <div key={i} />)}
    </>
  );
};

GraphDraft.Column = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  return <div {...rest}>{children}</div>;
};

