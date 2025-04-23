import React, { useEffect, useState } from "react";
import EmployeeWelcomeCard from "./EmployeeWelcomeCard";
import Leaves from "../Leaves";
import AttendanceCalendar from "./AttendanceCalendar";
const Dashboard = () => {
    return (
        <>
         <EmployeeWelcomeCard/>
         <hr className="border-t border-gray-300 my-4" />
         <Leaves/>
         <AttendanceCalendar/>
        </>
       
    )
 
}
export default Dashboard;