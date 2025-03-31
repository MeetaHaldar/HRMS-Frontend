import React, { useState } from "react";

const EmployeeRegister = () => {
  const [hireDate, setHireDate] = useState("");

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      const [year, month, day] = selectedDate.split("-");
      setHireDate(`${day}-${month}-${year}`); // Convert to DD-MM-YYYY
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

      <div className="w-full md:w-1/2 bg-white p-6 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Register - <span className="font-semibold">Employee</span>
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Employee Code",
            "First Name",
            "Last Name",
            "Email ID",
            "Phone No",
            "Department ID",
            "Position ID",
          ].map((placeholder, index) => (
            <input
              key={index}
              type={placeholder.includes("Email") ? "email" : "text"}
              placeholder={placeholder}
              className="w-75 border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
              required
            />
          ))}

          {/* Hire Date Input with "Hire Date" as Placeholder */}
          <input
            type="text"
            value={hireDate}
            placeholder="Hire Date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (hireDate === "" ? (e.target.type = "text") : null)}
            onChange={handleDateChange}
            className="w-75 border-b border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
            required
          />

          {/* isActive Dropdown */}
          <select
            className="w-75 border-b border-gray-300 p-2 text-gray-600 focus:outline-none focus:border-black"
            required
          >
            <option value="" disabled selected>
              Is Active
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <input
            type="password"
            placeholder="Password"
            className="w-full border-b border-gray-400 p-2 placeholder-gray-400 focus:outline-none focus:border-black"
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
