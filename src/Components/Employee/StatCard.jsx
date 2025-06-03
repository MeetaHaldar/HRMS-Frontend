import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-[#f3f3f3] px-6 py-4 rounded-xl relative shadow-sm flex flex-col justify-between">
      <p className="text-gray-500 font-semibold text-lg">{title}</p>
      <p className="text-gray-600 font-medium text-xl">
        {String(value).padStart(2, "0")}
      </p>
    </div>
  );
};

export default StatCard;
