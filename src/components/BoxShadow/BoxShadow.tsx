import React from "react";

export const BoxShadow = ({ shadow, id }: { shadow: string; id: string }) => {
	const regex =
		/(-?\d+\.?\d*(?:px)?) (-?\d+\.?\d*(?:px)?) (-?\d+\.?\d*(?:px)?) (-?\d+\.?\d*(?:px)?) (rgba?\([^\)]+\)|hsla?\([^\)]+\)|#[a-fA-F0-9]{3,6}|url\([^\)]+\)|[a-zA-Z]+)/;

	const match = shadow.match(regex);
	if (!match) return null;
	const offsetX = match[1];
	const offsetY = match[2];
	const blurRadius = match[3];
	const spreadRadius = match[4];
	const color = match[5];

	return (
		<filter id={id} x="-50%" y="-50%" width="200%" height="200%">
			<feMorphology in="SourceAlpha" result="spread-0" operator="dilate" radius={spreadRadius?.replace("px", "")} />
			<feGaussianBlur in="spread-0" result="blurred-0" stdDeviation={blurRadius?.replace("px", "")} />
			<feOffset in="blurred-0" dx={offsetX?.replace("px", "")} dy={offsetY?.replace("px", "")} result="offset-0" />
			<feFlood floodColor={color} floodOpacity="1" />
			<feComposite in2="offset-0" operator="in" />
			<feMerge>
				<feMergeNode />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	);
};
