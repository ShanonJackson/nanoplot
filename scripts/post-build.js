/* Remove .module.scss statement */
const fs = require("fs");
const path = require("path");
fs.writeFileSync(
	path.resolve("./dist/src/components/Worldmap/Worldmap.js"),
	fs
		.readFileSync(path.resolve("./dist/src/components/Worldmap/Worldmap.js"), "utf8")
		.replace('import styles from "./Worldmap.module.scss";', ""),
	"utf8",
);

fs.writeFileSync(
	path.resolve("./dist/src/components/Tooltip/Popup.js"),
	fs
		.readFileSync(path.resolve("./dist/src/components/Tooltip/Popup.js"), "utf8")
		.replace('import styles from "./Tooltip.module.scss";', ""),
	"utf8",
);
