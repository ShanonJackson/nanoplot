import React from 'react';

interface RollTheDiceProps {
  onClick: () => void;
  className?: string;
}

export const RollTheDice: React.FC<RollTheDiceProps> = ({ onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick} 
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ${className}`}
    >
      Roll The Dice
    </button>
  );
};