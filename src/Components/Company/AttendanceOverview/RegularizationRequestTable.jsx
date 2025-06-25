import React, { useEffect, useState, forwardRef } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import dev_url from "../../../config";

export default function RegularizationRequestsTable() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(timeString);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatMonthYear = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  const fetchRegularizationRequests = async (date) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${dev_url}attendence/listofRegularize`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const all = res.data.requests || [];
      const filtered = all.filter((r) => r.status === "pending");
      setRequests(filtered);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch regularization requests.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegularizationRequests(selectedDate);
  }, []);

  const onDateChange = (date) => {
    setSelectedDate(date);
    fetchRegularizationRequests(date);
  };

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <div
      className="flex items-center gap-2 cursor-pointer border rounded px-2 py-1"
      onClick={onClick}
      ref={ref}
    >
      <span className="text-gray-600">{value}</span>
      <ChevronDown size={16} className="text-gray-500" />
    </div>
  ));

  return (
    <div className="p-6 text-gray-800 w-full">
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <ArrowLeft
            size={20}
            className="text-gray-500 cursor-pointer"
            onClick={() => navigate("/companyAdmin/LeaveAttendanceOverview")}
          />
          <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
            Regularization Requests:
          </h2>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span className="text-lg md:text-lg text-gray-500 font-semibold">
            {currentTime}
          </span>
          <DatePicker
            selected={selectedDate}
            onChange={onDateChange}
            customInput={<CustomDateInput />}
            dateFormat="MMM/yyyy"
            showMonthYearPicker
          />
        </div>
      </div>

      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

      {loading ? (
        <div className="text-center py-10 text-gray-600">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">Requested On</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No regularization requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">{req.first_name || "-"}</td>
                    <td className="px-4 py-3">
                      {req.date
                        ? new Date(req.date).toLocaleDateString("en-GB")
                        : "-"}
                    </td>
                    <td className="px-4 py-3">{req.reason || "-"}</td>
                    <td className="px-4 py-3">
                      {req.created_at
                        ? new Date(req.created_at).toLocaleDateString("en-GB")
                        : "-"}
                    </td>
                    <td className="px-4 py-3 font-medium text-yellow-600">
                      Pending
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
