import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-typescript.min.js";

export const CodeBlock = ({ code, language }: { code: string; language: string }) => {
	Prism.highlightAll();

	return (
		<pre className={`language-${language} h-full overflow-auto`}>
			<code>{code}</code>
		</pre>
	);
};
