import React from "react";

interface CodeTabProps {
	children: React.ReactNode;
	language: string;
}

export function CodeTab({ children, language }: CodeTabProps) {
	return (
		<div className="relative">
			<div className="absolute top-3 right-3">
				<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
					{language}
				</span>
			</div>
			<div className="p-4 pt-8">
				<pre className="text-sm text-gray-900 font-mono leading-relaxed">
					<code>{children}</code>
				</pre>
			</div>
		</div>
	);
}
