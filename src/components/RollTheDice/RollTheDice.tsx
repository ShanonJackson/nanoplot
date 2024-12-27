import React from "react";
import { Segment } from "../../utils/graph/graphUtils";
interface RollTheDiceProps {
	onClick: (newData: Segment[]) => void;
	className?: string;
	initialData: Segment[];
}

export const RollTheDice: React.FC<RollTheDiceProps> = ({ initialData, onClick, className = "" }) => {
  
	const handleClick = () => {
		const randomizedData = initialData.map((item) => ({
			...item,
			value: Math.floor(Math.random() * 1000),
		}));
		onClick(randomizedData);
	};

	return (
		<button
			onClick={handleClick}
			className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ${className}`}
		>
			Roll The Dice
		</button>
	);
};
