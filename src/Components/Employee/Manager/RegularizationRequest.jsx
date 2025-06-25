import { useEffect, useState } from "react";
import axios from "axios";
import dev_url from "../../../config";

export default function RegularizationRequest() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRegularizationData = async () => {
      try {
        const response = await axios.get(
          `${dev_url}attendence/listofRegularize`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = response.data.requests || [];
        const mapped = data.map((r) => ({
          id: r.id,
          name: r.first_name || "N/A",
          startDate: r.date?.split("T")[0] || "—",
          reason: r.reason || "—",
          requestedDate: r.created_at?.split("T")[0],
          status: r.status, // "pending", "approved", "rejected"
          selected: false,
        }));

        setRequests(mapped);
      } catch (error) {
        console.error("Error fetching regularization requests:", error);
      }
    };

    fetchRegularizationData();
  }, [token]);

  const updateStatus = async (requestId, status) => {
    try {
      await axios.put(
        `${dev_url}attendence/updateRegularizeStatus`,
        { requestId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error(`Failed to update status for ID ${requestId}:`, error);
    }
  };

  const handleBulkSelect = (e) => {
    const checked = e.target.checked;
    const updated = requests.map((r) =>
      r.status === "pending" ? { ...r, selected: checked } : r
    );
    setRequests(updated);
  };

  const handleSelect = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r))
    );
  };

  const handleDecision = async (id, newStatus) => {
    await updateStatus(id, newStatus);
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: newStatus, selected: false } : r
      )
    );
  };

  const handleBulkAction = async (newStatus) => {
    const toUpdate = requests.filter(
      (r) => r.selected && r.status === "pending"
    );

    for (let r of toUpdate) {
      await updateStatus(r.id, newStatus);
    }

    setRequests((prev) =>
      prev.map((r) =>
        r.selected && r.status === "pending"
          ? { ...r, status: newStatus, selected: false }
          : r
      )
    );
  };

  const anySelected = requests.some((r) => r.selected);
  const allSelectable = requests.some((r) => r.status === "pending");
  const allSelected =
    allSelectable &&
    requests.filter((r) => r.status === "pending").every((r) => r.selected);

  const statusTextMap = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-2 items-center">
        <h2 className="text-lg font-medium">
          Regularization Requests for Approval:
        </h2>
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
          onClick={() => handleBulkAction("approved")}
        >
          Accept All
        </button>
        <button
          className="px-3 py-1 rounded-full text-sm font-medium shadow-sm hover:bg-gray-100"
          onClick={() => handleBulkAction("rejected")}
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
              />
            </th>
            <th className="p-2">Name</th>
            <th className="p-2">Start Date</th>
            <th className="p-2">Reason</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
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
              <td className="p-2 align-middle">{r.reason}</td>
              <td
                className={`p-2 align-middle font-semibold ${
                  r.status === "approved"
                    ? "text-green-600"
                    : r.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {statusTextMap[r.status]}
              </td>
              <td className="p-2 align-middle">
                {r.status === "pending" ? (
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "approved" || val === "rejected") {
                        handleDecision(r.id, val);
                      }
                    }}
                    className="text-sm px-2 py-1 border rounded"
                  >
                    <option value="" disabled>
                      Choose
                    </option>
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
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
