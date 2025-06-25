import { useEffect, useState } from "react";
import axios from "axios";
import dev_url from "../../../config";

export default function WFHRequest() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");
  const approvedBy = JSON.parse(localStorage.getItem("user"))?.name || "Admin";

  useEffect(() => {
    const fetchWFHData = async () => {
      try {
        const response = await axios.get(`${dev_url}api/employee/wfhdetails`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.wfh_history || [];
        const mapped = data.map((r) => ({
          id: r.id,
          name: r.first_name + " " + r.last_name || "N/A",
          startDate: r.start_time?.split("T")[0],
          endDate: r.end_time?.split("T")[0],
          reason: r.reason || "—",
          requestedDate: r.created_at?.split("T")[0],
          status:
            r.status?.toLowerCase() === "pending"
              ? "P"
              : r.status?.toLowerCase() === "approved"
              ? "A"
              : "R",
          selected: false,
        }));
        setRequests(mapped);
      } catch (error) {
        console.error("Error fetching WFH requests:", error);
      }
    };

    fetchWFHData();
  }, [token]);

  const updateWFHStatus = async (id, status) => {
    try {
      await axios.put(
        `${dev_url}attendence/approvewfh?id=${id}`,
        {
          status: status === "A" ? "Approved" : "Rejected",
          approved_by: approvedBy,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error(`Failed to update status for WFH ID ${id}:`, error);
    }
  };

  const handleBulkSelect = (e) => {
    const checked = e.target.checked;
    const updated = requests.map((r) =>
      r.status === "P" ? { ...r, selected: checked } : r
    );
    setRequests(updated);
  };

  const handleSelect = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r))
    );
  };

  const handleDecision = async (id, newStatus) => {
    await updateWFHStatus(id, newStatus);
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: newStatus, selected: false } : r
      )
    );
  };

  const handleBulkAction = async (newStatus) => {
    const toUpdate = requests.filter((r) => r.selected && r.status === "P");

    for (let r of toUpdate) {
      await updateWFHStatus(r.id, newStatus);
    }

    setRequests((prev) =>
      prev.map((r) =>
        r.selected && r.status === "P"
          ? { ...r, status: newStatus, selected: false }
          : r
      )
    );
  };

  const anySelected = requests.some((r) => r.selected);
  const allSelectable = requests.some((r) => r.status === "P");
  const allSelected =
    allSelectable &&
    requests.filter((r) => r.status === "P").every((r) => r.selected);

  const statusTextMap = {
    P: "Pending",
    A: "Approved",
    R: "Rejected",
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-2 items-center">
        <h2 className="text-lg font-medium">WFH Requests for Approval:</h2>
      </div>

      <div
        className={`mb-3 space-x-3 transition-all duration-300 ease-in-out ${
          anySelected
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <button
          className="px-3 py-1 bg-[#FFD85F] hover:bg-yellow-500 text-gray-900 text-xs md:text-sm rounded-full font-semibold cursor-pointer"
          onClick={() => handleBulkAction("A")}
        >
          Accept All
        </button>
        <button
          className="px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:bg-gray-100"
          onClick={() => handleBulkAction("R")}
        >
          Reject All
        </button>
      </div>

      <table className="min-w-full border-separate border-spacing-0 border border-gray-400 rounded-xl overflow-hidden">
        <thead className="bg-gray-200">
          <tr className="text-left">
            <th className="p-2">
              <input
                type="checkbox"
                checked={allSelectable && allSelected}
                disabled={!allSelectable}
                onChange={handleBulkSelect}
                className="accent-yellow-400"
              />
            </th>
            <th className="p-2">Name</th>
            <th className="p-2">Start Date</th>
            <th className="p-2">End Date</th>
            <th className="p-2">Reason</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id} className="text-left">
              <td className="p-2 align-middle">
                {r.status === "P" && (
                  <input
                    type="checkbox"
                    checked={r.selected || false}
                    onChange={() => handleSelect(r.id)}
                    className="accent-yellow-400"
                  />
                )}
              </td>
              <td className="p-2 align-middle">{r.name}</td>
              <td className="p-2 align-middle">{r.startDate}</td>
              <td className="p-2 align-middle">{r.endDate}</td>
              <td className="p-2 align-middle">{r.reason}</td>
              <td
                className={`p-2 align-middle font-semibold ${
                  r.status === "A"
                    ? "text-green-600"
                    : r.status === "R"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {statusTextMap[r.status]}
              </td>
              <td className="p-2 align-middle">
                {r.status === "P" ? (
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "A" || val === "R") {
                        handleDecision(r.id, val);
                      }
                    }}
                    className="text-sm px-2 py-1 border rounded"
                  >
                    <option value="" disabled>
                      Choose
                    </option>
                    <option value="A">Approve</option>
                    <option value="R">Reject</option>
                  </select>
                ) : (
                  <span className="text-gray-400">Action Taken</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
