import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import dev_url from "../../config";

const SalarySlip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSalarySlip = async () => {
      try {
        const res = await axios.get(
          `${dev_url}salary/salaryslipById?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching salary slip:", error);
      }
    };

    fetchSalarySlip();
  }, [id]);

  const handleDownload = () => window.print();

  const formatMonth = (monthStr) => {
    const [year, month] = monthStr?.split("-") || [];
    const date = new Date(`${year}-${month}-01`);
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  if (!data) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 relative py-10 px-4 print:bg-white">
      {/* Top Left - Back */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 px-4 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-sm print:hidden cursor-pointer"
      >
        ← Back
      </button>

      {/* Top Right - Download */}
      <button
        onClick={handleDownload}
        className="absolute top-4 right-4 flex items-center gap-2 px-4 py-1 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 text-sm print:hidden cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
          />
        </svg>
        Download
      </button>

      {/* Salary Slip Content */}
      <div
        className="max-w-3xl mx-auto mt-10 bg-white p-8 border border-gray-300 text-sm text-gray-800 font-sans print:shadow-none print:border-none"
        id="printArea"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              {formatMonth(data.month_year)} - Salary Slip
            </h1>
            <p className="text-xs text-gray-500">{data.company_subdomain}</p>
          </div>
          <img
            src={`${dev_url}public/upload/${data.company_logo}`}
            alt={data.company_name}
            className="h-12 object-contain"
          />
        </div>

        <div className="mb-6 flex justify-between items-start gap-8">
          <div className="leading-6 space-y-1">
            <p>
              <strong>Employee Name:</strong> {data.name}
            </p>
            <p>
              <strong>Designation:</strong> {data.position_name}
            </p>
            <p>
              <strong>Department:</strong> {data.department_name}
            </p>
          </div>

          <div className="text-right leading-6 space-y-1">
            <p>
              <strong>Company:</strong> {data.company_name}
            </p>
            <p>
              <strong>Address:</strong> {data.company_address}
            </p>
            <p>
              <strong>Phone:</strong> {data.company_no}
            </p>
          </div>
        </div>

        {/* Annual CTC */}
        <div className="text-base font-semibold text-gray-800 mb-4">
          Annual CTC: ₹{Number(data.ctc).toLocaleString()}
        </div>

        {/* Salary Components Table */}
        <table className="w-full text-sm border border-gray-300 mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">
                Salary Components
              </th>
              <th className="px-4 py-2 text-left font-semibold">Type</th>
              <th className="px-4 py-2 text-left font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.earnings?.length > 0 &&
              data.earnings.map((item, index) => (
                <tr key={`earning-${index}`}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2 text-green-700">Earning</td>
                  <td className="px-4 py-2">
                    ₹{Number(item.amount).toLocaleString()}
                  </td>
                </tr>
              ))}

            {data.deductions?.length > 0 &&
              data.deductions.map((item, index) => (
                <tr key={`deduction-${index}`}>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2 text-red-700">Deduction</td>
                  <td className="px-4 py-2">
                    ₹{Number(item.amount).toLocaleString()}
                  </td>
                </tr>
              ))}

            {Number(data.reimbursements) > 0 && (
              <tr>
                <td className="px-4 py-2">Reimbursements</td>
                <td className="px-4 py-2 text-blue-700">Reimbursement</td>
                <td className="px-4 py-2">
                  ₹{Number(data.reimbursements).toLocaleString()}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Final Total */}
        <div className="text-right font-semibold text-green-600 text-lg mb-6">
          Total Salary Paid: ₹{Number(data.final_salary).toLocaleString()}
        </div>

        {/* Footer Info */}
        <div className="text-sm text-gray-700 space-y-4">
          <p>
            For any Queries, please call <strong>{data.company_no}</strong> or
            email <strong>{data.email}</strong>
          </p>
          <div>
            <p>Regards,</p>
            <p>
              <strong>{data.owner_name || "Infosware HR"}</strong>
            </p>
            <p>Infosware Private Limited</p>
          </div>
          <div className="flex justify-end">
            <p className="font-medium">Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalarySlip;
