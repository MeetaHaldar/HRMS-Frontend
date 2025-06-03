// components/LeaveStats.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./StatCard";

const LeaveStats = () => {
  const [leaveData, setLeaveData] = useState({
    granted: 0,
    taken: 0,
    balance: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://www.attend-pay.com/attendence/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        setLeaveData({
          granted: data.leave_balance || 0,
          taken: data.total_leaves_taken || 0,
          balance: data.remaining_leave || 0,
          pending: data.pending_leaves || 0,
        });
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center text-gray-600">
        <StatCard title="Leaves Granted" value={leaveData.granted} />
        <StatCard title="Leaves Taken" value={leaveData.taken} />
        <StatCard title="Leaves Balance" value={leaveData.balance} />
        <StatCard title="Pending Leaves" value={leaveData.pending} />
      </div>
    </>
  );
};

export default LeaveStats;
