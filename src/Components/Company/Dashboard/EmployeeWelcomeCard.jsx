import React, { useEffect, useState } from "react";

const EmployeeWelcomeCard = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 w-full flex justify-between items-start">
      {/* Left Section - Image + Info */}
      <div className="flex gap-4 w-full">
        {/* Profile Image */}
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-16 h-16 rounded-lg object-cover"
        />

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-gray-700 text-base font-normal mb-2">
            Welcome back,{" "}
            <span className="font-semibold">“Mr. Andy Randall”</span>
          </h2>

          <div className="grid grid-cols-3 gap-y-1 gap-x-8 text-sm text-gray-700">
            <div className="flex">
              <span className="font-normal w-24">Employee ID:</span>
              <span className="font-semibold">24DJKBDFVX8C</span>
            </div>
            <div className="flex">
              <span className="font-normal w-24">Joining Date:</span>
              <span className="font-semibold">15 Jan 2025</span>
            </div>
            <div className="flex">
              <span className="font-normal w-24">Contact No.:</span>
              <span className="font-semibold">+919876543210</span>
            </div>
            <div className="flex">
              <span className="font-normal w-24">Email ID:</span>
              <span className="font-semibold">andy.ran@mail.com</span>
            </div>
            <div className="flex">
              <span className="font-normal w-24">Designation:</span>
              <span className="font-semibold">Admin Head</span>
            </div>
            <div className="flex">
              <span className="font-normal w-24">Department:</span>
              <span className="font-semibold">Administrations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Time */}
      <div className="text-sm text-gray-700 font-medium ml-4 whitespace-nowrap mt-1">
        {currentTime}
      </div>
    </div>
  );
};

export default EmployeeWelcomeCard;
