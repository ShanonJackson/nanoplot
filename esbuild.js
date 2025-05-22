const esbuild = require("esbuild");
const postCssPlugin = require("@deanc/esbuild-plugin-postcss");
const { sassPlugin, postcssModules } = require("esbuild-sass-plugin");

const path = require("path");

const componentExports = ["./src/components/GradientLegend/GradientLegend.tsx"];

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

const index = fs.readFileSync("./dist/index.css", "utf-8");
fs.rmdirSync("./dist", { recursive: true });
fs.mkdirSync("./dist");
fs.writeFileSync("./dist/index.css", index);
