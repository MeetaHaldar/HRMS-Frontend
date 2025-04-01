import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [errors, setErrors] = useState({});

  // Form validation function
  const validate = () => {
    let tempErrors = {};

    if (!formData.name) tempErrors.name = "Name is ";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) tempErrors.email = "Invalid email format";
    if (!formData.password || formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; // Prevent submission if validation fails

    try {
      const response = await axios.post(`${dev_url}/api/auth/login`, formData);

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on user role
      if (user.role === "superAdmin") {
        window.location.href = "/admin/dashboard";
      } else if (user.role === "systemAdmin") {
        window.location.href = "/company/dashboard";
      }
    } catch (err) {
      // Display error notification
      setErr("Failed to login. Please try again later.");
      setTimeout(() => setErr(""), 5000); // Auto-dismiss error after 5 seconds
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-6">
      {/* Error Notification */}
      {err && (
        <div className="w-full bg-red-500 text-white p-4 rounded-md mb-4 absolute top-0 left-0 right-0 z-10">
          <p>{err}</p>
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:hidden">Login</h2>

      <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
        <img
          src="src/assets/Login_image.png"
          alt="Illustration"
          className="max-w-full h-auto"
        />
      </div>

      <div className="w-full md:w-1/2 bg-white p-6 border-gray-200 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center hidden md:block">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-[90%] md:w-[50%]">
          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
              value={formData.name}
              onChange={handleChange}
              
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
              value={formData.email}
              onChange={handleChange}
              
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
              value={formData.password}
              onChange={handleChange}
              
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2 mt-2">
            <input type="checkbox" className="mt-1"  />
            <p className="text-sm text-gray-600">
              By continuing, I agree to the{" "}
              <span className="font-semibold">Terms & Conditions</span> and{" "}
              <span className="font-semibold">Privacy Policy</span>.
            </p>
          </div>

          {/* Login Button */}
          <button className="w-72 mt-4 bg-gray-500 text-white text-lg font-semibold py-2 px-6 rounded-full hover:bg-yellow-500 transition mx-auto">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
