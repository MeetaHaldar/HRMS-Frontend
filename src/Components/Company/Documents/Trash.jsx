import { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { MdSettingsBackupRestore } from "react-icons/md";
import DeleteConfirmationPopup from "../../SuperAdmin/DeleteConfirmationPopup";
import RestoreConfirmationPopup from "./RestoreConfirmationPopup";
import dev_url from "../../../config";

export default function Trash() {
  const [documents, setDocuments] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isRestorePopupOpen, setIsRestorePopupOpen] = useState(false);
  const [documentsToDelete, setDocumentsToDelete] = useState([]);
  const [documentsToRestore, setDocumentsToRestore] = useState([]);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  useEffect(() => {
    fetchTrashData();
  }, []);

  const fetchTrashData = async () => {
    try {
      const res = await axios.get(`${dev_url}salary/TrashList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const folders = res.data?.data?.[0]?.folders || [];
      const files = res.data?.data?.[1]?.files || [];

      const allDocs = [
        ...folders.map((doc) => ({
          ...doc,
          type: "Folder",
          displayName: doc.name,
          uploadedBy: "Admin",
        })),
        ...files.map((doc) => ({
          ...doc,
          type: "File",
          displayName: doc.name,
          file_name: doc.file_name || doc.name,
          uploadedBy: "Admin",
        })),
      ];

      setDocuments(allDocs);
    } catch (error) {
      console.error("Failed to fetch trash list:", error);
    }
  };

  const restoreDocument = async (doc) => {
    try {
      await axios.put(
        `${dev_url}salary/restoreFromTrash`,
        { id: doc.id, type: doc.type === "Folder" ? "folders" : "files" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Restore failed:", error);
    }
  };

  const deleteDocument = async (doc) => {
    try {
      await axios.delete(`${dev_url}salary/delete`, {
        data: { id: doc.id, type: doc.type === "Folder" ? "folders" : "files" },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleConfirmRestore = async () => {
    for (const doc of documentsToRestore) {
      await restoreDocument(doc);
    }

    setDocuments((prevDocs) =>
      prevDocs.filter((doc) => !documentsToRestore.some((d) => d.id === doc.id))
    );
    setSelectedIds((prev) =>
      prev.filter((id) => !documentsToRestore.some((doc) => doc.id === id))
    );
    setIsRestorePopupOpen(false);
    setDocumentsToRestore([]);
    setIsToolbarOpen(false);
  };

  const handleConfirmDelete = async () => {
    for (const doc of documentsToDelete) {
      await deleteDocument(doc);
    }

    setDocuments((prevDocs) =>
      prevDocs.filter((doc) => !documentsToDelete.some((d) => d.id === doc.id))
    );
    setSelectedIds((prev) =>
      prev.filter((id) => !documentsToDelete.some((doc) => doc.id === id))
    );
    setIsDeletePopupOpen(false);
    setDocumentsToDelete([]);
    setIsToolbarOpen(false);
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((docId) => docId !== id)
        : [...prev, id];

      setIsToolbarOpen(updated.length > 0);
      return updated;
    });
  };

  const allSelected = selectedIds.length === documents.length;

  const toggleSelectAll = () => {
    const newSelected = allSelected ? [] : documents.map((doc) => doc.id);
    setSelectedIds(newSelected);
    setIsToolbarOpen(newSelected.length > 0);
  };

  const handleRestoreSingle = (doc) => {
    setDocumentsToRestore([doc]);
    setIsRestorePopupOpen(true);
  };

  const handleBulkRestore = () => {
    const selectedDocs = documents.filter((doc) =>
      selectedIds.includes(doc.id)
    );
    setDocumentsToRestore(selectedDocs);
    setIsRestorePopupOpen(true);
  };

  const handleDeleteSingle = (doc) => {
    setDocumentsToDelete([doc]);
    setIsDeletePopupOpen(true);
  };

  const handleBulkDelete = () => {
    const selectedDocs = documents.filter((doc) =>
      selectedIds.includes(doc.id)
    );
    setDocumentsToDelete(selectedDocs);
    setIsDeletePopupOpen(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
      <div className=" mb-6">
        <div className="flex items-center mt-8">
          <button
            onClick={() => window.history.back()}
            className="text-2xl text-gray-600 hover:text-black px-3 py-1 cursor-pointer"
          >
            ←
          </button>
          <div className="font-2xl">
            <FiTrash2 />
          </div>
          <h2 className="text-lg text-gray-600 font-semibold underline ml-2">
            Trash
          </h2>
        </div>
      </div>

      <div className="relative">
        {isToolbarOpen && selectedIds.length > 0 && (
          <div className="absolute -top-4 left-4 z-10 bg-white border border-gray-300 rounded-lg p-2 shadow-md flex space-x-4 items-center">
            <button
              title="Restore"
              onClick={handleBulkRestore}
              className="text-gray-700 hover:text-black text-xl cursor-pointer"
            >
              <MdSettingsBackupRestore />
            </button>
            <button
              title="Delete"
              onClick={handleBulkDelete}
              className="text-gray-700 hover:text-black text-xl cursor-pointer"
            >
              <FiTrash2 />
            </button>
            <button
              title="Cancel"
              onClick={() => {
                setIsToolbarOpen(false);
                setSelectedIds([]);
              }}
              className="text-gray-500 text-xs underline cursor-pointer hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="rounded-lg overflow-y-auto">
          {documents.length > 0 ? (
            <table className="min-w-full border-separate border-spacing-0 border border-gray-400 rounded-xl overflow-hidden">
              <thead className="bg-gray-200">
                <tr className="text-gray-600 text-sm">
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                      className="form-checkbox h-5 w-5 text-gray-600 cursor-pointer accent-yellow-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left">S.No.</th>
                  <th className="px-4 py-3 text-left">Document Name</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Uploaded By</th>
                  <th className="px-4 py-3 text-left">Uploaded On</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {documents.map((doc, index) => (
                  <tr key={doc.id} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(doc.id)}
                        onChange={() => toggleSelect(doc.id)}
                        className="form-checkbox h-5 w-5 accent-yellow-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-2">{index + 1}</td>

                    <td className="px-4 py-2 underline text-gray-800 cursor-pointer">
                      {doc.type === "Folder" ? doc.name : doc.filename}
                    </td>

                    <td className="px-4 py-2">{doc.type}</td>
                    <td className="px-4 py-2">{doc.uploadedBy}</td>
                    <td className="px-4 py-2">
                      {doc.created_at
                        ? new Date(doc.created_at).toISOString().slice(0, 10)
                        : new Date(doc.uploaded_at).toISOString().slice(0, 10)}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          title="Restore"
                          onClick={() => handleRestoreSingle(doc)}
                          className="text-gray-700 hover:text-black cursor-pointer text-xl"
                        >
                          <MdSettingsBackupRestore />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => handleDeleteSingle(doc)}
                          className="text-gray-700 hover:text-black cursor-pointer text-xl"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex justify-center items-center h-full text-gray-600 font-semibold">
              No documents found
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onConfirm={handleConfirmDelete}
        data={documentsToDelete}
      />

      <RestoreConfirmationPopup
        isOpen={isRestorePopupOpen}
        onClose={() => setIsRestorePopupOpen(false)}
        onConfirm={handleConfirmRestore}
        data={documentsToRestore}
      />
    </div>
  );
}
