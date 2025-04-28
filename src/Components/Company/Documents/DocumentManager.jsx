import { useState } from "react";
import {
  FiFolderPlus,
  FiTrash2,
  FiMail,
  FiPlus,
  FiEdit2,
} from "react-icons/fi";
import UploadDocumentPopup from "./UploadDocumentPopup"; // make sure the path is correct!
import AddNewFolderButton from "./AddNewFolderButton";
import TrashButton from "./TrashButton";
export default function DocumentManager() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);

  const cardData = {
    all: [],
    organisation: [
      {
        id: 1,
        name: "Company Policy.pdf",
        folder: "Organisation",
        uploadedBy: "Admin",
        uploadedOn: "2025-04-01",
      },
      {
        id: 2,
        name: "Holiday List.docx",
        folder: "Organisation",
        uploadedBy: "Admin",
        uploadedOn: "2025-04-02",
      },
    ],
    employee: [
      {
        id: 3,
        name: "John Resume.pdf",
        folder: "Employee",
        uploadedBy: "John Doe",
        uploadedOn: "2025-04-03",
      },
      {
        id: 4,
        name: "Jane Offer Letter.pdf",
        folder: "Employee",
        uploadedBy: "Jane Smith",
        uploadedOn: "2025-04-04",
      },
    ],
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
  };

  const allSelected =
    cardData[activeTab]?.length > 0 &&
    selectedIds.length === cardData[activeTab]?.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cardData[activeTab].map((doc) => doc.id));
    }
  };

  const handleUpload = (newDoc) => {
    // Add new document to the correct tab
    cardData[newDoc.folder.toLowerCase()].push({
      id: Date.now(), // simple unique ID
      ...newDoc,
    });
    setIsUploadPopupOpen(false);
  };

  const handleDelete = (id) => {
    // Delete the document
    const updatedData = cardData[activeTab].filter((doc) => doc.id !== id);
    cardData[activeTab] = updatedData;
    setSelectedIds(selectedIds.filter((docId) => docId !== id));
  };

  const handleEdit = (id) => {
    // Handle edit functionality (you can open a form or popup for editing)
    console.log(`Edit document with id: ${id}`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg text-gray-600 font-semibold">Documents</h2>
        <button
          onClick={() => setIsUploadPopupOpen(true)}
          className="flex items-center space-x-2 bg-[#FFD85F] hover:bg-yellow-400 text-gray-700 font-semibold py-2 px-4 rounded-full shadow"
        >
          <FiPlus />
          <span>Add Document</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex w-full space-x-4 mb-6">
        {[
          { key: "all", label: "All Documents" },
          { key: "organisation", label: "Organisation Folder" },
          { key: "employee", label: "Employee Folder" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setSelectedIds([]); 
            }}
            className={`flex-1 py-6 rounded-lg font-semibold text-lg shadow ${
              activeTab === tab.key
                ? "bg-[#FFD85F] text-gray-600"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Selection Toolbar */}
      {selectedIds.length > 0 && activeTab !== "all" && (
        <div className="absolute py-3 w-1/5 left-8 right-8 top-[200px] mb-2 z-10 bg-white border border-gray-300 rounded-lg p-3 shadow-md flex space-x-4 items-center">
          <button
            title="Move To"
            className="text-gray-700 hover:text-black text-xl"
          >
            <FiFolderPlus />
          </button>
          <button
            title="Delete"
            className="text-gray-700 hover:text-black text-xl"
          >
            <FiTrash2 />
          </button>
          <button
            title="Share by Mail"
            className="text-gray-700 hover:text-black text-xl"
          >
            <FiMail />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-grow overflow-auto">
        {activeTab === "all" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cardData.all.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center text-gray-400 py-20">
                No Documents Available
                <span
                  className="text-black underline cursor-pointer "
                  onClick={() => setIsUploadPopupOpen(true)}
                >
                  + Add New Documents Now
                </span>
              </div>
            ) : (
              cardData.all.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Uploaded By: {doc.uploadedBy}
                  </p>
                  <p className="text-sm text-gray-500">
                    Uploaded On: {doc.uploadedOn}
                  </p>
                </div>
              ))
            )}
          </div>
        ) : (
          <table className="min-w-full border border-gray-600 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="px-4 py-3 text-left rounded-tl-xl border-b border-gray-300">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="form-checkbox h-5 w-5 text-gray-600 border-gray-400"
                  />
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Document Name
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Folder
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Uploaded By
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Uploaded On
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Actions
                </th>{" "}
              
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {cardData[activeTab].map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(doc.id)}
                      onChange={() => toggleSelect(doc.id)}
                      className="form-checkbox h-5 w-5 text-gray-600 border-gray-400"
                    />
                  </td>
                  <td className="px-4 py-2 font-semibold underline text-gray-800 cursor-pointer">
                    {doc.name}
                  </td>
                  <td className="px-4 py-2">{doc.folder}</td>
                  <td className="px-4 py-2">{doc.uploadedBy}</td>
                  <td className="px-4 py-2">{doc.uploadedOn}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button onClick={() => handleEdit(doc.id)} className="">
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleDelete(doc.id)} className="">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {(activeTab === "employee" || activeTab === "organisation") && (
        <div className="text-gray-500 text-lg font-semibold flex justify-center mt-8">
          <AddNewFolderButton />
        </div>
      )}
      <div className="p-8 bg-gray-50 min-h-screen flex flex-col relative">
        <TrashButton />
      </div>
      {/* Upload Document Popup */}
      <UploadDocumentPopup
        isOpen={isUploadPopupOpen}
        onClose={() => setIsUploadPopupOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}
