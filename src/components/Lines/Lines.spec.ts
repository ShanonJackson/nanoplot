import { describe, expect, it } from "bun:test";
import raw from "../../app/examples/performance/lines/uplot/data.json";
import { CoordinatesUtils } from "../../utils/coordinates/coordinates";
import type { InternalGraphContext } from "../../hooks/use-graph/use-graph";
import { benchmark } from "../../utils/benchmark/benchmark";
import { ArrayUtils } from "../../utils/array";
import { CurveUtils, linearRange } from "../../utils/path/curve";

// Build a dataset similar to the example page (one series is enough for bench)
type Point = { x: Date; y: number };

const toSeries = () => {
  const data = raw as unknown as number[][];
  const ts = data[0];
  const series = data[1]; // e.g., RAM series, numeric
  const points: Point[] = new Array(ts.length);
  for (let i = 0; i < ts.length; i++) points[i] = { x: new Date(ts[i] * 1000), y: series[i] };
  return points;
};

function makeLinearContext(points: Point[]): Pick<InternalGraphContext, "viewbox" | "domain"> {
  const viewbox = { x: 1000, y: 400 };
  // Compute domain extents
  const xMin = +points[0].x, xMax = +points[points.length - 1].x;
  let yMin = Infinity, yMax = -Infinity;
  for (let i = 0; i < points.length; i++) {
    const y = points[i].y;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  }
  // Use simple 2-point uniform ticks spanning full viewbox
  const domain = {
    x: [
      { tick: new Date(xMin), coordinate: 0 },
      { tick: new Date(xMax), coordinate: viewbox.x },
    ],
    y: [
      { tick: yMin, coordinate: viewbox.y },
      { tick: yMax, coordinate: 0 },
    ],
  } as InternalGraphContext["domain"];
  return { viewbox, domain };
}

describe("components/Lines bench (uplot example parity)", () => {
  it("bench: linear path for whole series", () => {
    const points = toSeries();
    const ctx = makeLinearContext(points);
    const linearForDataset = CoordinatesUtils.linear(ctx);

    // warm-up (new array to avoid cache)
    linearForDataset(points.slice());

    const avg = benchmark(() => {
      // pass a fresh array ref each time to bypass WeakMap cache
      linearForDataset(points.slice());
    }, 40);
    console.log("Lines.linear avg ms (whole series):", avg.toFixed(4));
    expect(Number.isFinite(avg)).toBe(true);
  });

  it("bench: chunked linear path (size=2000)", () => {
    const points = toSeries();
    const ctx = makeLinearContext(points);
    const linearForDataset = CoordinatesUtils.linear(ctx);

    // warm-up once (new array)
    linearForDataset(points.slice(0, 2000).slice());

    const size = 2000;
    const avg = benchmark(() => {
      const ranges = ArrayUtils.chunkIndices(points.length, size);
      for (let r = 0; r < ranges.length; r++) {
        const [s, e] = ranges[r];
        // fresh array per chunk to bypass cache
        linearForDataset(points.slice(s, e).slice());
      }
    }, 20);
    console.log("Lines.linear avg ms (chunked size=2000):", avg.toFixed(4));
    expect(Number.isFinite(avg)).toBe(true);
  });

  it("bench: linearRange with precomputed XY (whole)", () => {
    const points = toSeries();
    const ctx = makeLinearContext(points);
    const toXY = CoordinatesUtils.xyCoordinatesForDataset(ctx);
    const xy = toXY(points);

    // warm-up
    linearRange(xy, 0, points.length);

    const avg = benchmark(() => {
      linearRange(xy, 0, points.length);
    }, 40);
    console.log("CurveUtils.linearRange avg ms (whole):", avg.toFixed(4));
    expect(Number.isFinite(avg)).toBe(true);
  });

  it("bench: linearRange with precomputed XY (chunked size=2000)", () => {
    const points = toSeries();
    const ctx = makeLinearContext(points);
    const toXY = CoordinatesUtils.xyCoordinatesForDataset(ctx);
    const xy = toXY(points);
    const size = 2000;

    // warm-up
    linearRange(xy, 0, Math.min(size, points.length));

    const avg = benchmark(() => {
      const ranges = ArrayUtils.chunkIndices(points.length, size);
      for (let r = 0; r < ranges.length; r++) {
        const [s, e] = ranges[r];
        linearRange(xy, s, e);
      }
    }, 20);
    console.log("CurveUtils.linearRange avg ms (chunked size=2000):", avg.toFixed(4));
    expect(Number.isFinite(avg)).toBe(true);
  });
});
