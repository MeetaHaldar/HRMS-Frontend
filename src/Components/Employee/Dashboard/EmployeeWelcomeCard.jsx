import React, { useEffect, useState } from "react";

const EmployeeWelcomeCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-xl p-4 md:p-6 flex items-start w-full">
      
      {/* LEFT: Image */}
      <img
        src="/employee.jpg"  // Replace this with your image path
        alt="Employee"
        className="w-14 h-14 rounded-full object-cover border border-gray-300 mr-4"
      />

      {/* RIGHT: Text Content */}
      <div className="flex flex-col w-full gap-2">
        
        {/* Row 1: Welcome Back + Time */}
        <div className="flex justify-between items-center mb-1">
          <p className="text-gray-700 text-sm md:text-base">
            Welcome back, <span className="font-semibold text-gray-900">“Mr. Ananya Raghav”</span>
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            {currentTime.toLocaleTimeString()}
          </p>
        </div>

        {/* Row 2: Employee ID, Joining Date, Contact */}
        <div className="flex flex-wrap md:flex-nowrap text-xs md:text-sm text-gray-600 mb-1">
          <div className="w-full md:w-1/3 mb-1 md:mb-0">
            <span className="font-normal">Employee ID: </span>
            <span className="font-semibold">24DJKBDFVX8C</span>
          </div>
          <div className="w-full md:w-1/3 mb-1 md:mb-0">
            <span className="font-normal">Joining Date: </span>
            <span className="font-semibold">15 Jan 2025</span>
          </div>
          <div className="w-full md:w-1/3">
            <span className="font-normal">Contact No.: </span>
            <span className="font-semibold">+919876543210</span>
          </div>
        </div>

        {/* Row 3: Email, Designation, Department */}
        <div className="flex flex-wrap md:flex-nowrap text-xs md:text-sm text-gray-600">
          <div className="w-full md:w-1/3 mb-1 md:mb-0">
            <span className="font-normal">Email ID: </span>
            <span className="font-semibold">ananya@mail.com</span>
          </div>
          <div className="w-full md:w-1/3 mb-1 md:mb-0">
            <span className="font-normal">Designation: </span>
            <span className="font-semibold">Sr. Associate Mgr.</span>
          </div>
          <div className="w-full md:w-1/3">
            <span className="font-normal">Department: </span>
            <span className="font-semibold">Operations</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmployeeWelcomeCard;
