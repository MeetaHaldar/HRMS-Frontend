import { useState } from "react";
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

  const [cardData, setCardData] = useState({
    organisation: [
      {
        id: 1,
        documentName: "Company Policy.pdf",
        name: "Company Policy",
        folder: "Organisation",
        uploadedBy: "Admin",
        uploadedOn: "2025-04-01",
      },
      {
        id: 2,
        documentName: "Holiday List.docx",
        name: "Holiday List",
        folder: "Organisation",
        uploadedBy: "Admin",
        uploadedOn: "2025-04-02",
      },
    ],
    employee: [
      {
        id: 3,
        documentName: "John Resume.pdf",
        name: "John Resume",
        folder: "Employee",
        uploadedBy: "John Doe",
        uploadedOn: "2025-04-03",
      },
      {
        id: 4,
        documentName: "Jane Offer Letter.pdf",
        name: "Jane Offer Letter",
        folder: "Employee",
        uploadedBy: "Jane Smith",
        uploadedOn: "2025-04-04",
      },
    ],
  });

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
    setCardData((prevData) => {
      const updatedOrganisation = prevData.organisation.filter(
        (doc) => !documentsToRestore.some((d) => d.id === doc.id)
      );
      const updatedEmployee = prevData.employee.filter(
        (doc) => !documentsToRestore.some((d) => d.id === doc.id)
      );
      return { organisation: updatedOrganisation, employee: updatedEmployee };
    });

    setSelectedIds((prev) =>
      prev.filter((id) => !documentsToRestore.some((doc) => doc.id === id))
    );
    setIsRestorePopupOpen(false);
    setDocumentsToRestore([]);
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
    setCardData((prevData) => {
      const updatedOrganisation = prevData.organisation.filter(
        (doc) => !documentsToDelete.some((d) => d.id === doc.id)
      );
      const updatedEmployee = prevData.employee.filter(
        (doc) => !documentsToDelete.some((d) => d.id === doc.id)
      );
      return { organisation: updatedOrganisation, employee: updatedEmployee };
    });

    setSelectedIds((prev) =>
      prev.filter((id) => !documentsToDelete.some((doc) => doc.id === id))
    );
    setIsDeletePopupOpen(false);
    setDocumentsToDelete([]);
  };

  const hasDocuments =
    cardData.organisation.length > 0 || cardData.employee.length > 0;

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
      <div className="flex items-center mb-6">
        <div className="font-2xl">
          <FiTrash2 />
        </div>
        <h2 className="text-lg text-gray-600 font-semibold underline underline-offset-4 ml-2">
          Trash
        </h2>
      </div>

      <div className="relative">
        {/* Toolbar Above Table Header */}
        {selectedIds.length > 0 && (
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
          </div>
        )}

        <div className="rounded-lg overflow-y-auto">
          {hasDocuments ? (
            <table className="w-full border-separate border-spacing-0 border border-gray-400 rounded-xl overflow-hidden mt-6">
              <thead className="bg-gray-200">
                <tr className="text-gray-600 text-sm">
                  <th className="px-4 py-3 text-left rounded-tl-xl">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                      className="form-checkbox h-5 w-5 text-gray-600 border-gray-400 bg-gray-100 accent-gray-50"
                    />
                  </th>
                  <th className="px-4 py-3 text-left">Document Name</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Folder</th>
                  <th className="px-4 py-3 text-left">Uploaded By</th>
                  <th className="px-4 py-3 text-left">Uploaded On</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {[...cardData.organisation, ...cardData.employee].map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(doc.id)}
                        onChange={() => toggleSelect(doc.id)}
                        className="form-checkbox border-gray-400 h-5 w-5 bg-gray-100 accent-gray-50"
                      />
                    </td>
                    <td className="px-4 py-2 font-semibold underline text-gray-800 cursor-pointer">
                      {doc.documentName}
                    </td>
                    <td className="px-4 py-2">{doc.name}</td>
                    <td className="px-4 py-2">{doc.folder}</td>
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
            <div className="flex flex-col justify-center items-center h-full text-gray-600 font-semibold">
              No documents found
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      <DeleteConfirmationPopup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onConfirm={handleConfirmDelete}
        data={documentsToDelete}
      />

      {/* Restore Confirmation Popup */}
      <RestoreConfirmationPopup
        isOpen={isRestorePopupOpen}
        onClose={() => setIsRestorePopupOpen(false)}
        onConfirm={handleConfirmRestore}
        data={documentsToRestore}
      />
    </div>
  );
}
