import React, { useEffect, useState } from "react";

const WFHhistory = () => {
  const [wfhRecords, setWfhRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API delay with dummy data
    setTimeout(() => {
      setWfhRecords([
        {
          startDate: "2025-03-01",
          endDate: "2025-03-03",
          reason: "Work from home due to family function.",
          status: "Approved",
          requestedDate: "2025-02-25",
          approval: "Manager A",
          approvalDateTime: "2025-02-26 10:30 AM",
        },
        {
          startDate: "2025-03-10",
          endDate: "2025-03-12",
          reason: "Medical situation - advised rest at home.",
          status: "Pending",
          requestedDate: "2025-03-05",
          approval: "Manager B",
          approvalDateTime: "-",
        },
        {
          startDate: "2025-02-15",
          endDate: "2025-02-16",
          reason: "Internet issues, opted for WFH.",
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
    <div className="p-2 md:p-6 w-full">
      <h2 className="text-lg md:text-lg uppercase text-gray-500 font-semibold mb-4">
        Work From Home History:
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg text-xs md:text-sm">
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
            ) : wfhRecords.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  <p className="text-gray-500 mt-2 text-xs md:text-sm">
                    No WFH records found
                  </p>
                </td>
              </tr>
            ) : (
              wfhRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 md:p-3">{record.startDate}</td>
                  <td className="p-2 md:p-3">{record.endDate}</td>
                  <td
                    className="p-2 md:p-3 max-w-[150px] truncate"
                    title={record.reason}
                  >
                    {record.reason}
                  </td>
                  <td
                    className={`p-2 md:p-3 font-semibold ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {record.status}
                  </td>
                  <td className="p-2 md:p-3">{record.requestedDate}</td>
                  <td className="p-2 md:p-3">{record.approval}</td>
                  <td className="p-2 md:p-3">{record.approvalDateTime}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WFHhistory;
