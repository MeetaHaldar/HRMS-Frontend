// src/components/Holidays.jsx
import React, { useEffect, useState } from "react";

const Holidays = () => {
  const demoHolidays = [
    { id: 1, name: "New Year's Day", date: "2025-01-01", duration: "1 Day" },
    { id: 2, name: "Republic Day", date: "2025-01-26", duration: "1 Day" },
    { id: 3, name: "Holi", date: "2025-03-14", duration: "1 Day" },
    { id: 4, name: "Independence Day", date: "2025-08-15", duration: "1 Day" },
    { id: 5, name: "Diwali", date: "2025-10-21", duration: "2 Days" },
    { id: 6, name: "Christmas", date: "2025-12-25", duration: "1 Day" },
  ];

  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => {
        const fetched = data.holidays || [];
        setHolidays(fetched.length > 0 ? fetched : demoHolidays);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching holidays:", err);
        setError("Failed to load holidays. Showing demo holidays.");
        setHolidays(demoHolidays);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-2 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base md:text-lg text-gray-600 uppercase font-semibold">
          Holiday's List:
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600">
              <th className="p-2 md:p-3">Holidays</th>
              <th className="p-2 md:p-3">Date</th>
              <th className="p-2 md:p-3">Duration</th>
            </tr>
          </thead>
          <tbody>
            {holidays.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  <img
                    src="src/assets/not.png"
                    alt="No Holidays Found"
                    className="mx-auto w-24 h-24 opacity-50"
                  />
                  <p className="text-gray-500 mt-2 text-xs md:text-sm">
                    No holidays found
                  </p>
                </td>
              </tr>
            ) : (
              holidays.map((holiday) => (
                <tr key={holiday.id} className="hover:bg-gray-100">
                  <td className="p-2 md:p-3">{holiday.name}</td>
                  <td className="p-2 md:p-3">{holiday.date}</td>
                  <td className="p-2 md:p-3">{holiday.duration}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holidays;
