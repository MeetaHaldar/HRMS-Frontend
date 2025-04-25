import { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "tailwindcss/tailwind.css";
import "./calendarStyles.css"; // <-- Custom compact styles

const localizer = momentLocalizer(moment);

const AttendanceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tooltip, setTooltip] = useState(null); // State to handle the tooltip visibility

  // Attendance data for specific dates
  const attendanceMap = {
    "2025-04-01": { status: "present", checkin: "08:30 AM" },
    "2025-04-02": { status: "absent", checkin: "N/A" },
    "2025-04-03": { status: "holiday", checkin: "N/A" },
    "2025-04-04": { status: "late", checkin: "09:15 AM" },
    "2025-04-07": { status: "present", checkin: "08:45 AM" },
    "2025-04-08": { status: "absent", checkin: "N/A" },
    "2025-04-09": { status: "late", checkin: "09:05 AM" },
    "2025-04-10": { status: "holiday", checkin: "N/A" },
  };

  // Helper to determine if the date is today
  const isToday = (date) => moment(date).isSame(new Date(), "day");

  // Helper to calculate attendance for the current month
  const calculateAttendance = () => {
    const daysInMonth = moment(currentDate).daysInMonth();
    let present = 0;
    let absent = 0;
    let late = 0;
    let holiday = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDateString = moment(currentDate)
        .date(day)
        .format("YYYY-MM-DD");
      const status = getAttendanceStatus(currentDateString);

      if (status === "present") present++;
      if (status === "absent") absent++;
      if (status === "late") late++;
      if (status === "holiday") holiday++;
    }

    return { present, absent, late, holiday };
  };

  // Helper to get status for each day
  const getAttendanceStatus = (date) => {
    const dateKey = moment(date).format("YYYY-MM-DD");
    return attendanceMap[dateKey]?.status || "none";
  };

  const dayPropGetter = (date) => {
    const dateKey = moment(date).format("YYYY-MM-DD");
    const attendance = attendanceMap[dateKey];
    const currentMonth = moment(currentDate).month(); // Current month of the selected date
    const dateMonth = moment(date).month(); // Month of the current date

    let bgColor = "bg-white"; // Default background is white
    let borderStyle = "";
    let tooltipText = `${attendance?.status || "No Data"} - ${moment(
      date
    ).format("MMMM Do YYYY")}`;

    // Dotted border for dates outside the current month
    if (currentMonth !== dateMonth) {
      borderStyle = "border-dotted border-2 border-gray-300"; // Dotted border style
    }

    // Solid black border for today's date
    if (isToday(date)) {
      borderStyle = "border-2 border-gray-500]";
    }

    switch (attendance?.status) {
      case "present":
        bgColor = "bg-[#A7F3D0]";
        break;
      case "late":
        bgColor = "bg-[#FFD85F]";
        break;
      case "holiday":
        bgColor = "bg-[#BFDBFE]";
        break;
      case "absent":
        bgColor = "bg-[#FF6051]";
        break;
      default:
        bgColor = "bg-[#D3D3D0]";
    }

    return {
      className: `${bgColor} ${borderStyle} text-white flex items-center justify-center`,
      style: {
        borderRadius: "0.5rem",
      },
      onMouseEnter: () => setTooltip({ date: dateKey, text: tooltipText }), // Set tooltip on hover
      onMouseLeave: () => setTooltip(null), // Remove tooltip on hover out
    };
  };

  // Get the attendance summary
  const { present, absent, late, holiday } = calculateAttendance();

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Title and Date Picker */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-6 flex-wrap">
          <h4 className="font-semibold text-gray-700 whitespace-nowrap">
            Monthly Attendance Calendar:
          </h4>
          <div className="flex gap-3 flex-wrap">
            <Legend color="bg-[#A7F3D0]" label="Present" />
            <Legend color="bg-[#FF6051]" label="Absent" />
            <Legend color="bg-[#BFDBFE]" label="Holiday" />
            <Legend color="bg-[#FFD85F]" label="Late" />
          </div>
        </div>
        <input
          type="month"
          className="p-1 px-2 text-sm border rounded"
          value={moment(currentDate).format("YYYY-MM")}
          onChange={(e) => {
            const [year, month] = e.target.value.split("-");
            const newDate = new Date(year, month - 1);
            setCurrentDate(newDate);
          }}
        />
      </div>

      {/* Box Container for Calendar and Summary */}
      <div className="border border-gray-300 rounded-lg p-6">
        {/* Legend Section */}

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute p-2 bg-gray-700 text-white rounded shadow-md"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              bottom: "60px",
              zIndex: "100",
              minWidth: "200px",
            }}
          >
            <strong>{moment(tooltip.date).format("MMMM Do YYYY")}</strong>
            <div>{tooltip.text}</div>
          </div>
        )}

        {/* Calendar */}
        <BigCalendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          views={["month"]}
          defaultView="month"
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          style={{ height: 299, border: "none" }}
          dayPropGetter={dayPropGetter}
        />

        {/* Attendance Summary Section */}
        <div className="mt-6 text-sm text-gray-700">
          <div className="flex justify-between" >
            <div>
              Present: <span className="font-bold">{present} days</span>
            </div>
            <div>
              Absent: <span className="font-bold">{absent} days</span>
            </div>
            <div>
              Late: <span className="font-bold">{late} days</span>
            </div>
            <div>
              Holidays: <span className="font-bold">{holiday} days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-1 text-xs">
    <div className={`w-3 h-3 rounded ${color}`} />
    <span>{label}</span>
  </div>
);

export default AttendanceCalendar;
