import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";
import * as XLSX from "xlsx/xlsx.mjs";
import dev_url from "../../../config";
const MonthlySalaryList = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("2025-06");

  const token = localStorage.getItem("token");
  const tableRef = useRef(null);

  const fetchSalaryData = async (month) => {
    try {
      const res = await axios.get(
        `${dev_url}salary/monthlySalary?month_year=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setSalaryData(res.data || []);
    } catch (error) {
      console.error("Error fetching salary data:", error);
    }
  };

  useEffect(() => {
    fetchSalaryData(selectedMonth);
  }, [selectedMonth]);

  const handleExport = () => {
    const tableEl = tableRef.current;
    const wb = XLSX.utils.table_to_book(tableEl, { sheet: "Monthly Salary" });
    XLSX.writeFile(wb, "Employee_monthly_salary.xlsx");
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-700">
          Monthly Salary List
        </h1>

        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-600 font-medium space-x-2">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border px-2 py-1 rounded-md text-sm text-gray-700"
            />
          </div>

          <button
            onClick={handleExport}
            className="flex items-center bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-300 transition"
          >
            <Upload className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table ref={tableRef} className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-800 font-semibold">
            <tr>
              <th className="px-4 py-3">Emp Code</th>
              <th className="px-4 py-3">Employee Name</th>
              <th className="px-4 py-3">CTC</th>
              <th className="px-4 py-3">Monthly</th>
              <th className="px-4 py-3">Template</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-700">
            {salaryData.length > 0 ? (
              salaryData.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3">{row.emp_code}</td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">{row.ctc}</td>
                  <td className="px-4 py-3">{row.final_salary}</td>
                  <td className="px-4 py-3">{row.template_name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
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

export default MonthlySalaryList;
