import React, { useEffect, useState } from "react";
import EmployeeWelcomeCard from "./EmployeeWelcomeCard";
import AttendanceCalendar from "./AttendanceCalendar";
import LeaveStats from "../LeaveStats";
const Dashboard = () => {
  return (
    <>
      <EmployeeWelcomeCard />
      <hr className="border-t border-gray-300 my-4" />
      <h2 className="text-lg font-semibold text-gray-500">Leaves:</h2>

      <LeaveStats />
      <AttendanceCalendar />
    </>
  );
};
export default Dashboard;
