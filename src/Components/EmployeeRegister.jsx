import React, { useState } from "react";
import { useNavigation } from "react-router-dom";
// import dev_url from "../config";
const EmployeeRegister = () => {
  const [hireDate, setHireDate] = useState("");

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      const [year, month, day] = selectedDate.split("-");
      setHireDate(`${day}-${month}-${year}`); // Convert to DD-MM-YYYY
    }
  };

  // const navigation = useNavigation();
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
    is_active: true,
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  //enable_att,enable_payroll,enable_overtime,enable_holiday,enable_whatsapp,whatsapp_exception,whatsapp_punch,deleted,enable_sms,sms_exception,sms_punch
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${dev_url}/api/employee/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        navigation("/company/dashboard");
        console.log("Created Successfully");
      } else {
        setError("Error while adding employee");
      }
    } catch (error) {
      setError("Error while adding employee");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white p-6">
      <div className="hidden md:flex w-1/2 justify-center items-center">
        <img
          src="src/assets/Login_image.png"
          alt="Illustration"
          className="max-w-full h-auto"
        />
      </div>

      <div className="w-full md:w-1/2 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Register - <span className="font-semibold">Employee</span>
        </h2>

        <div className="flex justify-center md:hidden mb-4">
          <img
            src="src/assets/Login_image.png"
            alt="Illustration"
            className="max-w-[80%] h-auto md:max-w-[50%]"
          />
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Employee Code"
            className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="text"
            name="emp_code"
            id="emp_code"
            value={formData.emp_code}
            onChange={handleChange}
            required
          />
          <input
            placeholder="First Name"
            className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="text"
            name="first_name"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />

          <input
            placeholder="Last Name"
            className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="text"
            name="last_name"
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email ID"
            className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Phone No"
            className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="text"
            name="mobile"
            id="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <input
            placeholder="Department ID"
            className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="text"
            name="department_id"
            id="department_id"
            value={formData.department_id}
            onChange={handleChange}
            required
          />

          <input
            placeholder="Position ID"
            className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="text"
            name="position_id"
            id="position_id"
            value={formData.position_id}
            onChange={handleChange}
            required
          />

          {/* Hire Date Input */}
          <input
            type="date"
            placeholder="Hire Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (hireDate === "" ? (e.target.type = "text") : null)}
            onChange={handleDateChange}
            className="w-full border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            name="hire_date"
            id="hire_date"
            value={formData.hire_date}
            // onChange={handleChange}
            required
          />

          {/* isActive Dropdown */}
          <select
  name="is_active"
  className="w-full border-b border-gray-300 p-2 text-gray-600 focus:outline-none focus:border-black"
  value={formData.is_active ? "yes" : "no"}
  onChange={handleChange} 
  required
>
  <option value="no">Not Active</option>
  <option value="yes">Active</option>
</select>


          <input
            placeholder="Password"
            className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </form>

        <div className="flex items-center justify-center mt-4">
          <input type="checkbox" className="mr-2" required />
          <p className="text-sm text-gray-600">
            By continuing, I agree to the{" "}
            <span className="font-semibold">Terms & Conditions</span> and{" "}
            <span className="font-semibold">Privacy Policy</span>.
          </p>
        </div>

        <button className="w-72 mt-4 bg-gray-500 text-white text-lg font-semibold py-2 px-6 rounded-full hover:bg-yellow-500 transition block mx-auto">
          Register
        </button>
      </div>
    </div>
  );
};

export default EmployeeRegister;
