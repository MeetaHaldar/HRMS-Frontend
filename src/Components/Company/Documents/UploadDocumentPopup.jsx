import { useEffect, useState } from "react";
import { FiUpload, FiTrash2, FiEdit2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import AddNewFolderButton from "./AddNewFolderButton";
import axios from "axios";
import dev_url from "../../../config";

export default function UploadDocumentPopup({ isOpen, onClose, onUpload }) {
  const [file, setFile] = useState(null);
  const [folderType, setFolderType] = useState({
    "Organisation Folder": false,
    "Employee Folder": false,
  });
  const [folderName, setFolderName] = useState("");
  const [associateDocument, setAssociateDocument] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [step, setStep] = useState(1);

  const [organizationFolders, setOrganizationFolders] = useState([]);
  const [employeeFolders, setEmployeeFolders] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    const token = localStorage.getItem("token");

    const fetchFoldersAndEmployees = async () => {
      try {
        const [orgRes, empRes, employeeRes] = await Promise.all([
          axios.get(
            `${dev_url}salary/getlist?type=folders&field=type&value=org`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          axios.get(
            `${dev_url}salary/getlist?type=folders&field=type&value=employee`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          axios.get(`${dev_url}api/employee/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setOrganizationFolders(orgRes.data.data);
        setEmployeeFolders(empRes.data.data);
        setEmployeeList(employeeRes.data.employees);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchFoldersAndEmployees();
  }, [isOpen]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("selected fileeeeeee", selectedFile);
    setFile(selectedFile);
    setStep(2);
  };

  const handleSave = async () => {
    if (
      file &&
      (folderType["Organisation Folder"] || folderType["Employee Folder"]) &&
      folderName
    ) {
      try {
        const token = localStorage.getItem("token");

        const selectedFolderList = folderType["Organisation Folder"]
          ? organizationFolders
          : employeeFolders;

        const selectedFolder = selectedFolderList.find(
          (f) => f.name === folderName
        );

        if (!selectedFolder) {
          alert("Invalid folder selected.");
          return;
        }

        const folder_id = selectedFolder.id;

        const formData = new FormData();
        formData.append("folderId", folder_id);
        if (folderType["Employee Folder"]) {
          formData.append("employee_id", associateDocument);
        }
        formData.append("file", file);

        const res = await axios.post(`${dev_url}salary/addfile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        handleClose();
      } catch (err) {
        console.error("Upload error:", err);
        const message =
          err.response?.data?.message ||
          "Error uploading file. Please try again.";
        alert(message);
      }
    }
  };

  const handleClose = () => {
    setFile(null);
    setStep(1);
    setFolderType({
      "Organisation Folder": false,
      "Employee Folder": false,
    });
    setFolderName("");
    setAssociateDocument("");
    onClose();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) {
      setFile({
        name: selectedFile.name,
        size: (selectedFile.size / (1024 * 1024)).toFixed(1) + "MB",
      });
      setStep(2);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl px-6 py-5 w-[430px] relative shadow-lg">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
        >
          <IoMdClose />
        </button>

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          New Document
        </h2>

        {step === 1 && (
          <div
            className={`flex flex-col items-center border border-dashed ${
              isDragOver
                ? "border-Gray-400 bg-yellow-50"
                : "border-Gray-300 bg-yellow-50"
            } p-6 rounded-lg mb-6`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className="text-gray-600 font-semibold mb-2">
              Drag & Drop Files here
            </p>

            <div className="text-4xl text-Gray-400 mb-4">
              <FiUpload />
            </div>
            <p className="text-gray-400 mb-4">or</p>
            <label className="bg-[#FFD85F] hover:bg-[#FFD85F]  text-gray-600 py-2 px-4 rounded-full shadow cursor-pointer">
              Choose file to upload
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-s text-gray-500 mt-4">
              Maximum Upload File Size: 50MB
            </p>
          </div>
        )}

        {step === 2 && file && (
          <div className="space-y-4">
            <div className="mb-2">
              <label className="block text-sm text-gray-700">
                Selected Document
              </label>
            </div>

            <div className="flex items-center bg-[#FFFAEB] border-dashed border-2 p-4 rounded-lg justify-between">
              <div>
                <p className="font-semibold text-gray-700">{file.name}</p>
                <p className="text-sm text-gray-400">{file.size}</p>
              </div>
              <div className="flex items-center space-x-3 text-gray-500">
                <button onClick={() => setStep(1)} className="cursor-pointer">
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => {
                    setFile(null);
                    setStep(1);
                  }}
                  className="cursor-pointer"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={folderType["Organisation Folder"]}
                  onChange={(e) =>
                    setFolderType((prev) => ({
                      ...prev,
                      "Organisation Folder": e.target.checked,
                    }))
                  }
                  className="accent-yellow-500"
                />
                <span>Organisation Folder</span>
              </label>
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={folderType["Employee Folder"]}
                  onChange={(e) =>
                    setFolderType((prev) => ({
                      ...prev,
                      "Employee Folder": e.target.checked,
                    }))
                  }
                  className="accent-yellow-500"
                />
                <span>Employee Folder</span>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">
                Folder Name<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border border-dashed bg-[#FFFAEB] px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              >
                <option value="">Select folder</option>
                {(folderType["Organisation Folder"]
                  ? organizationFolders
                  : employeeFolders
                ).map((folder) => (
                  <option key={folder.id} value={folder.name}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>

            {folderType["Employee Folder"] && (
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-1">
                  Associate Document To<span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full border border-dashed bg-[#FFFAEB] px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={associateDocument}
                  onChange={(e) => setAssociateDocument(e.target.value)}
                >
                  <option value="">Select employee</option>
                  {employeeList.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.first_name +
                        " " +
                        (emp.last_name ? emp.last_name : "")}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex flex-col items-center mt-4 text-sm text-gray-600">
              <span className="mb-1">or</span>
              <span className="text-black font-semibold cursor-pointer">
                <AddNewFolderButton />
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-between space-x-4 mt-6">
          <button
            onClick={handleSave}
            disabled={step === 1}
            className="w-1/2 py-2 rounded-full bg-[#FFD85F] hover:bg-[#FFD85F] text-sm font-semibold text-gray-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Save Documents
          </button>
          <button
            onClick={handleClose}
            className="w-1/2 py-2 rounded-full border text-sm font-medium text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
