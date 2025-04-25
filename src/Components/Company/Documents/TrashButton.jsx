import React from 'react';
import { FaTrash } from 'react-icons/fa';

const TrashButton = () => {

  const handleClick = () => {
    // Redirect to the trash page (you can use react-router-dom here)
  };

  return (
    <button
      onClick={handleClick}
      className="text-gray-500 text-xl p-2 rounded-full flex items-center space-x-2"
    >
      <FaTrash />
      <span className="underline">Trash</span>
    </button>
  );
};

export default TrashButton;
