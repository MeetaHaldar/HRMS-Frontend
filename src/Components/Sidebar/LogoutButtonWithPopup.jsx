import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LogoutButtonWithPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signIn");
  };

  return (
    <>
      {/* Logout Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="w-full flex items-center p-2 space-x-3 rounded-md justify-center lg:justify-start text-gray-600 hover:bg-gray-100 transition"
      >
        <span className="text-xl">
          <FiLogOut />
        </span>
        <span className="hidden lg:inline font-medium">Logout</span>
      </button>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-sm text-center">
            <p className="text-gray-800 text-md font-medium mb-4">
              Are you sure you want to logout?
            </p>
            <hr className="mb-4" />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-md bg-[#FFD85F] hover:bg-yellow-300 text-gray-800 font-semibold transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButtonWithPopup;
