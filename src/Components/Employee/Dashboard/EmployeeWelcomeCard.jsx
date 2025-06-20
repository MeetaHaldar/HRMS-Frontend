import React, { useEffect, useState } from "react";
import axios from "axios";
import dev_url from "../../../config";
const EmployeeWelcomeCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [employee, setEmployee] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?.emp_id;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (!id || !token) return;

        const res = await axios.get(`${dev_url}api/employee/id/?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployee(res.data.employee);
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    };

    fetchEmployee();
  }, []);
  if (!employee) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="rounded-xl p-4 md:p-6 flex items-start w-full">
      <img
        src={`${dev_url}public/upload/${employee.photo}`}
        alt="Employee"
        className="w-14 h-14 rounded-full object-cover border border-gray-300 mr-4"
      />

      <div className="flex flex-col w-full gap-2">
        <div className="flex justify-between items-center mb-1">
          <p className="text-gray-700 text-sm md:text-base">
            Welcome back,{" "}
            <span className="font-semibold text-gray-900">
              {employee.first_name} {employee.last_name}
            </span>
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            {currentTime.toLocaleTimeString()}
          </p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap text-xs md:text-sm text-gray-600 mb-1">
          <div className="w-full md:w-1/3 mb-1 md:mb-0">
            <span className="font-normal">Employee ID/Code: </span>
            <span className="font-semibold">{employee.emp_code}</span>
          </div>
          <div className="w-full md:w-1/3 mb-1 md:mb-0">
            <span className="font-normal">Joining Date: </span>
            <span className="font-semibold">
              {new Date(employee.hire_date).toLocaleDateString("en-CA")}
            </span>
          </div>
          <div className="w-full md:w-1/3">
            <span className="font-normal">Contact No.: </span>
            <span className="font-semibold">{employee.mobile}</span>
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap text-xs md:text-sm text-gray-600">
          <div className="w-full md:w-1/3 mb-1 md:mb-0">
            <span className="font-normal">Email ID: </span>
            <span className="font-semibold">{employee.email}</span>
          </div>
          <div className="w-full md:w-1/3 mb-1 md:mb-0">
            <span className="font-normal">Designation: </span>
            <span className="font-semibold">{employee.position_name}</span>
          </div>
          <div className="w-full md:w-1/3">
            <span className="font-normal">Department: </span>
            <span className="font-semibold">{employee.department_name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeWelcomeCard;
