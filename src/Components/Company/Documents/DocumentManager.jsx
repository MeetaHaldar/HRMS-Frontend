import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiMail, FiTrash2, FiFolderPlus } from "react-icons/fi";
import DeleteConfirmationPopup from "../../SuperAdmin/DeleteConfirmationPopup";
// import FileUpload from "./FileUpload";
import UploadDocumentPopup from "./UploadDocumentPopup";
import AddNewFolderButton from "./AddNewFolderButton";
import TrashButton from "./TrashButton";

export default function DocumentsManager() {
  const [activeTab, setActiveTab] = useState("all");
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Company_Policy.pdf",
      folder: "Organisation",
      updatedBy: "Admin",
      updatedOn: "2025-04-01",
    },
    {
      id: 2,
      name: "Employee_Guide.docx",
      folder: "Employee",
      updatedBy: "HR",
      updatedOn: "2025-04-02",
    },
    {
      id: 3,
      name: "Holiday_Calendar.xlsx",
      folder: "Organisation",
      updatedBy: "Admin",
      updatedOn: "2025-04-03",
    },
    {
      id: 4,
      name: "Performance_Review.pdf",
      folder: "Employee",
      updatedBy: "Manager",
      updatedOn: "2025-04-04",
    },
    {
      id: 5,
      name: "Training_Schedule.pdf",
      folder: "Organisation",
      updatedBy: "Trainer",
      updatedOn: "2025-04-05",
    },
  ]);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showUploadPopup, setShowUploadPopup] = useState(false); // NEW

  useEffect(() => {
    fetchDocuments();
  }, [activeTab]);

  const fetchDocuments = () => {
    if (activeTab === "all") {
      setDocuments([]);
    } else if (activeTab === "organisation") {
      setDocuments([
        {
          id: 3,
          name: "Holiday Calendar.xlsx",
          folder: "Organisation",
          updatedBy: "Admin",
          updatedOn: "2025-04-03",
        },
      ]);
    } else if (activeTab === "employee") {
      setDocuments([
        {
          id: 4,
          name: "Performance Review.pdf",
          folder: "Employee",
          updatedBy: "Manager",
          updatedOn: "2025-04-04",
        },
      ]);
    }
    setSelectedIds([]);
  };

  const handleDelete = (doc) => {
    setSelectedDocument(doc);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    setDocuments((prev) =>
      prev.filter((doc) => doc.id !== selectedDocument.id)
    );
    setShowDeletePopup(false);
    setSelectedDocument(null);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
  };

  const allSelected =
    documents.length > 0 && selectedIds.length === documents.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(documents.map((doc) => doc.id));
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg text-gray-600 font-semibold">Documents</h2>
        <button
          onClick={() => setShowUploadPopup(true)}
          className="bg-[#FFD85F] hover:bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded-full shadow"
        >
          + Add Document
        </button>
      </div>

      <div className="flex w-full space-x-4 mb-6">
        {[
          { key: "all", label: "All Documents" },
          { key: "organisation", label: "Organisation Folder" },
          { key: "employee", label: "Employee Folder" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
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

      {selectedIds.length > 0 && (
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

      <div className="flex-grow overflow-auto">
        {documents.length === 0 && activeTab === "all" ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-lg mb-4">No files found</p>
            <button
              onClick={() => setShowUploadPopup(true)}
              className="text-gray-800 font-semibold py-2 px-6 underline"
            >
             + Add New Documents Now
            </button>
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
                  Folder Name
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Name
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Uploaded On
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300 rounded-tr-xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {documents.map((doc) => (
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
                  <td className="px-4 py-2">{doc.updatedBy}</td>
                  <td className="px-4 py-2 space-x-2 flex items-center">
                    <button className="text-gray-500 hover:text-gray-800">
                      <FiEdit />
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-800"
                      onClick={() => handleDelete(doc)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <TrashButton />
      <AddNewFolderButton />
      <DeleteConfirmationPopup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={confirmDelete}
        data={selectedDocument}
        message={`Are you sure you want to delete "${selectedDocument?.name}"?`}
      />

      {/* Upload Document Popup */}
      <UploadDocumentPopup
        isOpen={showUploadPopup} // 👈 this passes the open/close state
        onClose={() => setShowUploadPopup(false)} // 👈 this closes the popup
      />
    </div>
  );
}
