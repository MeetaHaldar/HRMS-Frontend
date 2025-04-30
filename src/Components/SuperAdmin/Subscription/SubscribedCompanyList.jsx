import { useState } from "react";
import { useNavigate } from "react-router-dom";

const companiesData = [
  { id: 1, name: "Company 1", status: "Active" },
  { id: 2, name: "Company 2", status: "Inactive" },
  { id: 3, name: "Company 3", status: "Active" },
  { id: 4, name: "Company 4", status: "Inactive" },
  { id: 5, name: "Company 5", status: "Active" },
  { id: 6, name: "Company 6", status: "Inactive" },
  { id: 7, name: "Company 7", status: "Active" },
];

const SubscribedCompanyList = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState(companiesData);

  const handleStatusChange = (id, newStatus) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === id ? { ...company, status: newStatus } : company
      )
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-lg md:text-lg text-gray-500 font-semibold mb-4">
        Subscribed Companies:
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead className="bg-gray-200 py-3">
            <tr className="text-gray-600 bg-gray-200 ">
              {[
                "Company",
                "Subs. Type",
                "Comp. Admin",
                "Start Date",
                "Status",
                "End Date",
                "Renewal",
              ].map((header, i) => (
                <th
                  key={i}
                  className="py-2 px-4 text-left text-sm font-medium "
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="text-sm text-gray-700">
                <td
                  className="py-2 px-4 underline underline-offset-2 text-gray-500 font-bold cursor-pointer"
                  onClick={() => navigate(`/company/${company.id}`)}
                >
                  {company.name}
                </td>
                <td className="py-2 px-4">Subs. Type</td>
                <td className="py-2 px-4">Comp. Admin</td>
                <td className="py-2 px-4">01/05/2025</td>
                <td className="py-2 px-4">
                  <select
                    value={company.status}
                    onChange={(e) =>
                      handleStatusChange(company.id, e.target.value)
                    }
                    className={`font-semibold rounded px-2 py-1 text-sm ${
                      company.status === "Active"
                        ? "text-Gray-600"
                        : "text-gray-500"
                    }`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td className="py-2 px-4">01/08/2025</td>
                <td className="py-2 px-4">01/08/2025</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscribedCompanyList;
