/* Remove .module.scss statement */
const fs = require("fs");
const path = require("path");
const contents = fs.readFileSync(path.resolve("./dist/src/components/Worldmap/Worldmap.js"), "utf8");
const newContents = contents.replace('import styles from "./Worldmap.module.scss";', "");
fs.writeFileSync(path.resolve("./dist/src/components/Worldmap/Worldmap.js"), newContents, "utf8");
