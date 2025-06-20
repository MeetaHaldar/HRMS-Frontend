import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";
import dev_url from "../../../config";

const AttendanceChart = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${dev_url}attendence/getSummaryData?month_year=${selectedMonth}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const rawData = response.data.data;

        const maxTotal = Math.max(
          ...rawData.map((entry) => entry.present + entry.absent)
        );

        const transformed = rawData.map((entry) => {
          const present = entry.is_holiday ? 0 : entry.present;
          const absent = entry.is_holiday ? 0 : entry.absent;

          return {
            day: new Date(entry.date).getDate().toString().padStart(2, "0"),
            present,
            absent,
            holiday: entry.is_holiday ? maxTotal || 1 : 0,
            isHoliday: entry.is_holiday,
          };
        });

        setChartData(transformed);
      } catch (err) {
        console.error("Failed to fetch summary data:", err);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border rounded shadow px-3 py-2 text-sm">
          <p className="font-semibold text-gray-700">Date: {label}</p>
          {data.isHoliday ? (
            <p className="text-blue-600 font-medium">Holiday</p>
          ) : (
            <>
              <p className="text-green-600">Present: {data.present}</p>
              <p className="text-red-500">Absent: {data.absent}</p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white rounded shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Attendance Summary
        </h2>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="day"
            label={{ value: "Date", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{ value: "Total Count", angle: -90, position: "insideLeft" }}
            tickCount={10}
            domain={[0, "auto"]}
            interval={0}
            tickFormatter={(tick) => (tick % 5 === 0 ? tick : "")}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              color: "#4B5563",
              fontSize: "14px",
              fontWeight: "500",
            }}
          />
          <Bar
            dataKey="present"
            stackId="a"
            fill="#A1DE93"
            name="Present"
            barSize={10}
          />
          <Bar dataKey="absent" stackId="a" fill="#F47C7C" name="Absent" />
          <Bar
            dataKey="holiday"
            name="Holiday"
            fill="#70A1D7"
            barSize={10}
            stackId="b"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
