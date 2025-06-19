import React, { useEffect, useState } from "react";
import axios from "axios";
import dev_url from "../../../config";
import { useLocation } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const FolderFileTable = () => {
  const location = useLocation();
  const [files, setFiles] = useState([]);

  const { type, field, value, foldername } = location.state || {};

  useEffect(() => {
    if (type && field && value) {
      fetchFiles(type, field, value);
    }
  }, [type, field, value]);

  const fetchFiles = async (type, field, value) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${dev_url}salary/getlist?type=${type}&field=${field}&value=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.data) {
        setFiles(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${dev_url}salary/moveToTrash`,
        {
          id: id,
          type: "files",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove deleted file from UI
      setFiles((prev) => prev.filter((file) => file.id !== id));
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
  };

  if (files.length === 0)
    return (
      <div className="relative h-[300px] flex flex-col justify-center items-center">
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 text-lg text-gray-600 hover:text-black px-3 py-1"
        >
          ← Back
        </button>
        <p className="text-gray-600 text-lg">There is No Files in the Folder</p>
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
      <div className="mb-6">
        <div>
          <button
            onClick={() => window.history.back()}
            className="text-sm text-gray-600 font-semibold underline underline-offset-4 ml-2"
          >
            ← Back
          </button>
        </div>

        <h2 className="text-lg text-gray-600 font-semibold underline underline-offset-4 ml-2 mt-2">
          Folders:
        </h2>
      </div>

      <table className="w-full border border-gray-300 rounded-xl overflow-hidden p-5">
        <thead className="bg-gray-200 text-gray-700 text-sm font-semibold">
          <tr>
            <th className="px-4 py-3 text-left">Document Name</th>
            <th className="px-4 py-3 text-left">Folder</th>
            <th className="px-4 py-3 text-left">Uploaded By</th>
            <th className="px-4 py-3 text-left">Uploaded On</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800">
          {files.map((file) => (
            <tr key={file.id} className="border-t hover:bg-gray-50">
              <td
                className="px-4 py-3 underline text-blue-600 cursor-pointer"
                onClick={() =>
                  window.open(
                    `${dev_url}public/upload/${file.filename}`,
                    "_blank"
                  )
                }
              >
                {file.filename}
              </td>
              <td className="px-4 py-3">{foldername}</td>
              <td className="px-4 py-3">Admin</td>
              <td className="px-4 py-3">
                {file.uploaded_at?.slice(0, 10) || "—"}
              </td>
              <td className="px-4 py-3 flex space-x-3">
                <button className="text-gray-600 hover:text-blue-600">
                  <FiEdit size={16} />
                </button>
                <button
                  className="text-gray-600 hover:text-red-600"
                  onClick={() => handleDelete(file.id)}
                >
                  <FiTrash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FolderFileTable;
