import React, { useState } from "react";
import illustration from "../assets/0afbe8ca-627e-4210-93c5-ca8a73900f38.png";
import { CheckCircle } from "lucide-react"; // for checkmark icon

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdated, setIsUpdated] = useState(false); // ✅ toggle screen

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Simulate update
    console.log("Password updated:", newPassword);
    setIsUpdated(true); // ✅ switch to success screen
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Illustration */}
        <div className="flex justify-center">
          <img
            src={illustration}
            alt="Illustration"
            className="w-full max-w-md"
          />
        </div>

        {/* Right Side */}
        {!isUpdated ? (
          // 👉 Reset Password Form
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Reset Password
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 text-gray-700"
              />
              <input
                type="password"
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-2 text-gray-700"
              />
              <button
                type="submit"
                className="w-full bg-gray-600 text-white py-3 rounded-full hover:bg-gray-700 transition duration-200"
              >
                Update Password
              </button>
            </form>
          </div>
        ) : (
          // ✅ Password Updated Confirmation
          <div className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Password Updated
            </h2>
            <div className="bg-yellow-300 rounded-full p-6">
              <CheckCircle className="text-black" size={40} strokeWidth={2.5} />
            </div>
            <p className="text-center text-gray-700 text-lg">
              Your Password has been Updated
            </p>
            <button
              onClick={() => console.log("Go to login or home")}
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
