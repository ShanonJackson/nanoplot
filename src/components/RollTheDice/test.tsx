// import React from 'react';
// import { GraphUtils } from './utils'; 

// // Define the types for props
// interface XYPoint {
//     x: number;
//     y: number;
// }

// interface Segment {
//     value: number;
//     // Add other properties if needed
// }

// interface RollTheDiceProps {
//     data: XYPoint[] | Segment[];
//     onClick: (newData: XYPoint[] | Segment[]) => void;
// }

// const RollTheDice: React.FC<RollTheDiceProps> = ({ data, onClick }) => {
//     const handleClick = () => {
//         let newData;

//         if (GraphUtils.isXYData(data)) {
//             // If it's XY data
//             const minX = Math.min(...data.map(point => point.x));
//             const maxX = Math.max(...data.map(point => point.x));
//             const minY = Math.min(...data.map(point => point.y));
//             const maxY = Math.max(...data.map(point => point.y));

//             newData = data.map(point => ({
//                 x: Math.random() * (maxX - minX) + minX,
//                 y: Math.random() * (maxY - minY) + minY,
//             }));
//         } else {
//             // It's segment data
//             const total = data.reduce((acc, segment) => acc + segment.value, 0);
//             newData = data.map(segment => ({
//                 ...segment,
//                 value: Math.random() * total,
//             }));
//         }

//         onClick(newData);
//     };

//     return (
//         <button onClick={handleClick} className="outline outline-1 rounded py-2 px-6">
//             Roll The Dice
//         </button>
//     );
// };

// export default RollTheDice;
