import React, { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import ApplyLeavePopup from "../ApplyLeavePopup";

const initialRequests = [
  { id: 1, name: "Sammy", startDate: "2025-04-20", endDate: "2025-04-24", reason: "Family Function", requestedDate: "2025-04-15", status: "pending" },
  { id: 2, name: "Sammy", startDate: "2025-04-20", endDate: "2025-04-24", reason: "Family Function", requestedDate: "2025-04-15", status: "pending" },
];

export default function LeaveRequest() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await fetch(`/api/leaves?month=${selectedMonth}`);
        const data = await response.json();
        setRequests(data.requests || []);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveData();
  }, [selectedMonth]);

  const handleBulkSelect = (e) => {
    const checked = e.target.checked;
    const updated = requests.map(r => r.status === "pending" ? { ...r, selected: checked } : r);
    setRequests(updated);
  };

  const handleSelect = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, selected: !r.selected } : r));
  };

  const handleDecision = (id, status) => {
    setRequests(prev => {
      const updated = prev.map(r =>
        r.id === id ? { ...r, status, selected: false } : r
      );
      const sorted = [
        ...updated.filter(r => r.status === "pending"),
        ...updated.filter(r => r.status !== "pending")
      ];
      return sorted;
    });
  };

  const handleBulkAction = (status) => {
    setRequests(prev => {
      let updated = prev.map(r =>
        r.selected && r.status === "pending" ? { ...r, status, selected: false } : r
      );
      const sorted = [
        ...updated.filter(r => r.status === "pending"),
        ...updated.filter(r => r.status !== "pending")
      ];
      return sorted;
    });
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const anySelected = requests.some(r => r.selected);
  const allSelectable = requests.some(r => r.status === "pending");
  const allSelected = allSelectable && requests.filter(r => r.status === "pending").every(r => r.selected);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-2 items-center">
        <h2 className="text-lg font-medium">Leave Requests for Approval:</h2>
        <div className="relative">
          <input
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="appearance-none bg-transparent border-none text-gray-600 font-medium focus:outline-none cursor-pointer"
          />
        </div>
      </div>

      <div
        className={`mb-3 space-x-3 transition-all duration-300 ease-in-out ${
          anySelected ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <button
          className="px-3 py-1 bg-[#FFD85F] hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2  text-xs md:text-sm rounded-full font-semibold cursor-pointer"
          onClick={() => handleBulkAction("accepted")}
        >
          Accept All
        </button>
        <button
          className="px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:bg-gray-100"
          onClick={() => handleBulkAction("declined")}
        >
          Reject All
        </button>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr className="text-left">
            <th className="p-2">
              <input
                type="checkbox"
                checked={allSelectable && allSelected}
                disabled={!allSelectable}
                onChange={handleBulkSelect}
              />
            </th>
            <th className="p-2">Name</th>
            <th className="p-2">Start Date</th>
            <th className="p-2">End Date</th>
            <th className="p-2">Reason</th>
            <th className="p-2">Requested Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id} className="text-left">
              <td className="p-2 align-middle">
                {r.status === "pending" && (
                  <input
                    type="checkbox"
                    checked={r.selected || false}
                    onChange={() => handleSelect(r.id)}
                  />
                )}
              </td>
              <td className="p-2 align-middle">{r.name}</td>
              <td className="p-2 align-middle">{r.startDate}</td>
              <td className="p-2 align-middle">{r.endDate}</td>
              <td className="p-2 align-middle">{r.reason}</td>
              <td className="p-2 align-middle">{r.requestedDate}</td>
              <td className="p-2 align-middle capitalize">{r.status}</td>
              <td className="p-2 align-middle">
                {r.status === "pending" ? (
                  <>
                    <button
                      className="mr-2 text-black rounded"
                      onClick={() => handleDecision(r.id, "accepted")}
                    >
                      ✔️
                    </button>
                    <button
                      className="text-black rounded"
                      onClick={() => handleDecision(r.id, "declined")}
                    >
                      ❌
                    </button>
                  </>
                ) : (
                  <span className="text-gray-400">Action Taken</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup for Apply Leave */}
      <ApplyLeavePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={() => {}}
      />
    </div>
  );
}
