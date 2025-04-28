import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { MdSettingsBackupRestore } from "react-icons/md";

export default function Trash() {
  const [selectedIds, setSelectedIds] = useState([]);

  const cardData = {
    organisation: [
      {
        id: 1,
        documentName: "Company Policy.pdf",
        name: "Company Policy", // This can be a different field representing the "Name"
        folder: "Organisation",
        uploadedBy: "Admin",
        uploadedOn: "2025-04-01",
      },
      {
        id: 2,
        documentName: "Holiday List.docx",
        name: "Holiday List", // Different field
        folder: "Organisation",
        uploadedBy: "Admin",
        uploadedOn: "2025-04-02",
      },
    ],
    employee: [
      {
        id: 3,
        documentName: "John Resume.pdf",
        name: "John Resume", // Different field
        folder: "Employee",
        uploadedBy: "John Doe",
        uploadedOn: "2025-04-03",
      },
      {
        id: 4,
        documentName: "Jane Offer Letter.pdf",
        name: "Jane Offer Letter", // Different field
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

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg text-gray-600 font-semibold">Trash</h2>
      </div>

      {/* Selection Toolbar */}
      {selectedIds.length > 0 && (
        <div className="absolute py-3 w-1/5 left-8 right-8 top-[200px] mb-2 z-10 bg-white border border-gray-300 rounded-lg p-3 shadow-md flex space-x-4 items-center">
          <button
            title="Restore"
            className="text-gray-700 hover:text-black text-xl"
          >
            <MdSettingsBackupRestore />
          </button>
          <button
            title="Delete"
            className="text-gray-700 hover:text-black text-xl"
          >
            <FiTrash2 />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-grow overflow-auto">
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
                Name
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
            {[...cardData.organisation, ...cardData.employee].map((doc) => (
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
                      className="text-gray-700 hover:text-black"
                    >
                      <MdSettingsBackupRestore />
                    </button>
                    <button
                      title="Delete"
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
      </div>
    </div>
  );
}
