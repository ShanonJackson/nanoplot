import pkg from "./package.json";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import path from "path";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
const postcssNormalize = require("postcss-normalize");
import tailwindcss from "tailwindcss";
const tailwindConfig = require("./tailwind.config.js");

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";
const extensions = [".js", ".jsx", ".ts", ".tsx", ".css"];

const external = (externalArr) => {
	if (externalArr.length === 0) return () => false;
	return (id) => new RegExp(`^(${externalArr.join("|")})($|/)`).test(id);
};
export default {
	input: ["src/export/index.ts"],
	preserveModules: false,
	output: [
		{
			dir: "dist",
			sourcemapPathTransform: (relativePath) => {
				return path.relative("src", relativePath);
			},
			format: "cjs",
			sourcemap: false,
		},
		{
			sourcemapPathTransform: (relativePath) => path.relative("src", relativePath),
			file: "dist/index.mjs",
			format: "esm",
			sourcemap: false,
		},
	],
	external: external(Object.keys(pkg.peerDependencies || {}).concat(Object.keys(pkg.dependencies || {}))),
	plugins: [
		commonjs(),
		resolve({ extensions }),
		postcss({
			extensions: [".scss"],
			extract: true,
			modules: {
				localsConvention: "camelCaseOnly",
			},
			minimize: true,
			plugins: [
				require("postcss-flexbugs-fixes"),
				require("postcss-preset-env")({
					autoprefixer: {
						flexbox: "no-2009",
						grid: "autoplace",
					},
					stage: 3,
				}),
				postcssNormalize(),
			],
		}),
		babel({
			extensions,
			exclude: "node_modules/**",
			runtimeHelpers: true,
			babelrc: true,
		}),
		terser({
			compress: {
				passes: 10,
			},
		}),
	],
};
