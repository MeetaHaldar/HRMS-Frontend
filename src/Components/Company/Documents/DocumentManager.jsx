import { useState } from "react";
import { FiFolderPlus, FiTrash2, FiPlus, FiEdit } from "react-icons/fi";
import UploadDocumentPopup from "./UploadDocumentPopup";
import AddNewFolderButton from "./AddNewFolderButton";
import TrashButton from "./TrashButton";
import EditDocumentPopup from "./EditDocumentPopup";
import TrashDeleteConfirmationPopup from "./TrashDeleteConfirmationPopup";
import MoveToFolderPopup from "./MoveToFolderPopup";
export default function DocumentManager() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [documentToEdit, setDocumentToEdit] = useState(null);
  const [deleteDocId, setDeleteDocId] = useState(null);
  const [isMoveToPopupOpen, setIsMoveToPopupOpen] = useState(false);
  const [cardData, setCardData] = useState({
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
  });

  const getCombinedAllDocuments = () => {
    return [...cardData.organisation, ...cardData.employee];
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
  };

  const allDocs =
    activeTab === "all" ? getCombinedAllDocuments() : cardData[activeTab];
  const allSelected =
    allDocs.length > 0 && selectedIds.length === allDocs.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allDocs.map((doc) => doc.id));
    }
  };

  const handleUpload = (newDoc) => {
    const updated = { ...cardData };
    updated[newDoc.folder.toLowerCase()].push({
      id: Date.now(),
      ...newDoc,
    });
    setCardData(updated);
    setIsUploadPopupOpen(false);
  };

  const confirmDelete = (id) => {
    setDeleteDocId(id); // can be "bulk" or a specific doc.id
  };

  const handleConfirmDelete = () => {
    const updated = { ...cardData };
    const toDelete = deleteDocId === "bulk" ? selectedIds : [deleteDocId];

    Object.keys(updated).forEach((key) => {
      updated[key] = updated[key].filter((doc) => !toDelete.includes(doc.id));
    });

    setCardData(updated);
    setSelectedIds([]);
    setDeleteDocId(null);
  };

  const handleEdit = (id) => {
    const doc = allDocs.find((d) => d.id === id);
    setDocumentToEdit(doc);
    setIsEditPopupOpen(true);
  };

  const handleSaveEditedDoc = (updatedDoc) => {
    const updated = { ...cardData };

    Object.keys(updated).forEach((key) => {
      updated[key] = updated[key].map((doc) =>
        doc.id === updatedDoc.id ? updatedDoc : doc
      );
    });

    setCardData(updated);
    setDocumentToEdit(null);
    setIsEditPopupOpen(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg text-gray-600 font-semibold">Documents:</h2>
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

      {selectedIds.length > 0 && (
        <div className="absolute py-3 w-1/5 left-8 right-8 top-[200px] mb-2 z-10 bg-white border border-gray-300 rounded-lg p-3 shadow-md flex space-x-4 items-center">
          <button
            title="Move To"
            onClick={() => setIsMoveToPopupOpen(true)}
            className="text-gray-700 hover:text-black text-xl cursor-pointer"
          >
            <FiFolderPlus />
          </button>
          <button
            title="Delete"
            className="text-gray-700 hover:text-black text-xl cursor-pointer"
            onClick={() => confirmDelete("bulk")}
          >
            <FiTrash2 />
          </button>
          <button
            className="text-gray-500 text-xs underline underline-offset-2 cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={() => {
              setSelectedIds([]);
              setIsMoveToPopupOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Document Table */}
      <div className="flex-grow overflow-auto">
        {allDocs.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-400 py-20">
            No Documents Available
            <span
              className="text-black underline cursor-pointer"
              onClick={() => setIsUploadPopupOpen(true)}
            >
              + Add New Documents Now
            </span>
          </div>
        ) : (
          <table className="min-w-full  border-separate border-spacing-0 border border-gray-400 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm">
                <th className="px-4 py-3 text-left rounded-tl-xl border-b border-gray-300">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="form-checkbox h-5 w-5 text-gray-600 border-gray-400 bg-gray-100 accent-gray-50"
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
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {allDocs.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(doc.id)}
                      onChange={() => toggleSelect(doc.id)}
                      className="form-checkbox h-5 w-5 text-gray-600 border-gray-400 bg-gray-100 accent-gray-50"
                    />
                  </td>
                  <td className="px-4 py-2 font-semibold underline underline-offset-4 text-gray-800 cursor-pointer">
                    {doc.name}
                  </td>
                  <td className="px-4 py-2">{doc.folder}</td>
                  <td className="px-4 py-2">{doc.uploadedBy}</td>
                  <td className="px-4 py-2">{doc.uploadedOn}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button onClick={() => handleEdit(doc.id)}>
                      <FiEdit />
                    </button>
                    <button onClick={() => confirmDelete(doc.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Folder for org/employee */}
      {(activeTab === "employee" || activeTab === "organisation") && (
        <div className="flex flex-col items-center justify-center text-gray-500 text-lg font-semibold mt-8 space-y-2">
          <div>or</div>
          <AddNewFolderButton />
        </div>
      )}

      {/* Trash Button */}
      <div className="p-8 bg-gray-50 min-h-screen flex flex-col relative">
        <TrashButton />
      </div>

      {/* Upload/Edit/Delete Popups */}
      <UploadDocumentPopup
        isOpen={isUploadPopupOpen}
        onClose={() => setIsUploadPopupOpen(false)}
        onUpload={handleUpload}
      />
      <EditDocumentPopup
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        onSave={handleSaveEditedDoc}
        document={documentToEdit}
      />
      <TrashDeleteConfirmationPopup
        isOpen={deleteDocId !== null}
        onClose={() => setDeleteDocId(null)}
        onConfirm={handleConfirmDelete}
      />

      {isMoveToPopupOpen && (
        <MoveToFolderPopup onClose={() => setIsMoveToPopupOpen(false)} />
      )}
    </div>
  );
}
