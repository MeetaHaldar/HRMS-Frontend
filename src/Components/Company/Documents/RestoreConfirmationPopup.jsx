import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const RestoreConfirmationPopup = ({
  isOpen,
  onClose,
  onConfirm,
  data = [],
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center mb-4">
          <FiAlertTriangle className="text-yellow-500 text-3xl mb-2" />
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            Confirm Restore
          </h3>
        </div>
        <p className="text-sm text-gray-700 mb-6 text-center">
          Are you sure you want to restore {data.length} document
          {data.length > 1 ? "s" : ""}?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="w-32 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-32 px-4 py-2 text-sm text-gray-800 bg-[#FFD58F] hover:bg-yellow-600 rounded-md"
          >
            Restore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestoreConfirmationPopup;
