import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dev_url from "../../config";

const SalaryTable = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2025-01");
  const token = localStorage.getItem("token");

  const fetchSalaryData = async (year) => {
    try {
      const res = await axios.get(
        `${dev_url}salary/employeeSalary?year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSalaryData(res.data || []);
    } catch (error) {
      console.error("Error fetching salary data:", error);
    }
  };

  useEffect(() => {
    const year = selectedDate.split("-")[0];
    fetchSalaryData(year);
  }, [selectedDate]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return isNaN(date) ? dateString : date.toLocaleDateString("en-GB");
  };

  const getMonthName = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return isNaN(date) ? "-" : date.toLocaleString("en-US", { month: "long" });
  };

  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Salary</h2>

        <div className="flex items-center space-x-2 text-gray-600">
          <input
            type="month"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-2 py-1 rounded-md text-sm text-gray-700"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-800 font-semibold">
            <tr>
              <th className="px-4 py-3">Salary Date</th>
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Deduction</th>
              <th className="px-4 py-3">Salary Slip</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-700">
            {salaryData.length > 0 ? (
              salaryData.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 font-semibold">
                    {formatDate(row.month_year)}
                  </td>
                  <td className="px-4 py-3">{getMonthName(row.month_year)}</td>
                  <td className="px-4 py-3">
                    {row.final_salary?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{row.total_deductions}</td>
                  <td className="px-4 py-3 text-blue-600 font-medium hover:underline">
                    <Link to={`/employee/salarySlip/${row.id}`}>View</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-400">
                  No salary data available for this month
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryTable;
