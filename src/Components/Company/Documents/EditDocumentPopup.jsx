import React, { useState, useEffect, useRef } from "react";
import { FiTrash2, FiX, FiRefreshCw } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import AddNewFolderButton from "./AddNewFolderButton";

export default function EditDocumentPopup({
  isOpen,
  onClose,
  onSave,
  document,
}) {
  const [editedDoc, setEditedDoc] = useState({});
  const [folderType, setFolderType] = useState("Employee");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [associateDocumentTo, setAssociateDocumentTo] = useState("");

  const fileInputRef = useRef(null);

  const folderOptions = ["HR", "Finance", "Projects"]; 
  const employeeOptions = ["Employee A", "Employee B", "Employee C"]; 

  useEffect(() => {
    if (document) {
      setEditedDoc(document);
      setFolderType(document.folderType || "Employee");
      setSelectedFolder(document.folderName || "");
      setAssociateDocumentTo("");
    }
  }, [document]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedDoc({
        ...editedDoc,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
        file,
      });
    }
  };

  const handleDeleteConfirmed = () => {
    setEditedDoc({});
  };

  const handleSubmit = () => {
    onSave({
      ...editedDoc,
      folderType,
      folderName: selectedFolder,
      associateDocumentTo:
        folderType === "Employee" ? associateDocumentTo : null,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl px-6 py-5 w-[430px] relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Edit Document</h2>
          <div className="flex items-center space-x-3">
            <FiX
              className="cursor-pointer text-gray-500 hover:text-black"
              onClick={onClose}
            />
          </div>
        </div>

        <div className="border-b border-gray-200 mb-4" />

        {/* Selected Document Label */}
        <p className="text-sm text-gray-600 mb-1">Selected Document:</p>

        {/* Document Card */}
        <div className="border border-dashed bg-[#FFFAEB] border-gray-300 rounded-xl p-4 flex items-center justify-between mb-4">
          <div className="flex items-start gap-3">
            <FaFileAlt className="text-3xl text-gray-600 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-800 break-all">
                {editedDoc.name || "No file selected"}
              </p>
              <p className="text-xs text-gray-500">
                {editedDoc.size || "0.0MB"}
              </p>
            </div>
          </div>

          {/* File Picker */}
          <div
            onClick={() => fileInputRef.current.click()}
            className="flex flex-col items-center text-sm text-gray-600 hover:text-black cursor-pointer"
          >
            <FiRefreshCw className="text-xl mb-1" />
            <span className="text-xs">Change</span>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Folder Type Checkboxes */}
        <div className="flex items-center justify-between mb-4 px-2">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={folderType === "Organisation"}
              onChange={() => setFolderType("Organisation")}
              className="accent-yellow-500"
            />
            Organisation Folder
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={folderType === "Employee"}
              onChange={() => setFolderType("Employee")}
              className="accent-yellow-500"
            />
            Employee Folder
          </label>
        </div>

        {/* Folder Name Dropdown */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">
            Folder Name<span className="text-red-500">*</span>
          </label>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="w-full border border-dashed bg-[#FFFAEB] px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="" disabled>
              Select folder
            </option>
            {folderOptions.map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </div>

        {/* Associate Document To Dropdown */}
        {folderType === "Employee" && (
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Associate Document To<span className="text-red-500">*</span>
            </label>
            <select
              value={associateDocumentTo}
              onChange={(e) => setAssociateDocumentTo(e.target.value)}
              className="w-full border border-dashed bg-[#FFFAEB] px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="" disabled>
                Select employee
              </option>
              {employeeOptions.map((emp) => (
                <option key={emp} value={emp}>
                  {emp}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Add New Folder */}
        <div className="flex flex-col items-center mb-4 text-sm text-gray-600">
          <span className="mb-1">or</span>
          <span className="text-black font-semibold cursor-pointer hover:underline">
            <AddNewFolderButton />
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleSubmit}
            className="w-[160px] py-2 rounded-full bg-[#FFD85F] hover:bg-yellow-400 text-sm font-semibold text-gray-800 transition"
          >
            Save Documents
          </button>
          <button
            onClick={onClose}
            className="w-[160px] py-2 rounded-full border text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>

        
      </div>
    </div>
  );
}
