import React, { useState } from "react";
import AddNewFolder from "./AddNewFolder";

const AddNewFolderButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleClick}
        className="text-gray-600 text-lg font-semibold relative"
      >
        + Add New Folder
        <span className="absolute bottom-1 left-0 w-full border-b-2 border-gray-600"></span>
      </button>
      <AddNewFolder isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default AddNewFolderButton;
