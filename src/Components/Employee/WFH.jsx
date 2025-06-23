import { useEffect, useState } from "react";
import axios from "axios";
import ApplyWFHPopup from "./ApplyWFHPopup";
import dev_url from "../../config";

const WFH = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const token = localStorage.getItem("token");
  const employeeId = JSON.parse(localStorage.getItem("user"))?.emp_id;

  const fetchWFHData = async () => {
    if (!token || !employeeId) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `${dev_url}api/employee/wfhdetails?month_year=${selectedMonth}&employee_id=${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApiData(res.data);
    } catch (error) {
      setApiData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWFHData();
  }, [selectedMonth]);

  const handleApplyWFH = async (formData) => {
    try {
      await axios.post(
        `${dev_url}attendence/applywfh`,
        {
          start_date: formData.startDate,
          end_date: formData.endDate,
          emp_id: employeeId,
          reason: formData.reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotification({
        message: "WFH request submitted successfully!",
        type: "success",
      });
      setIsPopupOpen(false);
      fetchWFHData();
    } catch (error) {
      setNotification({
        message: error.response?.data?.error || "Failed to submit WFH request.",
        type: "error",
      });
    } finally {
      setTimeout(() => setNotification({ message: "", type: "" }), 5000);
    }
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "--";
    return new Date(isoDate).toISOString().split("T")[0];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-500";
      case "Rejected":
        return "text-red-500";
      case "Pending":
      default:
        return "text-yellow-500";
    }
  };

  const statCard = (title, value) => (
    <div className="bg-[#f3f3f3] px-6 py-4 rounded-xl shadow-sm text-center">
      <p className="text-gray-500 font-semibold text-lg">{title}</p>
      <p className="text-gray-700 font-bold text-xl">{value}</p>
    </div>
  );

  return (
    <div className="p-4 md:p-6 w-full">
      {/* Notification */}
      {notification.message && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-md z-50 ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-600">Work From Home</h2>
        <div className="flex flex-wrap gap-3">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none cursor-pointer"
          />
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-[#FFD85F] text-gray-800 font-semibold px-5 py-2 rounded-full shadow hover:bg-yellow-300 transition cursor-pointer"
          >
            Apply WFH
          </button>
        </div>
      </div>

      {/* Stats */}
      {apiData && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {statCard("Total Granted", apiData.total_granted)}
          {statCard("Total Taken", apiData.total_taken)}
          {statCard("Pending", apiData.pending)}
          {statCard("Remaining", apiData.remaining)}
        </div>
      )}

      {/* WFH History Table */}
      <h3 className="text-lg font-semibold text-gray-600 mb-4">WFH History</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-md text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">End Date</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Requested Date</th>
              <th className="p-3 text-left">Approved By</th>
              <th className="p-3 text-left">Approved On</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : !apiData || !apiData.wfh_history?.length ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-400">
                  No WFH records found
                </td>
              </tr>
            ) : (
              apiData.wfh_history.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3">{formatDate(record.start_date)}</td>
                  <td className="p-3">{formatDate(record.end_date)}</td>
                  <td className="p-3" title={record.reason}>
                    {record.reason || "--"}
                  </td>
                  <td
                    className={`p-3 font-medium ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {record.status || "--"}
                  </td>
                  <td className="p-3">{formatDate(record.requested_date)}</td>
                  <td className="p-3">{record.approved_by || "--"}</td>
                  <td className="p-3">
                    {record.approved_date
                      ? formatDate(record.approved_date)
                      : "--"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ApplyWFHPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleApplyWFH}
      />
    </div>
  );
};

export default WFH;
