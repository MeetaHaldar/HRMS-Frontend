import React from "react";
import { FiTrash2 } from "react-icons/fi";
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
      <FiTrash2 className="text-xl" />
      <span className="underline underline-offset-2 text-s">Trash</span>
    </button>
  );
};

export default TrashButton;
