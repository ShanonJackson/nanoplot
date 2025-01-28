import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-typescript.min.js";

export const CodeBlock = ({ code, language }: { code: string; language: string }) => {
	useEffect(() => Prism.highlightAll(), [code, language]);

	return (
		<pre className={`language-${language} h-full overflow-auto !mt-0`}>
			<code>{code}</code>
		</pre>
	);
};
