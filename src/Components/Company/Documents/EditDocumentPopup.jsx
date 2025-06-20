import React, { useState, useEffect, useRef } from "react";
import { FiUpload, FiEdit, FiTrash2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import dev_url from "../../../config";

export default function EditDocumentPopup({
  isOpen,
  onClose,
  onSave,
  document,
}) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error

  useEffect(() => {
    if (isOpen) {
      setFile(null);
      setMessage("");
      setMessageType("");
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSave = async () => {
    if (!file || !document?.id) return;

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folderId", document.folder_id);

      await axios.put(
        `${dev_url}salary/updateDocument?id=${document.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Document updated successfully!");
      setMessageType("success");

      setTimeout(() => {
        setMessage("");
        onSave(); // closes popup and refreshes
      }, 2000);
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("Failed to update document.");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
  };

  const handleClosePopup = () => {
    setFile(null);
    setMessage("");
    setMessageType("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20">
      <div className="bg-white rounded-2xl px-6 py-5 w-[430px] relative shadow-lg">
        <button
          onClick={handleClosePopup}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
        >
          <IoMdClose />
        </button>

        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Edit Document
        </h2>

        {message && (
          <div
            className={`text-sm px-3 py-2 rounded-md mb-3 text-center font-medium ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {file ? (
          <div className="border border-dashed p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-2">Selected Document</p>
            <div className="flex items-center justify-between bg-yellow-50 p-3 border border-black border-dashed rounded">
              <div>
                <p className="font-semibold text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-500">{file.size}</p>
              </div>
              <div className="flex space-x-3 text-gray-600">
                <button onClick={handleDeleteFile}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-dashed bg-yellow-50 text-center p-6 rounded-lg mb-6">
            <p className="text-gray-700 font-medium mb-2">
              Drag & Drop Files here
            </p>
            <div className="text-3xl text-gray-800 flex justify-center mb-2">
              <FiUpload />
            </div>
            <p className="text-gray-500 mb-4">or</p>

            <label className="bg-[#FFD85F] hover:bg-yellow-400 text-gray-800 font-medium py-2 px-4 rounded-full shadow cursor-pointer inline-block">
              Choose file to upload
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <p className="text-sm text-gray-500 mt-4">
              Maximum Upload File Size: 50MB
            </p>
          </div>
        )}

        <div className="flex justify-between space-x-4 mt-4">
          <button
            onClick={handleSave}
            disabled={!file}
            className="w-1/2 py-2 rounded-full bg-[#FFD85F] hover:bg-yellow-400 text-sm font-semibold text-gray-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Update Document
          </button>
          <button
            onClick={handleClosePopup}
            className="w-1/2 py-2 rounded-full border border-gray-400 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
