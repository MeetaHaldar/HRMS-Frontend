import React from "react";

const TrashDeleteConfirmationPopup = ({
  isOpen,
  onClose,
  onConfirm,
  data,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-base font-semibold text-gray-700 mb-6 border-b border-gray-300 pb-4 text-center">
          {message || "Are you sure you want to Move these document to Trash?"}
        </h2>

        <div className="space-y-4">
          {/* Display document details */}
          <div className="space-y-2">
            {data && data.length > 0 ? (
              data.map((doc) => (
                <div
                  key={doc.id}
                  className="flex justify-between text-sm text-gray-600"
                >
                  <span>{doc.documentName}</span>
                  <span>{doc.uploadedBy}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No documents selected.</div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onClose}
            className="w-1/2 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(data)}
            className="w-1/2 py-1 rounded-lg bg-[#FFD85F] hover:bg-yellow-600 text-gray-500 font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrashDeleteConfirmationPopup;
