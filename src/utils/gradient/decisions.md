## Gradient Decisions
- Support implicit starts/ends `linear-gradient(to right, <red> 40%, <black> 80%)`
Would be red 0% red 40%, black 80% black 100%
- Percent gradients would be always applied to the 'plotted thing' that are tied to 0% meaning browsers interpretation of 0%
```html
<linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
<stop offset="0%" stop-color="#534AB7"/>
<stop offset="50%" stop-color="#1D9E75"/>
<stop offset="100%" stop-color="#EF9F27"/>
</linearGradient>
<line stroke="url(#g1)"
```
- Gradients with NON-PERCENT values AND "mask:" prefix are relative to the coordinate space I.E `mask:linear-gradient(to top, <red> 400, <black> 1500)`
    - 'to top' = Values are relative to Y AXIS
    - 'to bottom' = Values are relative to Y Axis (but gradient goes downwards)
    - 'to right' = Values are relative to X axis
    - 'to left' = Values are relative to X axis (but gradient starts on right)
    - Implicit start/end values are 'inferred' as 0% = (min on that axes), 100% = max on that axes. I.E gradient above if Y Axis was 0->2000 linear gradient would be interpreted as to top (y axis), red 0, red 400, black 1500, black 2000
    - If the end is explicit this isn't required i.e `linear-gradient(to top, <red> 400, <black> 1500, <black 2000>)` a stop wont be added with 'implicit end'.
    - Percents and Values relative to Axes cannot be mix-matched i.e this would be invalid `linear-gradient(to top, <red> 20%, <black> 1500)`
