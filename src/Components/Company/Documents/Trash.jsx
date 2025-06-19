import { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { MdSettingsBackupRestore } from "react-icons/md";
import DeleteConfirmationPopup from "../../SuperAdmin/DeleteConfirmationPopup";
import RestoreConfirmationPopup from "./RestoreConfirmationPopup";

export default function Trash() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isRestorePopupOpen, setIsRestorePopupOpen] = useState(false);
  const [documentsToDelete, setDocumentsToDelete] = useState([]);
  const [documentsToRestore, setDocumentsToRestore] = useState([]);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  const [cardData, setCardData] = useState({
    organisation: [],
    employee: [],
  });

  useEffect(() => {
    fetchTrashData();
  }, []);

  const fetchTrashData = async () => {
    try {
      const res = await axios.get("http://localhost:10000/salary/TrashList", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const folders = res.data?.data?.[0]?.folders || [];
      const files = res.data?.data?.[1]?.files || [];

      setCardData({ organisation: folders, employee: files });
    } catch (error) {
      console.error("Failed to fetch trash list:", error);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id]
    );
  };

  const allSelected =
    selectedIds.length ===
    cardData.organisation.length + cardData.employee.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds([
        ...cardData.organisation.map((doc) => doc.id),
        ...cardData.employee.map((doc) => doc.id),
      ]);
    }
    setIsToolbarOpen(true);
  };

  const handleRestoreSingle = (doc) => {
    setDocumentsToRestore([doc]);
    setIsRestorePopupOpen(true);
  };

  const handleBulkRestore = () => {
    const selectedDocs = [
      ...cardData.organisation.filter((doc) => selectedIds.includes(doc.id)),
      ...cardData.employee.filter((doc) => selectedIds.includes(doc.id)),
    ];
    setDocumentsToRestore(selectedDocs);
    setIsRestorePopupOpen(true);
  };

  const handleConfirmRestore = () => {
    setCardData((prevData) => ({
      organisation: prevData.organisation.filter(
        (doc) => !documentsToRestore.some((d) => d.id === doc.id)
      ),
      employee: prevData.employee.filter(
        (doc) => !documentsToRestore.some((d) => d.id === doc.id)
      ),
    }));
    setSelectedIds((prev) =>
      prev.filter((id) => !documentsToRestore.some((doc) => doc.id === id))
    );
    setIsRestorePopupOpen(false);
    setDocumentsToRestore([]);
    setIsToolbarOpen(false);
  };

  const handleDeleteSingle = (doc) => {
    setDocumentsToDelete([doc]);
    setIsDeletePopupOpen(true);
  };

  const handleBulkDelete = () => {
    const selectedDocs = [
      ...cardData.organisation.filter((doc) => selectedIds.includes(doc.id)),
      ...cardData.employee.filter((doc) => selectedIds.includes(doc.id)),
    ];
    setDocumentsToDelete(selectedDocs);
    setIsDeletePopupOpen(true);
  };

  const handleConfirmDelete = () => {
    setCardData((prevData) => ({
      organisation: prevData.organisation.filter(
        (doc) => !documentsToDelete.some((d) => d.id === doc.id)
      ),
      employee: prevData.employee.filter(
        (doc) => !documentsToDelete.some((d) => doc.id === d.id)
      ),
    }));
    setSelectedIds((prev) =>
      prev.filter((id) => !documentsToDelete.some((doc) => doc.id === id))
    );
    setIsDeletePopupOpen(false);
    setDocumentsToDelete([]);
    setIsToolbarOpen(false);
  };

  const hasDocuments =
    cardData.organisation.length > 0 || cardData.employee.length > 0;

  const allDocs = [
    ...cardData.organisation.map((doc) => ({
      ...doc,
      type: "Organisation",
      displayName: doc.name,
      uploadedBy: "Admin",
      uploadedOn: new Date(doc.created_at).toISOString().slice(0, 10),
    })),
    ...cardData.employee.map((doc) => ({
      ...doc,
      type: "Employee",
      displayName: doc.name,
      file_name: doc.file_name || doc.name,
      uploadedBy: "Admin",
      uploadedOn: new Date(doc.created_at).toISOString().slice(0, 10),
    })),
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
      <div className="flex items-center mb-6">
        <div className="font-2xl">
          <FiTrash2 />
        </div>
        <h2 className="text-lg text-gray-600 font-semibold underline ml-2">
          Trash
        </h2>
      </div>

      <div className="relative">
        {isToolbarOpen && selectedIds.length > 0 && (
          <div className="absolute -top-4 left-4 z-10 bg-white border border-gray-300 rounded-lg p-2 shadow-md flex space-x-4 items-center">
            <button
              title="Restore"
              onClick={handleBulkRestore}
              className="text-gray-700 hover:text-black text-xl"
            >
              <MdSettingsBackupRestore />
            </button>
            <button
              title="Delete"
              onClick={handleBulkDelete}
              className="text-gray-700 hover:text-black text-xl"
            >
              <FiTrash2 />
            </button>
            <button
              title="Cancel"
              onClick={() => {
                setIsToolbarOpen(false);
                setSelectedIds([]);
              }}
              className="text-gray-500 text-xs underline"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="rounded-lg overflow-y-auto">
          {hasDocuments ? (
            <table className="w-full border border-gray-400 rounded-xl mt-6">
              <thead className="bg-gray-200">
                <tr className="text-gray-600 text-sm">
                  <th className="px-4 py-3 text-left">S.No.</th>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                      className="form-checkbox h-5 w-5 text-gray-600"
                    />
                  </th>
                  <th className="px-4 py-3 text-left">Document Name</th>
                  {/* <th className="px-4 py-3 text-left">File Name</th>
                  <th className="px-4 py-3 text-left">Folder</th>
                  <th className="px-4 py-3 text-left">Uploaded By</th> */}
                  <th className="px-4 py-3 text-left">Uploaded On</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {allDocs.map((doc, index) => (
                  <tr key={doc.id} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(doc.id)}
                        onChange={() => toggleSelect(doc.id)}
                        className="form-checkbox h-5 w-5"
                      />
                    </td>
                    <td className="px-4 py-2 underline text-gray-800 cursor-pointer">
                      {doc.displayName}
                    </td>
                    <td className="px-4 py-2">{doc.file_name || "-"}</td>
                    <td className="px-4 py-2">{doc.type}</td>
                    <td className="px-4 py-2">{doc.uploadedBy}</td>
                    <td className="px-4 py-2">{doc.uploadedOn}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          title="Restore"
                          onClick={() => handleRestoreSingle(doc)}
                          className="text-gray-700 hover:text-black"
                        >
                          <MdSettingsBackupRestore />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => handleDeleteSingle(doc)}
                          className="text-gray-700 hover:text-black"
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
