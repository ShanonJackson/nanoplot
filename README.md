<div align="center">
  <a href="https://nanoplot.com">
    <img src="https://nanoplot.com/nanoplot_logo.jpg" alt="Nanoplot Logo" width="80" height="80" />
  </a>
  <h1>Nanoplot</h1>
</div>

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
import { Graph } from "nanoplot/graph";
import { Pie } from "nanoplot/pie";

<Graph data={[{name: "Male", value: 50}, {name: "Female", value: 50}]}>
    <Pie />
</Graph>
```

Step 2: Clone your Forked Repository
 1. Go to Your Forked Repository: Navigate to your GitHub profile and find the newly forked repository.
 2. Copy the Clone URL:
    * Click on the green Code button.
    * Choose either HTTPS, SSH, or GitHub CLI based on your preference and copy the URL.
 3. Open Your Terminal: Open a terminal or command prompt on your local machine.
 4. Run the Clone Command: Use the git clone https//xxxx.git command to clone your forked repository:

Step 3:  Navigate into Your Cloned Repository and install bun packages:
   
    ```bash
    cd nanoplot
    bun install
    bun run dev
    ```

    The application should run locally on your machine on port: 3000

Step 4:  Start Implementing




