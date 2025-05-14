import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { day: "Mon", present: 80, absent: 20, late: 60 },
  { day: "Tue", present: 75, absent: 25, late: 65 },
  { day: "Wed", present: 85, absent: 15, late: 70 },
  { day: "Thu", present: 90, absent: 10, late: 80 },
  { day: "Fri", present: 85, absent: 15, late: 85 },
  { day: "Sat", weekOff: 100 }, // gray bar
  { day: "Sun", weekOff: 100 }, // gray bar
];

export default function AttendanceChart() {
  return (
    <div className="w-full h-72 bg-white rounded shadow p-4">
      <ResponsiveContainer width="80%" height="100%">
        <BarChart data={data}>
          {/* <CartesianGrid strokeDasharray="1 1" /> */}
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
            labelStyle={{ color: "#333", fontWeight: "bold" }}
            itemStyle={{ color: "#555" }}
          />

          <Legend
            wrapperStyle={{
              color: "#4B5563", // Tailwind's text-gray-600 equivalent
              fontSize: "14px",
              fontWeight: "500",
            }}
          />
          <Bar
            dataKey="present"
            stackId="a"
            fill="#95f3ce"
            name="Present"
            barSize={10}
            isAnimationActive={false}
            activeBarStyle={{ fill: "#95f3ce" }}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
          <Bar
            dataKey="absent"
            stackId="a"
            fill="#fc6c6c"
            name="Absent"
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
          <Line
            type="monotone"
            dataKey="late"
            stroke="#555"
            dot={{ r: 4 }}
            name="Late Check-ins"
            isAnimationActive={false}
            activeBar={false}
          />
          <Bar
            dataKey="weekOff"
            stackId="a"
            fill="#d3d3d3"
            barSize={16}
            name="Week Off"
            activeBar={false}
            isAnimationActive={false}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
