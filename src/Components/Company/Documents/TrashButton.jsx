import React from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TrashButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/companyAdmin/documents/trash");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed cursor-pointer bottom-8 right-8 z-50 text-gray-600 p-3 hover:bg-gray-100 flex items-center space-x-2"
    >
      <FaTrash className="text-xl" />
      <span className="underline text-s">Trash</span>
    </button>
  );
};

export default TrashButton;
