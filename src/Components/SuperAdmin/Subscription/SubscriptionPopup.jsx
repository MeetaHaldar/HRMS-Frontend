// SubscriptionPopup.jsx
import React, { useState, useEffect } from "react";

const SubscriptionPopup = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  errorMessage,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxEmployeeLimit: "",
    subscriptionAmount: "",
    limitedPeriodDiscount: "",
    discountedOfferPrice: "",
    duration: "",
    id: "",
  });

  const isEdit = Boolean(initialData);

  useEffect(() => {
    if (isEdit) {
      setFormData({
        name: initialData.title || "",
        description: initialData.description || "",
        maxEmployeeLimit: initialData.max_employee_no || "",
        subscriptionAmount: initialData.total_amount || "",
        limitedPeriodDiscount: initialData.discount || "",
        discountedOfferPrice: initialData.discountedOfferPrice || "",
        duration: initialData.duration || "",
        id: initialData.id || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        maxEmployeeLimit: "",
        subscriptionAmount: "",
        limitedPeriodDiscount: "",
        discountedOfferPrice: "",
        duration: "",
        id: "",
      });
    }
  }, [initialData, isEdit, errorMessage]);
  useEffect(() => {
    if (!isOpen) {
      // Clear form when popup closes
      setFormData({
        name: "",
        description: "",
        maxEmployeeLimit: "",
        subscriptionAmount: "",
        limitedPeriodDiscount: "",
        discountedOfferPrice: "",
        duration: "",
        id: "",
      });
    }
  }, [isOpen]);

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
        {errorMessage && (
          <div className="text-red-600 text-sm mb-2 text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Title"
            className="w-full bg-gray-100 rounded-xl px-4 py-2"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Description"
            className="w-full bg-gray-100 rounded-xl px-4 py-2"
          />
          <input
            type="number"
            name="maxEmployeeLimit"
            min={1}
            value={formData.maxEmployeeLimit}
            onChange={handleChange}
            required
            placeholder="Max Employee Limit"
            className="w-full bg-gray-100 rounded-xl px-4 py-2"
          />
          <input
            type="number"
            name="subscriptionAmount"
            value={formData.subscriptionAmount}
            onChange={handleChange}
            required
            placeholder="Total Amount"
            className="w-full bg-gray-100 rounded-xl px-4 py-2"
          />
          <input
            type="number"
            name="limitedPeriodDiscount"
            value={formData.limitedPeriodDiscount}
            onChange={handleChange}
            required
            placeholder="Discount %"
            className="w-full bg-gray-100 rounded-xl px-4 py-2"
          />
          <input
            type="number"
            name="discountedOfferPrice"
            value={formData.discountedOfferPrice}
            onChange={handleChange}
            required
            placeholder="Amount After Discount"
            className="w-full bg-gray-100 rounded-xl px-4 py-2"
          />
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full bg-gray-100 rounded-xl px-4 py-2"
          >
            <option value="">Select Duration</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button
            type="submit"
            className="w-full bg-[#FFD85F] text-gray-700 py-2 rounded-xl"
          >
            {isEdit ? "Save Changes" : "Add Subscription"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionPopup;
