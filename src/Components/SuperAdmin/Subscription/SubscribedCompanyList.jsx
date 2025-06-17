import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dev_url from "../../../config";

const SubscribedCompanyList = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(
          `${dev_url}subscription/getsubscribedList`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCompanies(res.data || []);
      } catch (err) {
        console.error("Error fetching subscribed companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [token]);

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
            {companies.map((company, index) => (
              <tr key={index} className="text-sm text-gray-700">
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
                <td className="py-2 px-4 font-semibold">
                  <span
                    className={`${
                      company.is_active === "Active"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {company.is_active}
                  </span>
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
