import { FiFolderPlus } from "react-icons/fi";
import AddNewFolderButton from "./AddNewFolderButton";

export default function MoveToFolderPopup({ onClose }) {
  const folders = Array.from({ length: 9 }, (_, i) => `Folder no. ${i + 1}`);

  return (
    <div className="absolute top-[240px] left-8 bg-white border border-gray-300 rounded-xl shadow-md w-48 z-20">
      <div className="flex items-center p-3 border-b border-gray-200">
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <FiFolderPlus />
          <span>Move to:</span>
        </div>
      </div>
      <ul className="text-sm text-gray-700 divide-y divide-gray-100 max-h-56 overflow-auto">
        {folders.map((folder, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {folder}
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center p-3 border-t border-gray-200 text-xs">
        <AddNewFolderButton className="text-xs" />
        <button
          onClick={onClose}
          className="text-xs text-gray-600 underline underline-offset-2 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
