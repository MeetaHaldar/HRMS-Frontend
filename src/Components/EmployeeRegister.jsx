import React, { useState } from "react";
import axios from "axios";
// import dev_url from "../config";

const EmployeeRegister = () => {
  const [formData, setFormData] = useState({
    emp_code: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    hire_date: "",
    department_id: "",
    position_id: "",
    company_id: "",
    is_active: "yes",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.emp_code) tempErrors.emp_code = "Employee Code is required";
    if (!formData.first_name) tempErrors.first_name = "First Name is required";
    if (!formData.last_name) tempErrors.last_name = "Last Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) tempErrors.email = "Invalid email format";
    if (!formData.mobile.match(/^\d{10}$/)) tempErrors.mobile = "Mobile number must be 10 digits";
    if (!formData.hire_date) tempErrors.hire_date = "Hire Date is required";
    if (!formData.department_id) tempErrors.department_id = "Department ID is required";
    if (!formData.position_id) tempErrors.position_id = "Position ID is required";
    if (!formData.password || formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:type === "select-one" ? (value === "yes") : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${dev_url}/api/employee/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        console.log("Created Successfully");
      } else {
        console.error("Error while adding employee");
      }
    } catch (error) {
      console.error("Error while adding employee");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-6">
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <img src="src/assets/Login_image.png" alt="Illustration" className="max-w-full h-auto" />
      </div>
      <div className="w-full md:w-1/2 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Register - <span className="font-semibold">Employee</span>
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[ 
            { name: "emp_code", placeholder: "Employee Code" },
            { name: "first_name", placeholder: "First Name" },
            { name: "last_name", placeholder: "Last Name" },
            { name: "email", placeholder: "Email ID", type: "email" },
            { name: "mobile", placeholder: "Phone No", type: "text" },
            { name: "department_id", placeholder: "Department ID" },
            { name: "position_id", placeholder: "Position ID" },
            { name: "hire_date", placeholder: "Hire Date", type: "date" },
            { name: "password", placeholder: "Password", type: "password" },
          ].map(({ name, placeholder, type = "text" }) => (
            <div key={name}>
              <input
                placeholder={placeholder}
                className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}
          <select
            name="is_active"
            className="w-full border-b border-gray-300 p-2 text-gray-600 focus:outline-none focus:border-black"
            value={formData.is_active ? "yes" : "no"}
            onChange={handleChange}
            
          >
            <option value="no">Not Active</option>
            <option value="yes">Active</option>
          </select>
        </form>
        <button type="submit" className="w-72 mt-4 bg-gray-500 text-white text-lg font-semibold py-2 px-6 rounded-full hover:bg-yellow-500 transition block mx-auto">
          Register
        </button>
      </div>
    </div>
  );
};

export default EmployeeRegister;
