import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
	size?: number;
	className?: string;
}

export const ChevronDown: React.FC<IconProps> = ({ size = 24, className = "", ...props }) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			{...props}
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	);
};
