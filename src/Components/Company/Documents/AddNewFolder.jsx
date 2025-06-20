import React, { useEffect, useState } from "react";
import axios from "axios";
import dev_url from "../../../config";

const AddNewFolder = ({ isOpen, onClose, item = null, onSuccess }) => {
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [type, setType] = useState("org");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = localStorage.getItem("user");
  const companyId = JSON.parse(user).companyId;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (item) {
      setFolderName(item.name || "");
      setFolderDescription(item.description || "");
      setType(item.type || "org");
    }
  }, [item]);

  const handleSave = async () => {
    if (!folderName || !folderDescription || !type || !companyId) {
      setError("All fields are required.");
      return;
    }

    const data = {
      name: folderName,
      description: folderDescription,
      type,
      company_id: companyId,
    };

    try {
      setLoading(true);
      setError("");

      if (item) {
        // Edit mode
        await axios.put(`${dev_url}salary/updateFolder?id=${item.id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Add mode
        await axios.post(`${dev_url}salary/addfolder`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (onSuccess) onSuccess();
      handleCancel();
    } catch (err) {
      console.error("API error:", err);
      setError("Something went wrong while saving the folder.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFolderName("");
    setFolderDescription("");
    setType("org");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl w-[430px]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg text-gray-700 font-semibold">
            {item ? "Edit Folder" : "Add New Folder"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-3xl leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="border-b border-gray-200 mb-4" />

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

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
          <label className="block text-sm text-gray-700 font-medium mb-1">
            Folder Type <span className="text-red-500">*</span>
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border border-dashed border-gray-400 bg-[#FFFAEB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="org">Organization Folder</option>
            <option value="employee">Employee Folder</option>
          </select>
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
            disabled={loading}
            className="w-full py-2 rounded-full bg-[#FFD85F] hover:bg-[#FFD85F]  text-sm font-semibold text-gray-800 transition cursor-pointer"
          >
            {loading
              ? item
                ? "Updating..."
                : "Saving..."
              : item
              ? "Update Folder"
              : "Save Folder"}
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            className="w-full py-2 rounded-full border text-sm font-medium text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewFolder;
