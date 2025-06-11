import { useState } from "react";
import axios from "axios";
import dev_url from "../../config";
const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    emp_code: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    hire_date: "",
    birthday: "",
    department_id: "",
    position_id: "",
    address: "",
    gender: "",
    is_active: 1,
    password: "",
    role: [],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!formData.emp_code) tempErrors.emp_code = "Employee Code is required";
    if (!formData.first_name) tempErrors.first_name = "First Name is required";
    if (!formData.last_name) tempErrors.last_name = "Last Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      tempErrors.email = "Invalid email format";
    if (!formData.mobile.match(/^\d{10}$/))
      tempErrors.mobile = "Mobile number must be 10 digits";
    if (!formData.hire_date) tempErrors.hire_date = "Hire Date is required";
    if (!formData.department_id)
      tempErrors.department_id = "Department ID is required";
    if (!formData.position_id)
      tempErrors.position_id = "Position ID is required";
    if (!formData.password || formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.role.length) tempErrors.role = "Select at least one role";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "role") {
      const newRoles = checked
        ? [...formData.role, value]
        : formData.role.filter((r) => r !== value);
      setFormData({ ...formData, role: newRoles });
    } else if (type === "radio" && name === "is_active") {
      setFormData({ ...formData, is_active: parseInt(value) });
    } else if (type === "radio" && name === "gender") {
      setFormData({ ...formData, gender: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const token = localStorage.getItem("token");
    try {
      await axios.post(`${dev_url}api/employee/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Employee Registered Successfully");
    } catch (error) {
      alert("Error while registering employee");
    }
  };

  const handleCancel = () => {
    setFormData({
      emp_code: "",
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      hire_date: "",
      birthday: "",
      department_id: "",
      position_id: "",
      address: "",
      gender: "",
      is_active: 1,
      password: "",
      role: [],
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Register Employee
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {[
          ["Employee Code", "emp_code"],
          ["First Name", "first_name"],
          ["Last Name", "last_name"],
          ["Email", "email", "email"],
          ["Mobile", "mobile"],
          ["Hire Date", "hire_date", "date"],
          ["Birthday", "birthday", "date"],
          ["Department ID", "department_id"],
          ["Position ID", "position_id"],
          ["Address", "address"],
          ["Password", "password", "password"],
        ].map(([label, name, type = "text"]) => (
          <div
            key={name}
            className="flex flex-col sm:flex-row items-start sm:items-center"
          >
            <label className="w-full sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">
              {label}:
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full sm:w-2/3 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        ))}

        {/* Gender */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <label className="w-full sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">
            Gender:
          </label>
          <div className="w-full sm:w-2/3 flex gap-4">
            {["male", "female"].map((val) => (
              <label key={val} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value={val}
                  checked={formData.gender === val}
                  onChange={handleChange}
                  className="bg-yellow-300 border border-black accent-yellow-500"
                />
                {val.charAt(0).toUpperCase() + val.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Active */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <label className="w-full sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">
            Active Status:
          </label>
          <div className="w-full sm:w-2/3 flex gap-4">
            {[
              { label: "Active", value: 1 },
              { label: "Inactive", value: 0 },
            ].map(({ label, value }) => (
              <label key={value} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="is_active"
                  value={value}
                  checked={formData.is_active === value}
                  onChange={handleChange}
                  className="bg-yellow-300 border border-black accent-yellow-500"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Role */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <label className="w-full sm:w-1/3 text-gray-700 font-medium mb-1 sm:mb-0">
            Role:
          </label>
          <div className="w-full sm:w-2/3 flex flex-col sm:flex-row gap-4">
            {["employee", "manager", "systemadmin"].map((role) => (
              <label key={role} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="role"
                  value={role}
                  checked={formData.role.includes(role)}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="col-span-1 sm:col-span-2 flex justify-center space-x-6 mt-8">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-8 rounded-full"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-8 rounded-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterEmployee;
