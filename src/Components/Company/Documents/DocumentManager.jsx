import { useEffect, useState } from "react";
import { FiFolderPlus, FiTrash2, FiPlus, FiEdit } from "react-icons/fi";
import UploadDocumentPopup from "./UploadDocumentPopup";
import AddNewFolderButton from "./AddNewFolderButton";
import TrashDeleteConfirmationPopup from "./TrashDeleteConfirmationPopup";
import EditDocumentPopup from "./EditDocumentPopup";
import MoveToFolderPopup from "./MoveToFolderPopup";
import dev_url from "../../../config";
import axios from "axios";
import TrashButton from "./TrashButton";
import { useNavigate } from "react-router-dom";
import AddNewFolder from "./AddNewFolder";
export default function DocumentManager() {
  const [activeTab, setActiveTab] = useState("all");
  const [isUploadPopupOpen, setIsUploadPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [documentToEdit, setDocumentToEdit] = useState(null);
  const [isMoveToPopupOpen, setIsMoveToPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  const [isAddFolderPopupOpen, setIsAddFolderPopupOpen] = useState(false);
  const [folderToEdit, setFolderToEdit] = useState(null);

  const [cardData, setCardData] = useState({
    all: [],
    organisation: [],
    employee: [],
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllDocuments = async () => {
      try {
        const [orgRes, empRes] = await Promise.all([
          axios.get(
            `${dev_url}salary/getlist?type=folders&field=type&value=org`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(
            `${dev_url}salary/getlist?type=folders&field=type&value=employee`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        const organisation = orgRes.data.data;
        const employee = empRes.data.data;

        setCardData({ organisation, employee, all: [] });
      } catch (error) {
        console.error("Error fetching initial documents:", error);
      }
    };

    fetchAllDocuments();
  }, []);

  const getCombinedAllDocuments = () => {
    return [...cardData.organisation, ...cardData.employee];
  };

  const allDocs =
    activeTab === "all" ? getCombinedAllDocuments() : cardData[activeTab];

  const handleUpload = (newDoc) => {
    const updated = { ...cardData };
    const folderKey = newDoc.folder.toLowerCase();
    updated[folderKey].push({ id: Date.now(), ...newDoc });
    setCardData(updated);
    setIsUploadPopupOpen(false);
  };

  const handleDeleteClick = (doc) => {
    setIsDeletePopupOpen(true);

    setDocToDelete(doc);
  };

  const confirmDelete = async () => {
    if (!docToDelete) return;
    try {
      await axios.put(
        `${dev_url}salary/moveToTrash`,
        {
          id: docToDelete.id,
          type: "folders",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updated = { ...cardData };
      Object.keys(updated).forEach((key) => {
        updated[key] = updated[key].filter((doc) => doc.id !== docToDelete.id);
      });

      setCardData(updated);
      setDocToDelete(null);
      setIsDeletePopupOpen(false);
    } catch (error) {
      console.error("Failed to move to trash:", error);
    }
  };

  const cancelDelete = () => {
    setDocToDelete(null);
    setIsDeletePopupOpen(false);
  };

  const handleEdit = (id) => {
    const folder = allDocs.find((f) => f.id === id);
    if (folder) {
      setFolderToEdit(folder);
      setIsAddFolderPopupOpen(true);
    }
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
  const handleFolderSave = () => {
    if (folderToEdit?.type === "employee") {
      fetchDocuments("employee");
    } else {
      fetchDocuments("org");
    }
    setFolderToEdit(null);
    setIsAddFolderPopupOpen(false);
  };

  const fetchDocuments = async (folderType) => {
    try {
      const res = await axios.get(
        `${dev_url}salary/getlist?type=folders&field=type&value=${folderType}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updated = { ...cardData };
      updated[folderType === "org" ? "organisation" : "employee"] =
        res.data.data;
      setCardData(updated);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg text-gray-600 font-semibold">Documents:</h2>
        <button
          onClick={() => setIsUploadPopupOpen(true)}
          className="flex items-center space-x-2 bg-[#FFD85F] hover:bg-yellow-400 text-gray-700 font-semibold py-2 px-4 rounded-full cursor-pointer shadow"
        >
          <FiPlus />
          <span>Add Document</span>
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
            onClick={() => {
              setActiveTab(tab.key);
              if (tab.key === "employee") fetchDocuments("employee");
              else if (tab.key === "organisation") fetchDocuments("org");
            }}
            className={`flex-1 py-6 rounded-lg font-semibold text-lg shadow cursor-pointer ${
              activeTab === tab.key
                ? "bg-[#FFD85F] text-gray-600"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

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
          <table className="min-w-full border-separate border-spacing-0 border border-gray-400 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm">
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Folder Name
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Folder Type
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Description
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Created On
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
                  <td
                    className="px-4 py-2 font-semibold underline underline-offset-4 text-gray-800 cursor-pointer"
                    onClick={() =>
                      navigate("/companyAdmin/folderFileTable", {
                        state: {
                          type: "files",
                          field: "folder_id",
                          value: doc.id,
                          foldername: doc.name,
                        },
                      })
                    }
                  >
                    {doc.name}
                  </td>

                  <td className="px-4 py-2">{doc.type}</td>
                  <td className="px-4 py-2">{doc.description}</td>
                  <td className="px-4 py-2">
                    {" "}
                    {doc.created_at?.slice(0, 10) || "—"}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(doc.id)}
                      className="cursor-pointer text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(doc)}
                      className="cursor-pointer text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
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
        <div className="flex flex-col items-center justify-center text-gray-500 text-lg font-semibold mt-8 space-y-2">
          <div>or</div>
          <AddNewFolderButton
            onClick={() => {
              setFolderToEdit(null);
              setIsAddFolderPopupOpen(true);
            }}
          />
        </div>
      )}

      <div className="p-8 bg-gray-50 min-h-screen flex flex-col relative">
        <TrashButton />
      </div>
      <AddNewFolder
        isOpen={isAddFolderPopupOpen}
        onClose={() => {
          setIsAddFolderPopupOpen(false);
          setFolderToEdit(null);
        }}
        item={folderToEdit}
        onSuccess={handleFolderSave}
      />

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
      {isMoveToPopupOpen && (
        <MoveToFolderPopup onClose={() => setIsMoveToPopupOpen(false)} />
      )}
      <TrashDeleteConfirmationPopup
        isOpen={isDeletePopupOpen}
        onConfirm={confirmDelete}
        onClose={cancelDelete}
        data={[docToDelete]}
      />
    </div>
  );
}
