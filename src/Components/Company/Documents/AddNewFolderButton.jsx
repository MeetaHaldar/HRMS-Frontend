import React, { useState } from 'react';

const AddNewFolderButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    // Show popup (you can implement the popup later)
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

      {/* Popup will go here later */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          {/* Popup content */}
        </div>
      )}
    </div>
  );
};

export default AddNewFolderButton;
