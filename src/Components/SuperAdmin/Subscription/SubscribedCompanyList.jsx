import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SubscribedCompanyList = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(
          "https://atd.infosware-test.in/subscription/getsubscribedList",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Subscribed Companies:", res.data);
        setCompanies(res.data || []); // Adjust based on API response structure
      } catch (err) {
        console.error("Error fetching subscribed companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [token]);

  const handleStatusChange = (id, newStatus) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === id ? { ...company, status: newStatus } : company
      )
    );
  };

  if (loading) {
    return <div className="p-4 text-gray-500">Loading companies...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg md:text-lg text-gray-500 font-semibold mb-4">
        Subscribed Companies:
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead className="bg-gray-200 py-3">
            <tr className="text-gray-600 bg-gray-200">
              {[
                "Company",
                "Subs. Type",
                "Comp. Admin",
                "Start Date",
                "Status",
                "End Date",
                "Renewal",
              ].map((header, i) => (
                <th key={i} className="py-2 px-4 text-left text-sm font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="text-sm text-gray-700">
                <td
                  className="py-2 px-4 underline underline-offset-3 text-gray-500 font-bold cursor-pointer"
                  onClick={() => navigate(`/company/${company.id}`)}
                >
                  {company.company_name || company.name}
                </td>
                <td className="py-2 px-4">{company.subscription_type}</td>
                <td className="py-2 px-4">{company.admin_name}</td>
                <td className="py-2 px-4">
                  {new Date(company.start_date).toLocaleDateString("en-CA")}
                </td>
                <td className="py-2 px-4">
                  <select
                    value={company.status}
                    onChange={(e) =>
                      handleStatusChange(company.id, e.target.value)
                    }
                    className={`font-semibold rounded px-2 py-1 text-sm ${
                      company.status === "Active"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  {new Date(company.end_date).toLocaleDateString("en-CA")}
                </td>
                <td className="py-2 px-4">
                  {new Date(company.end_date).toLocaleDateString("en-CA")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscribedCompanyList;
