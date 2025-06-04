import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination";

const LeaveHistory = ({ selectedMonth, token }) => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const employeeId = JSON.parse(localStorage.getItem("user"))?.employeeId;
  const fetchLeaveHistory = async () => {
    if (!selectedMonth) return;

    try {
      setLoading(true);

      const response = await axios.get(
        `https://www.attend-pay.com/attendence/history?month_year=${selectedMonth}&employee_id =${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (
        response.data.leave_history &&
        Array.isArray(response.data.leave_history)
      ) {
        const formattedLeaves = response.data.leave_history.map((leave) => ({
          startDate: leave.start_time?.split("T")[0] || "-",
          endDate: leave.end_time?.split("T")[0] || "-",
          leaveType: leave.category_name || "-",
          reason: leave.apply_reason || "-",
          status:
            leave.revoke_type === "P"
              ? "Pending"
              : leave.revoke_type === "R"
              ? "Rejected"
              : leave.revoke_type === "A"
              ? "Approved"
              : "-",

          requestedDate: leave.apply_time?.split("T")[0] || "-",
          approval: leave.approver || "-",
          approvalDateTime: leave.audit_time
            ? new Date(leave.audit_time).toLocaleString()
            : "-",
        }));
        console.log("Formatted Leaves:", formattedLeaves);
        setLeaves(formattedLeaves);
      } else {
        setLeaves([]);
      }
    } catch (error) {
      console.error("Error fetching leave history:", error);
      setLeaves([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveHistory();
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

  return (
    <div className="p-2 md:p-6 w-full flex flex-col min-h-full">
      <h2 className="text-lg md:text-lg uppercase text-gray-500 font-semibold mb-4">
        Leave History:
      </h2>

      <div className="flex-grow overflow-x-auto">
        <table className="w-full border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-500">
              <th className="p-2 md:p-3">Start Date</th>
              <th className="p-2 md:p-3">End Date</th>
              <th className="p-2 md:p-3">Leave Type</th>
              <th className="p-2 md:p-3">Reason</th>
              <th className="p-2 md:p-3">Status</th>
              <th className="p-2 md:p-3">Requested On</th>
              <th className="p-2 md:p-3">Approval</th>
              <th className="p-2 md:p-3">Approval Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : leaves.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  <p className="text-gray-500 mt-2 text-xs md:text-sm">
                    No leave records found for {selectedMonth}
                  </p>
                </td>
              </tr>
            ) : (
              leaves.map((leave, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 md:p-3">{leave.startDate}</td>
                  <td className="p-2 md:p-3">{leave.endDate}</td>
                  <td className="p-2 md:p-3">{leave.leaveType}</td>

                  <td
                    className="p-2 md:p-3 max-w-[150px] truncate"
                    title={leave.reason}
                  >
                    {leave.reason}
                  </td>
                  <td
                    className={`p-2 md:p-3 font-semibold ${getStatusColor(
                      leave.status
                    )}`}
                  >
                    {leave.status}
                  </td>
                  <td className="p-2 md:p-3">{leave.requestedDate}</td>
                  <td className="p-2 md:p-3">{leave.approval}</td>
                  <td className="p-2 md:p-3">{leave.approvalDateTime}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default LeaveHistory;
