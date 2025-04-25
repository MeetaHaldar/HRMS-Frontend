import React, { useState } from 'react';

const AddNewFolder = ({ isOpen, onClose }) => {
  const [folderName, setFolderName] = useState('');
  const [folderDescription, setFolderDescription] = useState('');
  const [isOrgFolder, setIsOrgFolder] = useState(false);
  const [isEmployeeFolder, setIsEmployeeFolder] = useState(false);

  const handleSave = () => {
    // Add your save logic here, e.g., making an API call or updating state
    console.log({
      folderName,
      folderDescription,
      isOrgFolder,
      isEmployeeFolder,
    });

    // Close the popup after saving
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Folder</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Folder Name</label>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter folder name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Folder Description</label>
          <textarea
            value={folderDescription}
            onChange={(e) => setFolderDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter folder description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Folder Type</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="organizationFolder"
              checked={isOrgFolder}
              onChange={() => setIsOrgFolder(!isOrgFolder)}
              className="mr-2"
            />
            <label htmlFor="organizationFolder" className="text-sm">
              Organization Folder
            </label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="employeeFolder"
              checked={isEmployeeFolder}
              onChange={() => setIsEmployeeFolder(!isEmployeeFolder)}
              className="mr-2"
            />
            <label htmlFor="employeeFolder" className="text-sm">
              Employee Folder
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
          >
            Save Folder
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewFolder;
