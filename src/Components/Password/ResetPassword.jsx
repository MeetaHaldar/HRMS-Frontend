import { useState } from "react";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dev_url from "../../config";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isUpdated, setIsUpdated] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    try {
      await axios.put(`${dev_url}api/auth/resetPswd`, {
        token,
        newpass: confirmPassword,
      });

      setMessage({ type: "success", text: "Password updated successfully" });
      setIsUpdated(true);
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setMessage({
        type: "error",
        text: "Failed to update password. Please check the code and try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img
            src={`https://chatgpt.com/`}
            alt="Illustration"
            className="w-full max-w-md"
          />
        </div>

        {!isUpdated ? (
          <div className="flex flex-col justify-center w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Reset Password
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <input
                type="text"
                placeholder="Enter Code"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 text-gray-700"
              />

              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 text-gray-700 pr-10"
                />
                <span
                  className="absolute right-2 top-2 cursor-pointer text-gray-500"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 text-gray-700 pr-10"
                />
                <span
                  className="absolute right-2 top-2 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              {message.text && (
                <p
                  className={`text-sm ${
                    message.type === "error" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {message.text}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-gray-600 text-white py-3 rounded-full hover:bg-gray-700 transition duration-200"
              >
                Update Password
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Password Updated
            </h2>
            <div className="bg-yellow-300 rounded-full p-6">
              <CheckCircle className="text-black" size={40} strokeWidth={2.5} />
            </div>
            <p className="text-center text-green-600 text-lg">
              Your password has been updated successfully
            </p>
            <button
              onClick={() => navigate("/signIn")}
              className="bg-gray-600 text-white py-3 px-10 rounded-full hover:bg-gray-700 transition duration-200"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
