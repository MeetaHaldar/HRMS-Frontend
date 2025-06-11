import { useEffect, useState } from "react";
import axios from "axios";
import dev_url from "../../config";
const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!user?.companyId || !token) {
          setError("Missing company ID or token.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${dev_url}attendence/holidayList?company_id=${user.companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const holidayData = response.data?.data || [];
        setHolidays(holidayData);
      } catch (err) {
        console.error("Failed to fetch holidays:", err);
        setError("Failed to fetch holidays.");
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <div className="p-2 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base md:text-lg text-gray-600 uppercase font-semibold">
          Holiday's List:
        </h2>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-gray-500 text-sm p-4">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-sm p-4">{error}</p>
        ) : holidays.length === 0 ? (
          <div className="text-center p-4">
            <img
              src="src/assets/not.png"
              alt="No Holidays Found"
              className="mx-auto w-24 h-24 opacity-50"
            />
            <p className="text-gray-500 mt-2 text-xs md:text-sm">
              No holidays found
            </p>
          </div>
        ) : (
          <table className="w-full border-collapse rounded-lg text-xs md:text-sm">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-600">
                <th className="p-2 md:p-3">Holidays</th>
                <th className="p-2 md:p-3">Date</th>
                <th className="p-2 md:p-3">Duration</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday) => (
                <tr key={holiday.id} className="hover:bg-gray-100">
                  <td className="p-2 md:p-3">{holiday.alias}</td>
                  <td className="p-2 md:p-3">
                    {new Date(holiday.start_date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-2 md:p-3">
                    {holiday.duration_day}{" "}
                    {holiday.duration_day > 1 ? "Days" : "Day"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Holidays;
