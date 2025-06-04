import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "tailwindcss/tailwind.css";
import "./calendarStyles.css";

const localizer = momentLocalizer(moment);

const AttendanceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceMap, setAttendanceMap] = useState({});
  const [tooltip, setTooltip] = useState(null);
  const [summary, setSummary] = useState({
    present: 0,
    absent: 0,
    late: 0,
    holiday: 0,
    leave: 0,
  });

  const token = localStorage.getItem("token");

  const fetchAttendance = async (date) => {
    const formattedDate = moment(date).format("YYYY-MM");
    try {
      const response = await axios.get(
        `https://www.attend-pay.com/api/employee/empBiometric?date=${formattedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { attendance = {}, summary = {} } = response.data;

      const parsedAttendance = {};
      for (const dateKey in attendance) {
        parsedAttendance[dateKey] = {
          status: attendance[dateKey].toLowerCase(),
        };
      }

      setAttendanceMap(parsedAttendance);
      setSummary({
        present: summary.present || 0,
        absent: summary.absent || 0,
        late: summary.late || 0,
        holiday:
          Object.values(attendance).filter((val) => val === "Holiday").length ||
          0,
      });
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchAttendance(currentDate);
  }, [currentDate]);

  const isToday = (date) => moment(date).isSame(new Date(), "day");

  const getAttendanceStatus = (date) => {
    const dateKey = moment(date).format("YYYY-MM-DD");
    return attendanceMap[dateKey]?.status || "none";
  };

  const dayPropGetter = (date) => {
    const dateKey = moment(date).format("YYYY-MM-DD");
    const attendance = attendanceMap[dateKey];
    const currentMonth = moment(currentDate).month();
    const dateMonth = moment(date).month();

    let bgColor = "bg-white";
    let borderStyle = "";
    let tooltipText = `${attendance?.status || "No Data"} - ${moment(
      date
    ).format("MMMM Do YYYY")}`;

    if (currentMonth !== dateMonth) {
      borderStyle = "border-dotted border-2 border-gray-300";
    }

    if (isToday(date)) {
      borderStyle = "border-2 border-gray-500";
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
      onMouseEnter: () => setTooltip({ date: dateKey, text: tooltipText }),
      onMouseLeave: () => setTooltip(null),
    };
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
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
            <Legend color="bg-[#D3D3D0]" label="Leave" />
          </div>
        </div>
        <input
          type="month"
          className="p-1 px-2 text-sm border rounded"
          value={moment(currentDate).format("YYYY-MM")}
          onChange={(e) => {
            const [year, month] = e.target.value.split("-");
            setCurrentDate(new Date(year, month - 1));
          }}
        />
      </div>

      <div className="border border-gray-300 rounded-lg p-6 relative">
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

        <div className="mt-6 text-sm text-gray-700">
          <div className="flex justify-between">
            <div>
              Present: <span className="font-bold">{summary.present} days</span>
            </div>
            <div>
              Absent: <span className="font-bold">{summary.absent} days</span>
            </div>
            <div>
              Late: <span className="font-bold">{summary.late} days</span>
            </div>
            <div>
              Holidays:{" "}
              <span className="font-bold">{summary.holiday} days</span>
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
