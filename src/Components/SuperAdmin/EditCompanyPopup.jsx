import { useEffect, useState } from "react";

const EditCompanyPopup = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    subdomain: "",
    email: "",
    password: "",
    address: "",
    country: "",
    city: "",
    paymentMode: "",
    maxEmployees: "",
    adminName: "",
    id: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        companyName: initialData.name || "",
        subdomain: initialData.subdomain || "",
        email: initialData.email || "",
        password: "",
        address: initialData.address || "",
        country: initialData.country || "",
        city: initialData.city || "",
        paymentMode: initialData.paymentMode || "",
        maxEmployees: initialData.maxEmployees || "",
        adminName: initialData.adminName || "",
        id: initialData.id || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-500 font-semibold">
            Edit Company Info
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-4xl"
          >
            &times;
          </button>
        </div>
        <hr className="mb-3 border-gray-300 w-full m-auto" />
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            {
              label: "Company Name",
              name: "companyName",
              placeholder: "Change Company Name",
            },
            {
              label: "Subdomain",
              name: "subdomain",
              placeholder: "yourcompany.example.com",
            },
            {
              label: "Email ID",
              name: "email",
              placeholder: "company@emailexample.com",
              type: "email",
            },
            {
              label: "Password",
              name: "password",
              placeholder: "Enter Password",
              type: "password",
            },
            {
              label: "Address",
              name: "address",
              placeholder: "Street Address, area etc.",
            },
            {
              label: "Country",
              name: "country",
              placeholder: "Select Country/ Type Country",
            },
            {
              label: "City",
              name: "city",
              placeholder: "Select City/ Type City",
            },
            {
              label: "Payment Mode",
              name: "paymentMode",
              placeholder: "e.g. Credit Card",
            },
            {
              label: "Max Employee Limit",
              name: "maxEmployees",
              placeholder: "Enter Max Limit",
              type: "number",
            },
            {
              label: "Admin Name",
              name: "adminName",
              placeholder: "Full Name of Admin",
            },
          ].map(({ label, name, placeholder, type = "text" }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                {label}
                <span className="text-red-500">*</span>
              </label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-xl transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyPopup;
