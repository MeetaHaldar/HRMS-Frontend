import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
const LeaveHistory = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Simulated API delay with dummy data
    setTimeout(() => {
      setLeaves([
        {
          startDate: "2025-03-01",
          endDate: "2025-03-03",
          reason:
            "Family function lorem3 ipsum dolor sit amet, consectetur adipiscing elit.",
          status: "Approved",
          requestedDate: "2025-02-25",
          approval: "Manager A",
          approvalDateTime: "2025-02-26 10:30 AM",
        },
        {
          startDate: "2025-03-10",
          endDate: "2025-03-12",
          reason: "Medical leave",
          status: "Pending",
          requestedDate: "2025-03-05",
          approval: "Manager B",
          approvalDateTime: "-",
        },
        {
          startDate: "2025-02-15",
          endDate: "2025-02-16",
          reason: "Personal work",
          status: "Rejected",
          requestedDate: "2025-02-10",
          approval: "Manager A",
          approvalDateTime: "2025-02-12 09:15 AM",
        },
      ]);
      setLoading(false);
    }, 500); // simulate network delay
  }, []);

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
                    No leave records found
                  </p>
                </td>
              </tr>
            ) : (
              leaves.map((leave, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 md:p-3">{leave.startDate}</td>
                  <td className="p-2 md:p-3">{leave.endDate}</td>
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
        totalPages={10} // Replace this with: totalPages if dynamic
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default LeaveHistory;
