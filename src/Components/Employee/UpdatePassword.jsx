import { useState } from "react";
import axios from "axios";
import dev_url from "../../config";
const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");

  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const showTempNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2500);
  };

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
  };

  const handleUpdatePassword = async () => {
    if (!oldPassword.trim() || !newPassword.trim()) {
      showTempNotification("error", "Both fields are required.");
      return;
    }

    try {
      const response = await axios.put(
        `${dev_url}api/auth/changepassword`,
        {
          oldpass: oldPassword,
          newpass: newPassword,
          id: userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showTempNotification(
        "success",
        response.data?.message || "Password updated successfully."
      );
      resetForm();
    } catch (error) {
      console.error("Error updating password:", error);
      const message =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "Failed to update password.";
      showTempNotification("error", message);
    }
  };

  const isFormValid = oldPassword.trim() && newPassword.trim();

  return (
    <div className="p-6 max-w-md">
      <p className="text-lg md:text-lg font-semibold text-gray-500 mb-6">
        Update Password
      </p>

      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 mb-3 placeholder-italic"
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 mb-6 placeholder-italic"
      />

      <div className="flex space-x-4">
        <button
          onClick={handleUpdatePassword}
          className={`bg-[#FFD85F] text-gray-800 font-semibold px-6 py-1 rounded-full shadow-md ${
            isFormValid
              ? "hover:bg-yellow-300 cursor-pointer"
              : "cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Update
        </button>
        <button
          onClick={resetForm}
          className="border border-gray-300 text-gray-700 px-6 py-1 rounded-full cursor-pointer"
        >
          Cancel
        </button>
      </div>

      {showNotification && (
        <p
          className={`mt-4 text-sm font-medium ${
            notificationType === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {notificationMessage}
        </p>
      )}
    </div>
  );
};

export default UpdatePassword;
