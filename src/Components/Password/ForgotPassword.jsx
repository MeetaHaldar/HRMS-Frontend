import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dev_url from "../../config";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${dev_url}api/auth/sendCode`, {
        email: email,
      });
      setMessage("Code is sent");
      setTimeout(() => {
        navigate("/ResetPassword");
      }, 1500);
    } catch (error) {
      setMessage("Failed to send code. Please try again.");
      console.error("Error:", error);
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

        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Forgot Your Password?
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full flex flex-col items-center"
          >
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-1/2 border-b border-gray-300 focus:outline-none focus:border-black py-2 text-gray-700"
            />

            <button
              type="submit"
              className="w-1/2 bg-yellow-500 text-white py-3 rounded-full hover:bg-yellow-600 transition duration-200"
            >
              Send Code
            </button>

            {message && (
              <p className="text-sm text-center text-green-600">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
