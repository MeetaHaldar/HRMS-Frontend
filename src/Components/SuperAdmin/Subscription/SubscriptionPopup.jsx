import React, { useState, useEffect } from "react";

const SubscriptionPopup = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxEmployeeLimit: "",
    subscriptionAmount: "",
    limitedPeriodDiscount: "",
    discountedOfferPrice: "",
    duration: "monthly", // Default to 'monthly'
    id: "",
  });

  const isEdit = Boolean(initialData); // Check if we are editing or adding a new subscription

  useEffect(() => {
    if (isEdit) {
      // Populate the form data if we're editing
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        maxEmployeeLimit: initialData.maxEmployeeLimit || "",
        subscriptionAmount: initialData.subscriptionAmount || "",
        limitedPeriodDiscount: initialData.limitedPeriodDiscount || "",
        discountedOfferPrice: initialData.discountedOfferPrice || "",
        duration: initialData.duration || "monthly", // Ensure duration is included
        id: initialData.id || "",
      });
    } else {
      // Reset form when adding new subscription
      setFormData({
        name: "",
        description: "",
        maxEmployeeLimit: "",
        subscriptionAmount: "",
        limitedPeriodDiscount: "",
        discountedOfferPrice: "",
        duration: "monthly", // Default to 'monthly'
        id: "",
      });
    }
  }, [initialData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Trigger onSubmit with the form data
    if (!isEdit) {
      // Reset form if adding a new subscription
      setFormData({
        name: "",
        description: "",
        maxEmployeeLimit: "",
        subscriptionAmount: "",
        limitedPeriodDiscount: "",
        discountedOfferPrice: "",
        duration: "monthly", // Default to 'monthly'
        id: "",
      });
    }
  };

  if (!isOpen) return null; // If the popup is not open, return null to avoid rendering

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-700 font-semibold">
            {isEdit ? "Edit Subscription" : "Add New Subscription"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-3xl leading-none"
          >
            &times;
          </button>
        </div>
        <div className="border-b border-gray-200 mb-4" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Max Employee Limit <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="maxEmployeeLimit"
              min={1}
              value={formData.maxEmployeeLimit}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Total Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="subscriptionAmount"
              value={formData.subscriptionAmount}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2 "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Discount % <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="limitedPeriodDiscount"
              value={formData.limitedPeriodDiscount}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Amount After Discount<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="discountedOfferPrice"
              value={formData.discountedOfferPrice}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2"
            />
          </div>

          {/* Duration (Monthly or Yearly) */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Duration/Time Period <span className="text-red-500">*</span>
            </label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full bg-gray-100 text-gray-800 rounded-xl px-4 py-2"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-[#FFD85F] text-gray-700 font-medium py-2 rounded-xl transition"
          >
            {isEdit ? "Save Changes" : "Add Subscription"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionPopup;
