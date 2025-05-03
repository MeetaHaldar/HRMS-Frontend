import React, { useState, useEffect } from "react";
import { UploadCloud, Save } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import Select from "react-select";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { Country, State, City } from "country-state-city";

countries.registerLocale(enLocale);

const countryOptions = Country.getAllCountries().map((country) => ({
  value: country.isoCode,
  label: country.name,
}));

const CompanyProfile = () => {
  const [editTop, setEditTop] = useState(false);
  const [editCompany, setEditCompany] = useState(false);
  const [editAdmin, setEditAdmin] = useState(false);
  const [logo, setLogo] = useState(null);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const [companyData, setCompanyData] = useState({
    name: "Infosware PVT LTD",
    tagline:
      "we Invent Solutions, and we are the best at it and we create software",
    website: "www.infosware.com",
    address:
      "24 - D, Krishna Nagar, near Twinkle Towers, Market Road, Cannaught Place",
    country: "India",
    state: "Delhi",
    city: "New Delhi",

    pan: "MPRCB1842MV",
    gst: "24DDJDKKBDFVX8C",
    employees: "172 Employees",
  });

  const [adminData, setAdminData] = useState({
    "Admin Name": "The Company Name",
    "Admin Email ID": "info@company.com",
    "Admin Contact": "+9876543210",
  });

  const [subscriptionData] = useState({
    "Subscription Name": "Pro Subscription - Quarterly",
    "Remaining Period": "11 Days",
    "Start Date": "01/01/2025",
    "Renewal Date": "01/04/2025",
    "Max Employees Limit": "200 Employees Max",
  });

  useEffect(() => {
    if (companyData.country) {
      const states = State.getStatesOfCountry(companyData.country);
      setStateOptions(states);
    }
  }, [companyData.country]);

  useEffect(() => {
    if (companyData.state && companyData.country) {
      const cities = City.getCitiesOfState(
        companyData.country,
        companyData.state
      );
      setCityOptions(cities);
    }
  }, [companyData.state, companyData.country]);

  const handleChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "company") {
      setCompanyData((prev) => ({ ...prev, [name]: value }));
    } else if (section === "admin") {
      setAdminData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (selectedOption, name) => {
    setCompanyData((prev) => ({
      ...prev,
      [name]: selectedOption.value,
      ...(name === "country" ? { state: "", city: "" } : {}),
      ...(name === "state" ? { city: "" } : {}),
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLogo(imageUrl);
    }
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-gray-700 font-medium text-sm">
      {/* Logo + Name/Tagline Section */}
      <div className="relative mb-6 border-b pb-6  border-gray-300">
        <button
          onClick={() => setEditTop(!editTop)}
          className="absolute top-0 right-0 text-gray-500 hover:text-black cursor-pointer"
        >
          <FiEdit />
        </button>

        <div className="flex items-start gap-4">
          {/* Logo Upload */}
          <div className="flex-shrink-0">
            <label className="w-20 h-20 bg-gray-200 rounded flex flex-col items-center justify-center text-xs text-gray-500 cursor-pointer relative overflow-hidden">
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

          {/* Name + Tagline */}
          <div className="flex-1 text-center">
            {editTop ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={companyData.name}
                  onChange={(e) => handleChange(e, "company")}
                  className="text-lg font-semibold text-center w-full border border-gray-300 rounded py-1"
                />
                <input
                  type="text"
                  name="tagline"
                  value={companyData.tagline}
                  onChange={(e) => handleChange(e, "company")}
                  className="text-sm text-gray-600 text-center w-full border  border-gray-300 rounded py-1"
                />
                <button
                  onClick={() => setEditTop(false)}
                  className="bg-black text-white px-3 py-1 text-xs rounded mt-2"
                >
                  <Save
                    size={12}
                    className="inline-block mr-1 cursor-pointer"
                  />
                  Save
                </button>
              </div>
            ) : (
              <>
                <h1 className="text-xl font-semibold mb-2">
                  {companyData.name}
                </h1>
                <p className="text-gray-500 text-lg">{companyData.tagline}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-2 gap-8">
        {/* Company Info */}
        <div className="relative space-y-4  border-r-2 border-gray-300  p-4">
          <h2 className="text-lg md:text-lg text-gray-500 font-semibold text-center  mb-6">
            {companyData.name} Info.
          </h2>
          <button
            onClick={() => setEditCompany(!editCompany)}
            className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
          >
            <FiEdit />
          </button>
          {Object.entries(companyData)
            .filter(([key]) => !["tagline"].includes(key))
            .map(([key, value]) => (
              <div key={key} className="flex items-start gap-x-4 py-1">
                <span className="w-40 text-gray-500">{formatLabel(key)}:</span>
                {editCompany ? (
                  key === "country" ? (
                    <Select
                      options={countryOptions}
                      value={countryOptions.find(
                        (option) => option.value === value
                      )}
                      onChange={(option) =>
                        handleSelectChange(option, "country")
                      }
                      className="w-full"
                    />
                  ) : key === "state" ? (
                    <select
                      name={key}
                      value={value}
                      onChange={(e) => handleChange(e, "company")}
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="">Select State</option>
                      {stateOptions.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  ) : key === "city" ? (
                    <select
                      name={key}
                      value={value}
                      onChange={(e) => handleChange(e, "company")}
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="">Select City</option>
                      {cityOptions.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
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
                  <span className="text-gray-700">{value}</span>
                )}
              </div>
            ))}
          {editCompany && (
            <button
              onClick={() => setEditCompany(false)}
              className="bg-black text-white px-3 py-1 text-xs rounded mt-2"
            >
              <Save size={12} className="inline-block mr-1 cursor-pointer" />
              Save
            </button>
          )}
        </div>

        {/* Admin Info + Subscription Info */}
        <div className="space-y-6">
          {/* Admin Info */}
          <div className="relative space-y-4 p-4">
            <h2 className="text-lg md:text-lg text-gray-500 font-semibold text-center  mb-6">
              Admin Info.
            </h2>
            <button
              onClick={() => setEditAdmin(!editAdmin)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
            >
              <FiEdit />
            </button>
            {Object.entries(adminData).map(([key, value]) => (
              <div key={key} className="flex items-start gap-x-4 py-1">
                <span className="w-40 text-gray-500">{formatLabel(key)}:</span>
                {editAdmin ? (
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(e, "admin")}
                    className="border rounded px-2 py-1 w-full"
                  />
                ) : (
                  <span className="text-gray-700">{value}</span>
                )}
              </div>
            ))}
            {editAdmin && (
              <button
                onClick={() => setEditAdmin(false)}
                className="bg-black text-white px-3 py-1 text-xs rounded mt-2"
              >
                <Save size={12} className="inline-block mr-1 cursor-pointer" />
                Save
              </button>
            )}
          </div>

          {/* Subscription Info */}
          <div className="space-y-2  rounded p-4">
            <h2 className="text-lg md:text-lg text-gray-500 font-semibold text-center  mb-6">
              Subscription Details
            </h2>
            {Object.entries(subscriptionData).map(([key, value]) => (
              <div key={key} className="flex items-start gap-x-4 py-1">
                <span className="w-40 text-gray-500">{formatLabel(key)}:</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
