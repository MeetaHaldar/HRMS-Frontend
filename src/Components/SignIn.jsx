import { useState } from "react";
import axios from "axios";
import dev_url from "../config";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // 👁 Toggle state

  const validate = () => {
    let tempErrors = {};

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      tempErrors.email = "Invalid email format";
    if (!formData.password || formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post(`${dev_url}api/auth/login`, formData);

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const roles = user.role;

      if (roles.includes("superAdmin")) {
        window.location.href = "/CompaniesList";
      } else if (roles.includes("systemAdmin")) {
        window.location.href = "/companyAdmin/CompanyDashboard";
      } else if (roles.includes("employee")) {
        window.location.href = "/employee/dashboard";
      } else {
        setErr("Unauthorized access. Please contact admin.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error(error);
      setErr(error.response?.data?.message || "Login failed");
      setTimeout(() => setErr(""), 5000);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-6">
      {/* Error Message */}
      {err && (
        <div className="w-full bg-red-500 text-white p-4 rounded-md mb-4 absolute top-0 left-0 right-0 z-10 text-center">
          {err}
        </div>
      )}

      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
        <img
          src="src/assets/Login_image.png"
          alt="Login"
          className="max-w-full h-auto"
        />
      </div>

      {/* Form */}
      <div className="w-full md:w-1/2 bg-white p-6 border-gray-200 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign In
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-[90%] md:w-[50%]"
        >
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border-b border-gray-300 p-2 pr-10 placeholder-gray-400 focus:outline-none focus:border-black"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Forgot password link */}
          <div className="text-right -mt-3">
            <button
              type="button"
              onClick={() => navigate("/forgotPassword")}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <div className="flex items-start gap-2 mt-2">
            <input
              type="checkbox"
              required
              className="mt-1 accent-yellow-500"
            />
            <p className="text-sm text-gray-600">
              I agree to the{" "}
              <span className="font-semibold">Terms & Conditions</span> and{" "}
              <span className="font-semibold">Privacy Policy</span>.
            </p>
          </div>

          <button
            type="submit"
            className="w-72 mt-4 bg-gray-500 text-white text-lg font-semibold py-2 px-6 rounded-full hover:bg-yellow-500 transition mx-auto"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
