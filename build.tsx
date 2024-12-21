import autoprefixer from "autoprefixer";
import cssLoader from "bun-css-loader";
import tailwindcss from "tailwindcss";

(async () => {
	await Bun.build({
		entrypoints: [
			"./src/components/PieGraph/PieGraph",
			"./src/components/ScatterGraph/ScatterGraph",
			"./src/components/BarGraph/BarGraph",
			"./src/components/LineGraph/LineGraph",
			"./src/components/Worldmap/Worldmap",
			"./src/components/Legend/Legend",
		],
		outdir: "./dist",
		external: ["react", "react-dom"],
		minify: true,
		splitting: true,
		naming: {
			entry: "[dir]/[name].[ext]",
			chunk: "[name]-[hash].[ext]",
			asset: "[name]-[hash].[ext]",
		},
		plugins: [
			cssLoader({
				postCssPlugins: [tailwindcss(), autoprefixer()],
			}),
		],
	});
})();
