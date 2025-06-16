import React, { useState, useEffect } from "react";
import axios from "axios";
import dev_url from "../../config";

const RegisterEmployee = ({ isOpen, onClose, item = null, onSuccess }) => {
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

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const isEditMode = !!item;

  useEffect(() => {
    const fetchDropdownData = async () => {
      const token = localStorage.getItem("token");
      try {
        const [deptRes, posRes] = await Promise.all([
          axios.get(`${dev_url}api/auth/company/getallDepartment`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${dev_url}api/auth/company/getallPosition`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setDepartments(deptRes.data.data);
        setPositions(posRes.data.data);
      } catch (error) {
        console.error("Error fetching dropdowns", error);
      }
    };
    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (item) {
      const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().split("T")[0];
      };

      setFormData((prev) => ({
        ...prev,
        ...item,
        hire_date: formatDate(item.hire_date),
        birthday: formatDate(item.birthday),
        password: "",
        role: Array.isArray(item.role) ? item.role : [],
      }));
    }
  }, [item]);

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
      tempErrors.department_id = "Department is required";
    if (!formData.position_id) tempErrors.position_id = "Position is required";
    if (!isEditMode && (!formData.password || formData.password.length < 6))
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
      if (isEditMode) {
        await axios.put(
          `${dev_url}api/employee/emp?id=${item.id}`,
          { ...formData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(`${dev_url}api/employee/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSuccess?.();
      onClose();
    } catch (error) {
      const message =
        error.response?.data?.message || "An error occurred. Try again.";
      setErrorMessage(error.message);
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
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isEditMode ? "Edit Employee" : "Register Employee"}
        </h2>

        {errorMessage && (
          <div className="text-red-600 font-medium mb-3 text-center border border-red-400 bg-red-100 p-2 rounded">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {[
            "emp_code",
            "first_name",
            "last_name",
            "email",
            "mobile",
            "hire_date",
            "birthday",
            "address",
          ].map((name) => (
            <div key={name} className="flex flex-col">
              <label className="text-gray-700 font-medium">
                {name
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </label>
              <input
                type={
                  name === "hire_date" || name === "birthday"
                    ? "date"
                    : name === "email"
                    ? "email"
                    : "text"
                }
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              {errors[name] && (
                <span className="text-red-500 text-sm">{errors[name]}</span>
              )}
            </div>
          ))}

          {(!isEditMode ||
            (isEditMode && (!item.role || item.role.length === 0))) && (
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>
          )}

          {/* Department */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Department</label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.dept_name}
                </option>
              ))}
            </select>
            {errors.department_id && (
              <span className="text-red-500 text-sm">
                {errors.department_id}
              </span>
            )}
          </div>

          {/* Position */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Position</label>
            <select
              name="position_id"
              value={formData.position_id}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select Position</option>
              {positions.map((pos) => (
                <option key={pos.id} value={pos.id}>
                  {pos.position_name}
                </option>
              ))}
            </select>
            {errors.position_id && (
              <span className="text-red-500 text-sm">{errors.position_id}</span>
            )}
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Gender</label>
            <div className="flex gap-4 mt-1">
              {[
                { label: "Male", value: "m" },
                { label: "Female", value: "f" },
              ].map(({ label, value }) => (
                <label key={value} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value={value}
                    checked={formData.gender === value}
                    onChange={handleChange}
                    className="accent-yellow-500"
                  />
                  {label}
                </label>
              ))}
            </div>
            {errors.gender && (
              <span className="text-red-500 text-sm">{errors.gender}</span>
            )}
          </div>

          {/* Active Status */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Active Status</label>
            <div className="flex gap-4 mt-1">
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
                    className="accent-yellow-500"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Role */}
          <div className="flex flex-col sm:col-span-2">
            <label className="text-gray-700 font-medium">Role</label>
            <div className="flex flex-wrap gap-4 mt-1">
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
            {errors.role && (
              <span className="text-red-500 text-sm">{errors.role}</span>
            )}
          </div>

          <div className="sm:col-span-2 flex justify-center gap-6 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-6 rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full"
            >
              {isEditMode ? "Update" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterEmployee;
