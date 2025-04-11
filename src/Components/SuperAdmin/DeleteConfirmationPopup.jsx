import React from "react";

const DeleteConfirmationPopup = ({ isOpen, onClose, onConfirm, data, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {message || "Are you sure you want to delete this?"}
        </h2>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(data)}
            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;
