import React, { useState } from "react";
import { UploadCloud, Save } from "lucide-react";
import { FiEdit } from "react-icons/fi";

const CompanyProfile = () => {
  const [editTop, setEditTop] = useState(false);
  const [editCompany, setEditCompany] = useState(false);
  const [editAdmin, setEditAdmin] = useState(false);
  const [logo, setLogo] = useState(null);

  const [companyData, setCompanyData] = useState({
    name: "THE COMPANY NAME PVT. LTD.",
    tagline: "The Company’s tagline Here under the Company’s Name",
    website: "www.companyname.com",
    address:
      "24 - D, Krishna Nagar, near Twinkle Towers, Market Road, Cannaught Place",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    pan: "MPRCB1842MV",
    gst: "24DDJDKKBDFVX8C",
    employees: "172 Employees",
  });

  const [adminData, setAdminData] = useState({
    name: "The Company Name",
    email: "info@company.com",
    contact: "+9876543210",
  });

  const [subscriptionData] = useState({
    name: "Pro Subscription - Quarterly",
    remaining: "11 Days",
    start: "01/01/2025",
    renewal: "01/04/2025",
    maxEmployees: "200 Employees Max",
  });

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "company") {
      setCompanyData((prev) => ({ ...prev, [name]: value }));
    } else if (section === "admin") {
      setAdminData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLogo(imageUrl);
    }
  };

  const cityOptions = ["New Delhi", "Mumbai", "Bangalore"];
  const stateOptions = ["Delhi", "Maharashtra", "Karnataka"];
  const countryOptions = ["India", "USA", "UK"];

  return (
    <div className="p-6 max-w-6xl mx-auto text-gray-700 font-medium text-sm">
      <div className="relative mb-6 border-b pb-4">
        {/* Edit button at top-right */}
        <button
          onClick={() => setEditTop(!editTop)}
          className="absolute top-0 right-0 text-gray-500 hover:text-black"
        >
          <FiEdit />
        </button>

        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <label className="w-20 h-20 bg-gray-300 rounded flex flex-col items-center justify-center text-xs text-gray-500 cursor-pointer relative overflow-hidden">
              {logo ? (
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <>
                  <UploadCloud className="w-6 h-6" />
                  Upload Logo
                </>
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleLogoUpload}
              />
            </label>
          </div>

          {/* Centered Name + Tagline */}
          <div className="flex-1 text-center">
            {editTop ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={companyData.name}
                  onChange={(e) => handleChange(e, "company")}
                  className="text-lg font-semibold text-center w-full border rounded py-1"
                />
                <input
                  type="text"
                  name="tagline"
                  value={companyData.tagline}
                  onChange={(e) => handleChange(e, "company")}
                  className="text-sm text-gray-600 text-center w-full border rounded py-1"
                />
                <button
                  onClick={() => setEditTop(false)}
                  className="bg-black text-white px-3 py-1 text-xs rounded mt-2"
                >
                  <Save size={12} className="inline-block mr-1" />
                  Save
                </button>
              </div>
            ) : (
              <>
                <h1 className="text-lg font-semibold">{companyData.name}</h1>
                <p className="text-gray-500 text-sm">{companyData.tagline}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-[1fr_1fr] gap-8 mt-6">
        {/* Company Info */}
        <div className="relative space-y-4 border-r border-gray-400 ml-4">
          <h2 className="font-semibold text-center pb-2  text-lg">
            ‘THE COMPANY’ Info.
          </h2>
          <button
            onClick={() => setEditCompany(!editCompany)}
            className="absolute top-0 right-0 text-gray-500 mr-3 hover:text-black"
          >
            <FiEdit />
          </button>
          {Object.entries(companyData)
            .filter(([key]) => !["name", "tagline"].includes(key))
            .map(([key, value]) => (
              <div key={key} className="flex items-start gap-x-4 py-1">
                <span className="w-44">{formatLabel(key)}:</span>
                {editCompany ? (
                  key === "city" || key === "state" || key === "country" ? (
                    <select
                      name={key}
                      value={value}
                      onChange={(e) => handleChange(e, "company")}
                      className="border rounded px-2 py-1 w-full"
                    >
                      {(key === "city"
                        ? cityOptions
                        : key === "state"
                        ? stateOptions
                        : countryOptions
                      ).map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={(e) => handleChange(e, "company")}
                      className="border rounded px-2 py-1 w-full"
                    />
                  )
                ) : (
                  <span className="font-semibold">{value}</span>
                )}
              </div>
            ))}
          {editCompany && (
            <button
              onClick={() => setEditCompany(false)}
              className="bg-black text-white px-3 py-1 text-xs rounded mt-2"
            >
              <Save size={12} className="inline-block mr-1" />
              Save
            </button>
          )}
        </div>

        {/* Admin Info + Subscription */}
        <div className="relative space-y-4">
          <h2 className="font-semibold text-center text-lg pb-2">
            Admin Info.
          </h2>
          <button
            onClick={() => setEditAdmin(!editAdmin)}
            className="absolute top-0 right-0 text-gray-500 hover:text-black"
          >
            <FiEdit />
          </button>
          {Object.entries(adminData).map(([key, value]) => (
            <div key={key} className="flex items-start gap-x-4 py-1">
              <span className="w-44">{formatLabel(key)}:</span>
              {editAdmin ? (
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={(e) => handleChange(e, "admin")}
                  className="border rounded px-2 py-1 w-full"
                />
              ) : (
                <span className="font-semibold">{value}</span>
              )}
            </div>
          ))}

          <div className="pt-4 mt-4 space-y-4">
            <h2 className="font-semibold text-center text-lg pb-2">
              Subscription Details
            </h2>
            {Object.entries(subscriptionData).map(([key, value]) => (
              <div key={key} className="flex items-start gap-x-4 py-1">
                <span className="w-44">{formatLabel(key)}:</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>

          {editAdmin && (
            <button
              onClick={() => setEditAdmin(false)}
              className="bg-black text-white px-3 py-1 text-xs rounded mt-2"
            >
              <Save size={12} className="inline-block mr-1" />
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default CompanyProfile;
