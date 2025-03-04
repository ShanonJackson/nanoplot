const esbuild = require("esbuild");
const postCssPlugin = require("@deanc/esbuild-plugin-postcss");
const { sassPlugin, postcssModules } = require("esbuild-sass-plugin");

const path = require("path");

const componentExports = [
	"./src/components/Sunburst/Sunburst.tsx",
	"./src/components/Bars/Bars.tsx",
	"./src/components/Lines/Lines.tsx",
	"./src/components/Pie/Pie.tsx",
	"./src/components/Scatter/Scatter.tsx",
	"./src/components/Worldmap/Worldmap.tsx",
	"./src/components/XAxis/XAxis.tsx",
	"./src/components/YAxis/YAxis.tsx",
	"./src/components/GridLines/GridLines.tsx",
	"./src/components/Radar/Radar.tsx",
	"./src/components/Legend/Legend.tsx",
	"./src/components/Graph/Graph.tsx",
	"./src/components/Tooltip/Tooltip.tsx",
	"./src/components/Tooltip/Popup.tsx",
	"./src/components/Overlay/Overlay.tsx",
];

await esbuild
	.build({
		entryPoints: componentExports,
		bundle: true,
		splitting: true,
		minify: true,
		treeShaking: true,
		format: "esm",
		outdir: "./dist",
		external: ["react", "react-dom"],
		loader: { ".scss": "css" }, // Handle SCSS files
		plugins: [
			sassPlugin({
				transform: postcssModules({
					filter: /\.module\.scss$/,
					basedir: __dirname,
					localsConvention: "camelCaseOnly",
				}),
			}), // Process SCSS
			postCssPlugin({
				plugins: [require("autoprefixer")()],
			}),
		],
	})
	.catch(() => process.exit(1));

const fs = require("fs");

// rename ./dist/library-global.css to ./dist/index.css
fs.appendFileSync("./dist/index.css", fs.readFileSync("./dist/Worldmap/Worldmap.css", "utf-8"));
fs.appendFileSync("./dist/index.css", fs.readFileSync("./dist/Tooltip/Tooltip.css", "utf-8"));
// fs.unlinkSync("./dist/Worldmap/Worldmap.css");

// delete everything in ./dist except index.css
const index = fs.readFileSync("./dist/index.css", "utf-8");
fs.rmdirSync("./dist", { recursive: true });
fs.mkdirSync("./dist");
fs.writeFileSync("./dist/index.css", index);
