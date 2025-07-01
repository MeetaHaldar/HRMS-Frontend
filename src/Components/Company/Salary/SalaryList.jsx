import React, { useEffect, useState } from "react";
import axios from "axios";
import dev_url from "../../../config";

const SalaryList = () => {
  const [employees, setEmployees] = useState([]);
  const [templateMap, setTemplateMap] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${dev_url}api/employee/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const empList = res.data.employees;
      setEmployees(empList);

      const map = {};
      for (const emp of empList) {
        const templateId = emp.template_id;
        if (templateId && !map[templateId]) {
          const templateRes = await axios.get(
            `${dev_url}salary/getTemplateById?id=${templateId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          map[templateId] = {
            name: templateRes.data.name,
            ctc: templateRes.data.annual_ctc,
          };
        }
      }

      setTemplateMap(map);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <section className="px-6 py-10">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Employee Salary Template
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 font-semibold">Emp Code</th>
              <th className="p-3 font-semibold">Employee Name</th>
              <th className="p-3 font-semibold">CTC</th>
              <th className="p-3 font-semibold">Template</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => {
              const templateData = templateMap[emp.template_id] || {};
              return (
                <tr key={idx}>
                  <td className="p-3">{emp.emp_code}</td>
                  <td className="p-3">{emp.first_name}</td>
                  <td className="p-3">{templateData.ctc || "—"}</td>
                  <td className="p-3">{templateData.name || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SalaryList;
