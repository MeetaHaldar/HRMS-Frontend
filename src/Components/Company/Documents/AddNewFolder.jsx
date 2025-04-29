import React, { useState } from "react";

const AddNewFolder = ({ isOpen, onClose }) => {
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [isOrgFolder, setIsOrgFolder] = useState(false);
  const [isEmployeeFolder, setIsEmployeeFolder] = useState(false);

  const handleSave = () => {
    console.log({
      folderName,
      folderDescription,
      isOrgFolder,
      isEmployeeFolder,
    });
    onClose();
  };

  const handleCancel = () => {
    setFolderName("");
    setFolderDescription("");
    setIsOrgFolder(false);
    setIsEmployeeFolder(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl w-[430px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg text-gray-700 font-semibold">
            Add New Folder
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="border-b border-gray-200 mb-4" />

        <div className="mb-4">
          <label className="block text-sm text-gray-700 font-medium mb-1">
            Folder Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="w-full px-4 py-2 border border-dashed border-gray-400 bg-[#FFFAEB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="mb-4">
          <div className="flex justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                checked={isOrgFolder}
                onChange={() => setIsOrgFolder(!isOrgFolder)}
                className="mr-2 h-5 w-5 accent-yellow-500"
              />
              Organization Folder
            </label>
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                checked={isEmployeeFolder}
                onChange={() => setIsEmployeeFolder(!isEmployeeFolder)}
                className="mr-2 h-5 w-5 accent-yellow-500"
              />
              Employee Folder
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 font-medium mb-1">
            Folder Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={folderDescription}
            onChange={(e) => setFolderDescription(e.target.value)}
            className="w-full px-4 py-2 border border-dashed border-gray-400 bg-[#FFFAEB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows={4}
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            className="w-full py-2 rounded-full bg-[#FFD85F] hover:bg-yellow-400 text-sm font-semibold text-gray-800 transition"
          >
            Save Folder
          </button>
          <button
            onClick={handleCancel}
            className="w-full py-2 rounded-full border text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewFolder;
