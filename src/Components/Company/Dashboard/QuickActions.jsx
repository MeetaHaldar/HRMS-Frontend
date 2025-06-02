import React, { useState, forwardRef } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const QuickActions = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const stats = [
    { title: "+ New Employee", route: "/companyAdmin/RegisterEmployee" },
    { title: "+ Payroll Entry", route: "/companyAdmin/viewSalaryTemplate" },
    { title: "Manage Holidays", route: "/companyAdmin/HolidayList" },
    { title: "Settings", route: "/companyAdmin/companyProfile" },
  ];

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
    >
      {value}
      <ChevronDown size={16} className="text-gray-500" />
    </button>
  ));

  return (
    <div className="w-full px-4 py-6 relative z-10">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-700 font-medium text-base">Quick Actions:</h2>
        <div className="relative">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            popperPlacement="bottom-end"
            popperModifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 6],
                },
              },
            ]}
            customInput={<CustomDateInput />}
            calendarClassName="z-50"
            popperClassName="z-50"
          />
        </div>
      </div>

      {/* Action Cards Row */}
      <div className="flex flex-wrap gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => navigate(stat.route)}
            className="relative bg-white border border-gray-200 shadow-sm rounded-xl px-5 py-4 min-w-[170px] flex-1 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition"
          >
            <ExternalLink className="absolute top-2 right-2 w-4 h-4 text-gray-400" />
            <div className="text-sm text-gray-500 font-bold">{stat.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
