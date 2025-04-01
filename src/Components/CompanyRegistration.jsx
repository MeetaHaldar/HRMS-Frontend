import React, { useState } from "react";
import axios from "axios";

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    sub_domain: "",
    email: "",
    password: "",
    address_1: "",
    country: "",
    city: "",
    payment_type: "",
    max_employees_limit: "",
    admin: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Company Name is required";
    if (!formData.sub_domain) tempErrors.sub_domain = "Sub Domain is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) tempErrors.email = "Invalid email format";
    if (!formData.password || formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    if (!formData.address_1) tempErrors.address_1 = "Address is required";
    if (!formData.country) tempErrors.country = "Country is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.payment_type) tempErrors.payment_type = "Payment type is required";
    if (!formData.max_employees_limit) tempErrors.max_employees_limit = "Max Employees Limit is required";
    if (!formData.admin) tempErrors.admin = "Admin Name is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${dev_url}/api/auth/company`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log("Navigating to dashboard");
      } else {
        alert("Facing some issues while creating the company");
      }
    } catch (error) {
      alert("Error occurred while registering the company");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-6">
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <img src="src/assets/Login_image.png" alt="Illustration" className="max-w-full h-auto" />
      </div>
      <div className="w-full md:w-1/2 bg-white p-6 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Registration - <span className="font-semibold">Company</span>
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "name", placeholder: "Name" },
            { name: "sub_domain", placeholder: "Sub Domain" },
            { name: "email", placeholder: "Email ID", type: "email" },
            { name: "address_1", placeholder: "Address" },
            { name: "country", placeholder: "Country", maxLength: 2 },
            { name: "city", placeholder: "City" },
            { name: "payment_type", placeholder: "Payment", type: "number" },
            { name: "max_employees_limit", placeholder: "Max Employee Limit", type: "number" },
            { name: "admin", placeholder: "Admin Name" },
            { name: "password", placeholder: "Password", type: "password" },
          ].map(({ name, placeholder, type = "text", maxLength }) => (
            <div key={name}>
              <input
                placeholder={placeholder}
                className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                maxLength={maxLength}
                required
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}
        </form>
        <div className="flex items-center justify-center mt-4">
          <input type="checkbox" className="mr-2" required />
          <p className="text-sm text-gray-600">
            By continuing, I agree to the <span className="font-semibold">Terms & Conditions</span> and <span className="font-semibold">Privacy Policy</span>.
          </p>
        </div>
        <button type="submit" className="w-72 mt-4 bg-gray-500 text-white text-lg font-semibold py-2 px-6 rounded-full hover:bg-yellow-500 transition block mx-auto">
          Register
        </button>
      </div>
    </div>
  );
};

export default CompanyRegistration;