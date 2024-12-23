import React from 'react';
import { GraphUtils, GraphData, Segment } from '../../utils/graph/graphUtils';

interface RollTheDiceProps {
    data: GraphData;
    onClick: (newData: GraphData) => void;
}

const RollTheDice: React.FC<RollTheDiceProps> = ({ data, onClick }) => {
    
    const handleClick = () => {
        let newData: GraphData;

        if (GraphUtils.isXYData(data)) {
            // Handle XY data logic
            const minX = GraphUtils.getMin(data, 'x');
            const maxX = GraphUtils.getMax(data, 'x');
            const minY = GraphUtils.getMin(data, 'y');
            const maxY = GraphUtils.getMax(data, 'y');

            newData = data.map(point => ({
                x: Math.random() * (maxX - minX) + minX,
                y: Math.random() * (maxY - minY) + minY,
            }));
        } else {
            // Handle segment data logic
            const total = GraphUtils.getTotal(data as Segment[]);
            const randomValues = data.map(() => Math.random()); // Generate random values

            // Normalize to ensure they sum up to the total
            const sumRandomValues = randomValues.reduce((acc, value) => acc + value, 0);
            newData = data.map((segment, index) => ({
                ...segment,
                value: (randomValues[index] / sumRandomValues) * total,
            }));
        }

        onClick(newData);
    };

    return (
        <button 
            onClick={handleClick} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        >
            Roll The Dice
        </button>
    );
};

export default RollTheDice;