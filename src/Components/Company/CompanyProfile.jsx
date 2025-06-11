import React, { useState, useEffect } from "react";
import { UploadCloud, Save } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import Select from "react-select";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import dev_url from "../../config";
countries.registerLocale(enLocale);

const countryOptions = Country.getAllCountries().map((country) => ({
  value: country.isoCode,
  label: country.name,
}));

const CompanyProfile = () => {
  const [editTop, setEditTop] = useState(false);
  const [logo, setLogo] = useState(null);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const [companyData, setCompanyData] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const companyId = user.companyId;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `${dev_url}api/auth/company/companyProfile?id=${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompanyData(response.data.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, []);

  useEffect(() => {
    if (companyData?.country) {
      const states = State.getStatesOfCountry(companyData.country);
      setStateOptions(states);
    }
  }, [companyData?.country]);

  useEffect(() => {
    if (companyData?.state && companyData?.country) {
      const cities = City.getCitiesOfState(
        companyData.country,
        companyData.state
      );
      setCityOptions(cities);
    }
  }, [companyData?.state, companyData?.country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
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

  const updateCompanyData = async () => {
    try {
      await axios.put(
        `${dev_url}api/auth/company/companyProfile?id=${companyId}`,
        companyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating company data:", error);
    }
  };

  const handleSaveCompany = async () => {
    await updateCompanyData();
    setEditTop(false);
  };

  if (!companyData) return null;

  return (
    <div className="p-6 max-w-6xl mx-auto text-gray-700 font-medium text-sm">
      <div className="relative mb-6 border-b pb-6 border-gray-300">
        <button
          onClick={() => setEditTop(!editTop)}
          className="absolute top-0 right-0 text-gray-500 hover:text-black cursor-pointer"
        >
          <FiEdit />
        </button>

        <div className="flex items-start gap-4">
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

          <div className="flex-1 text-center">
            {editTop ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={companyData.name}
                  onChange={handleChange}
                  className="text-lg font-semibold text-center w-full border border-gray-300 rounded py-1"
                />
              </div>
            ) : (
              <>
                <h1 className="text-xl font-semibold mb-2">
                  {companyData.name}
                </h1>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-2 gap-8">
        {/* Company Info */}
        <div className="relative space-y-4 border-r-2 border-gray-300 p-4">
          <h2 className="text-lg text-gray-500 font-semibold text-center mb-6">
            {companyData.name} Info.
          </h2>

          {Object.entries(companyData)
            .filter(
              ([key]) =>
                ![
                  "id",
                  "parent_vendor_company_logo",
                  "parent_vendor_software_logo",
                  "parent_vendor",
                  "business_type",
                  "owner_phone",
                  "owner_name",
                  "company_cnr",
                  "payment_type",
                  "logo",
                  "superadmin_name",
                  "superadmin_email",
                  "start_date",
                  "end_date",
                  "max_devices_limit",
                  "subscription_title",
                  "province",
                  "max_employee_no",
                  "max_whatsapp_push_limit",
                  "max_transactions_limit",
                  "max_mobile_applications_limit",
                  "contact_phone",
                  "contact_name",
                  "max_employees_limit",
                  "end_date",
                  "start_date",
                  "subscription_start_date",
                  "subscription_end_date",
                ].includes(key)
            )
            .map(([key, value]) => (
              <div key={key} className="flex items-start gap-x-4 py-1">
                <span className="w-40 text-gray-500">{formatLabel(key)}:</span>
                {editTop ? (
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  )
                ) : (
                  <span className="text-gray-700">{value ?? ""}</span>
                )}
              </div>
            ))}
          {editTop && (
            <button
              onClick={handleSaveCompany}
              className="bg-black text-white px-3 py-1 text-xs rounded mt-2"
            >
              <Save size={12} className="inline-block mr-1" />
              Save
            </button>
          )}
        </div>

        {/* Admin Info + Subscription Info */}
        <div className="space-y-6">
          {/* Admin Info */}
          <div className="relative space-y-4 p-4">
            <h2 className="text-lg text-gray-500 font-semibold text-center mb-6">
              Admin Info.
            </h2>

            <div className="flex items-start gap-x-4 py-1">
              <span className="w-40 text-gray-500">Admin Name:</span>

              <span className="text-gray-700">
                {companyData.superadmin_name}
              </span>
            </div>

            <div className="flex items-start gap-x-4 py-1">
              <span className="w-40 text-gray-500">Admin Email:</span>

              <span className="text-gray-700">
                {companyData.superadmin_email}
              </span>
            </div>

            <div className="flex items-start gap-x-4 py-1">
              <span className="w-40 text-gray-500">Admin Contact:</span>

              <span className="text-gray-700">{companyData.company_phone}</span>
            </div>
          </div>

          {/* Subscription Info */}
          <div className="space-y-2 rounded p-4">
            <h2 className="text-lg text-gray-500 font-semibold text-center mb-6">
              Subscription Details
            </h2>

            <div className="flex items-start gap-x-4 py-1">
              <span className="w-40 text-gray-500">subscription Title:</span>
              <span className="text-gray-700">
                {companyData.subscription_title}
              </span>
            </div>
            <div className="flex items-start gap-x-4 py-1">
              <span className="w-40 text-gray-500">Start Date:</span>
              <span className="text-gray-700">
                {new Date(companyData.start_date).toLocaleDateString("en-CA")}
              </span>
            </div>
            <div className="flex items-start gap-x-4 py-1">
              <span className="w-40 text-gray-500">End Date:</span>
              <span className="text-gray-700">
                {new Date(companyData.end_date).toLocaleDateString("en-CA")}
              </span>
            </div>
            <div className="flex items-start gap-x-4 py-1">
              <span className="w-40 text-gray-500">Max Employee Limit:</span>
              <span className="text-gray-700">
                {companyData.max_employee_no}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
