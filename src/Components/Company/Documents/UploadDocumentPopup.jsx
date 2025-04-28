import { useState } from "react";
import { FiUpload, FiTrash2, FiEdit2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import AddNewFolderButton from "./AddNewFolderButton";

export default function UploadDocumentPopup({ isOpen, onClose, onUpload }) {
  const [step, setStep] = useState(1); // 1: Upload Step, 2: Document Details Step
  const [file, setFile] = useState(null);
  const [folderType, setFolderType] = useState("");
  const [folderName, setFolderName] = useState("");
  const [associateDocument, setAssociateDocument] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile({
        name: selectedFile.name,
        size: (selectedFile.size / (1024 * 1024)).toFixed(1) + "MB",
      });
      setStep(2);
    }
  };

  const handleSave = () => {
    if (file && folderType && folderName) {
      onUpload({
        name: file.name,
        size: file.size,
        folder: folderName,
        folderType,
        associateDocument,
        uploadedBy: "You",
        uploadedOn: new Date().toLocaleDateString(),
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setFile(null);
    setStep(1);
    setFolderType("");
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
    <div className="fixed inset-0 flex items-center justify-center z-50  backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
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
            <label className="bg-[#FFD85F] hover:bg-yellow-400 text-gray-600 py-2 px-4 rounded-full shadow cursor-pointer">
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
            <div className="flex items-center bg-gray-100 p-4 rounded-lg justify-between">
              <div>
                <p className="font-semibold text-gray-700">{file.name}</p>
                <p className="text-sm text-gray-400">{file.size}</p>
              </div>
              <div className="flex items-center space-x-3 text-gray-500">
                <button>
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => {
                    setFile(null);
                    setStep(1);
                  }}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="folderType"
                  value="Organisation Folder"
                  checked={folderType === "Organisation Folder"}
                  onChange={(e) => setFolderType(e.target.value)}
                />
                <span className="text-gray-600">Organisation Folder</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="folderType"
                  value="Employee Folder"
                  checked={folderType === "Employee Folder"}
                  onChange={(e) => setFolderType(e.target.value)}
                />
                <span className="text-gray-600">Employee Folder</span>
              </label>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Folder Name*</label>
              <select
                className="border border-gray-300 rounded-lg p-2"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              >
                <option value="">Select folder</option>
                <option value="Folder 1">Folder 1</option>
                <option value="Folder 2">Folder 2</option>
                <option value="Folder 3">Folder 3</option>
              </select>
              <AddNewFolderButton />
            </div>

            {folderType === "Employee Folder" && (
              <div className="flex flex-col mt-4">
                <label className="text-gray-600 mb-1">
                  Associate Document To*
                </label>
                <select
                  className="border border-gray-300 rounded-lg p-2"
                  value={associateDocument}
                  onChange={(e) => setAssociateDocument(e.target.value)}
                >
                  <option value="">Select associated document</option>
                  <option value="Document 1">Document 1</option>
                  <option value="Document 2">Document 2</option>
                  <option value="Document 3">Document 3</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* Footer buttons */}
        <div className="flex justify-between space-x-4 mt-6">
          <button
            onClick={handleSave}
            disabled={step === 1}
            className="bg-[#FFD85F] w-1/2 hover:bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded-full shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Documents
          </button>
          <button
            onClick={handleClose}
            className="border border-gray-300 w-1/2 text-gray-600 hover:bg-gray-100 py-2 px-4 rounded-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
