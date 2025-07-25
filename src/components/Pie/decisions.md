### Decisions Registry
- <Pie.Labels/> with advanced options not easily possible as you need to know 'donut', 'loading', 'radius' props on <Pie/> which you don't have access to.
- preserveAspectRatio={undefined} instead of "none" so that the SVG doesn't warp.
- 1/1 Aspect Ratio avoided because we want Pie graphs to be allowed to be wider than they are tall (to fit long labels outside).