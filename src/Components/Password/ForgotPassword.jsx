import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle email submission logic
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img src="" alt="Illustration" className="w-full max-w-md" />
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
          </form>
        </div>
      </div>
    </div>
  );
}
