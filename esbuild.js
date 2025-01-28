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
				plugins: [require("tailwindcss")(path.resolve(__dirname, "tailwind.config.ts")), require("autoprefixer")()],
			}),
		],
	})
	.catch(() => process.exit(1));

await esbuild
	.build({
		entryPoints: ["./src/styles/library-global.css"],
		bundle: true,
		outdir: "./dist",
		loader: { ".scss": "css" }, // Handle SCSS files
		plugins: [
			postCssPlugin({
				plugins: [require("tailwindcss")(path.resolve(__dirname, "tailwind.config.ts")), require("autoprefixer")()],
				modules: {
					generateScopedName: "[name]__[local]___[hash:base64:5]", // Scoped class names for CSS Modules
				},
			}),
		],
		minify: true, // Minify the CSS output
	})
	.catch(() => process.exit(1));

const fs = require("fs");

// rename ./dist/library-global.css to ./dist/index.css
fs.renameSync("./dist/library-global.css", "./dist/index.css");

// move every d.ts file in ./dist/components/<component-name/<component-name>.d.ts to ./dist/<component-name>/<component-name>.d.ts
const components = fs.readdirSync("./dist/components");
components.forEach((component) => {
	if (!componentExports.join("|").includes(component)) return;
	fs.renameSync(`./dist/components/${component}/${component}.d.ts`, `./dist/${component}/${component}.d.ts`);
	fs.rmdirSync(`./dist/components/${component}`, { recursive: true });
});

// merge contents of ./dist/Worldmap/Worldmap.css and ./dist/index.css into ./dist/index.css
fs.appendFileSync("./dist/index.css", fs.readFileSync("./dist/Worldmap/Worldmap.css", "utf-8"));
fs.unlinkSync("./dist/Worldmap/Worldmap.css");
