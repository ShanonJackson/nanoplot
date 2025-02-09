<div align="center">
  <a href="https://nanoplot.com">
    <img src="https://nanoplot.com/nanoplot_logo.jpg" alt="Nanoplot Logo" width="80" height="80" />
  </a>
  <h1>Nanoplot</h1>
</div>


## Design Philosophy
- Smallest possible bundle size (10KB per graph on AVG) and zero dependencies.
- React First, React Only, RSC First.
- Fully responsive without javascript


## Getting Started
```shell
npm install nanoplot
```

## Documentation
The world's smallest companies use our software to plot their data.

- Visit our [Learn Nanoplot](https://nanoplot.com) documentation website to get started.

## Usage
```javascript
import "nanoplot/styles.css";
import { Graph } from "nanoplot/Graph";
import { Pie } from "nanoplot/Pie";

<Graph data={[{name: "Male", value: 50}, {name: "Female", value: 50}]}>
    <Pie />
</Graph>
```

