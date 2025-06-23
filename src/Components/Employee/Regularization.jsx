import { useEffect, useState } from "react";
import axios from "axios";
import dev_url from "../../config";
import ApplyRegularizationPopup from "./ApplyRegularizationPopup";

const Regularization = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const token = localStorage.getItem("token");
  const employeeId = JSON.parse(localStorage.getItem("user"))?.emp_id;

  const fetchData = async () => {
    if (!token || !employeeId) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `${dev_url}api/employee/regularization?month_year=${selectedMonth}&employee_id=${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching regularization data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

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

  const formatDateTime = (iso) => {
    if (!iso) return "--";
    const d = new Date(iso);
    return `${d.toLocaleDateString("en-GB")} , ${d.toLocaleTimeString(
      "en-GB"
    )}`;
  };

  const card = (title, value) => (
    <div className="bg-[#f3f3f3] px-6 py-4 rounded-xl shadow-sm text-center">
      <p className="text-gray-500 font-semibold text-lg">{title}</p>
      <p className="text-gray-700 font-bold text-xl">{value}</p>
    </div>
  );

  return (
    <div className="p-4 md:p-6 w-full">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div>
          <h3 className="text-gray-700 font-semibold text-lg mb-3">
            Regularization:
          </h3>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="text-sm text-gray-800 mt-1 border-none outline-none bg-transparent cursor-pointer"
          />
        </div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-[#FFD85F] hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full transition cursor-pointer"
        >
          Apply Regularization
        </button>
      </div>

      {/* Stats Section */}
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {card("Regularization Balance", data.balance)}
          {card("Regularization Granted", data.granted)}
          {card("Pending Regularization", data.pending)}
        </div>
      )}

      {/* History Table */}
      <div>
        <h3 className="text-gray-700 font-semibold text-lg mb-3">
          REGULARIZATION HISTORY:
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm rounded-md">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Requested On</th>
                <th className="p-3 text-left">Approval</th>
                <th className="p-3 text-left">Approval Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : !data?.history?.length ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-400">
                    No regularization history found.
                  </td>
                </tr>
              ) : (
                data.history.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-3">
                      {formatDateTime(item.date).split(" , ")[0]}
                    </td>
                    <td
                      className={`p-3 font-medium ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </td>
                    <td className="p-3">
                      {formatDateTime(item.requested_on).split(" , ")[0]}
                    </td>
                    <td className="p-3">{item.approval || "-"}</td>
                    <td className="p-3">
                      {formatDateTime(item.approval_date)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ApplyRegularizationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={(formData) => {
          setIsPopupOpen(false);
          fetchData();
        }}
      />
    </div>
  );
};

export default Regularization;
