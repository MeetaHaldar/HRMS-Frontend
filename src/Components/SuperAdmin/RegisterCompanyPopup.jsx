import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Country, City } from "country-state-city";
import dev_url from "../../config";

const RegisterCompanyPopup = ({ isOpen, onClose, item = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    sub_domain: "",
    email: "",
    password: "",
    address_1: "",
    country: "",
    city: "",
    payment_type: 0,
    max_employees_limit: 0,
    admin_name: "",
    file: null,
    subscription_id: "",
  });

  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchInitialData = async () => {
      const countries = Country.getAllCountries().map((country) => ({
        label: country.name,
        value: country.isoCode,
      }));
      setCountryOptions(countries);

      try {
        const res = await axios.get(`${dev_url}subscription/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const options = res.data.map((sub) => ({
          label: sub.title,
          value: sub.id,
        }));
        setSubscriptionOptions(options);
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
      }

      if (item) {
        const cities = City.getCitiesOfCountry(item.country).map((city) => ({
          label: city.name,
          value: city.name,
        }));
        setCityOptions(cities);

        setFormData({
          name: item.name || "",
          sub_domain: item.sub_domain || "",
          email: item.systemAdmin_email || "",
          password: "",
          address_1: item.address_1 || "",
          country: item.country || "",
          city: item.city || "",
          payment_type: item.payment_type || 0,
          max_employees_limit: item.max_employees_limit || 0,
          admin_name: item.systemAdmin_name || "",
          file: null,
          subscription_id: item.subscription_id || "",
        });
      }
    };

    fetchInitialData();
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleCountryChange = (selected) => {
    const cities = City.getCitiesOfCountry(selected.value).map((city) => ({
      label: city.name,
      value: city.name,
    }));
    setCityOptions(cities);
    setFormData({ ...formData, country: selected.value, city: "" });
  };

  const handleCityChange = (selected) => {
    setFormData({ ...formData, city: selected.value });
  };

  const handleSubscriptionChange = (selected) => {
    setFormData({ ...formData, subscription_id: selected.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    for (const key in formData) {
      if (item && key === "password") continue;
      if (formData[key] !== null && formData[key] !== "") {
        payload.append(key, formData[key]);
      }
    }

    try {
      if (item) {
        await axios.put(`${dev_url}api/auth/company`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${dev_url}api/auth/company`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSuccess();
      handleCancel();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      sub_domain: "",
      email: "",
      password: "",
      address_1: "",
      country: "",
      city: "",
      payment_type: 0,
      max_employees_limit: 0,
      admin_name: "",
      file: null,
      subscription_id: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-80 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">
          {item ? "Edit Company" : "Register New Company"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Sub Domain</label>
            <input
              type="text"
              name="sub_domain"
              value={formData.sub_domain}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          {!item && (
            <div>
              <label className="block font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          )}
          <div>
            <label className="block font-medium">Address</label>
            <input
              type="text"
              name="address_1"
              value={formData.address_1}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Country</label>
            <Select
              options={countryOptions}
              value={countryOptions.find((c) => c.value === formData.country)}
              onChange={handleCountryChange}
              placeholder="Select Country"
            />
          </div>
          <div>
            <label className="block font-medium">City</label>
            <Select
              options={cityOptions}
              value={cityOptions.find((c) => c.value === formData.city)}
              onChange={handleCityChange}
              placeholder="Select City"
              isDisabled={!formData.country}
            />
          </div>
          <div>
            <label className="block font-medium">Amount</label>
            <input
              type="number"
              name="payment_type"
              value={formData.payment_type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Max Employees</label>
            <input
              type="number"
              name="max_employees_limit"
              value={formData.max_employees_limit}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Admin Name</label>
            <input
              type="text"
              name="admin_name"
              value={formData.admin_name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Subscription</label>
            <Select
              options={subscriptionOptions}
              value={subscriptionOptions.find(
                (s) => String(s.value) === String(formData.subscription_id)
              )}
              onChange={handleSubscriptionChange}
              placeholder="Select Subscription"
            />
          </div>
          <div>
            <label className="block font-medium">Logo</label>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-full cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#FFD85F] hover:bg-yellow-500 text-black px-4 py-2 rounded-full cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {item ? "Update" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCompanyPopup;
