import React, { useState } from "react";
import AddNewFolder from "./AddNewFolder";

const AddNewFolderButton = ({ className = "" }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleClick}
        className={`relative cursor-pointer underline underline-offset-2 ${className}`}
      >
        + Add New Folder
      </button>
      <AddNewFolder isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default AddNewFolderButton;
