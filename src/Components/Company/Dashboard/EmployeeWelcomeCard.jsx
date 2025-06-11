import { useEffect, useState } from "react";

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
  const user = localStorage.getItem("user");
  const userName = JSON.parse(user).name;

  return (
    <div className="p-4 w-full flex justify-between items-start">
      <div className="flex gap-4 w-full">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-16 h-16 rounded-lg object-cover"
        />

        <div className="">
          <h2 className="text-gray-700 text-base font-normal m-auto">
            Welcome back, <span className="font-semibold">“{userName}”</span>
          </h2>
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
