## Conventions
- EventListeners that provide a custom argument will always have it first and be named ""onEvent""
```ts
type Props = {
    onMouseMove: (rect: Rect, e: MouseEvent) => void;
}
```
- Cosmetic props should always default false.
```ts
type Props = {
    glow?: boolean; /* default false */
}
```
- Graphs should never expose SVG elements.
- Labels should default to false.
- Graphs should never expose coordinates; only values I.E <overlay.div x={100} y={150}/>
- Graphs should support everything, but sometimes for advanced use cases through exporting primitives.
- Graphs that have dataset support should be recursive components;
I.E <Lines dataset={"lines_dataset"}/> should internally itself render <Lines context={useDataset("lines_dataset")}/>
- Root graphs should always be server components. <Lines/>, <Bars/> etc. Interactive components can be either; <Lines.Tooltip/>