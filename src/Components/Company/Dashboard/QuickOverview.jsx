import { useEffect, useState, forwardRef } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import dev_url from "../../../config";
const QuickOverview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [checkinEmployees, setCheckinEmployees] = useState(0);
  const [onLeave, setOnLeave] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchOverviewData = async (date) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      const formattedMonth = dayjs(date).format("YYYY-MM");

      const empRes = await axios.get(`${dev_url}api/employee`, { headers });
      setTotalEmployees(empRes.data.employees.length || 0);

      const checkinRes = await axios.get(
        `${dev_url}attendence/checkinEmp?date=${formattedDate}`,
        { headers }
      );
      setCheckinEmployees(checkinRes.data.data?.length || 0);
      const leaveRes = await axios.get(
        `${dev_url}attendence/leavemp?date=${formattedDate}`,
        { headers }
      );
      setOnLeave(leaveRes.data.data?.length || 0);
    } catch (err) {
      console.error("Error fetching overview data:", err);
    }
  };

  useEffect(() => {
    fetchOverviewData(selectedDate);
  }, [selectedDate]);

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      route: "/companyAdmin/employeeList",
    },
    {
      title: "Present Employees",
      value: checkinEmployees,
      route: "/companyAdmin/checkinEmployees",
    },
    {
      title: "Payroll This Month",
      value: "₹25M",
    },
    {
      title: "On Leave Employees",
      value: onLeave,
      route: "/companyAdmin/onLeaveEmployees",
    },
  ];

  // Custom Date Picker Button
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
        <h2 className="text-gray-700 font-medium text-base">
          Quick Overviews:
        </h2>
        <div className="relative">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            customInput={<CustomDateInput />}
            calendarClassName="z-50"
            popperClassName="z-50"
          />
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="flex flex-wrap gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => stat.route && navigate(stat.route)}
            className="relative bg-white border border-gray-200 shadow-sm rounded-xl px-5 py-4 min-w-[170px] flex-1 flex flex-col items-center justify-center text-center cursor-pointer"
          >
            {stat.route && (
              <ExternalLink className="absolute top-2 right-2 w-4 h-4 text-gray-400" />
            )}
            <div className="text-sm text-gray-500">{stat.title}</div>
            <div className="mt-1 text-lg font-semibold text-gray-800">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickOverview;
