import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SubscriptionPopup from "./SubscriptionPopup";
import { FiPlus } from "react-icons/fi";

const Subscription = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);

  const token = localStorage.getItem("token");

  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get("https://www.attend-pay.com/subscription/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubscriptions(res.data);
    } catch (error) {
      console.error("Error fetching subscriptions", error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const openAddPopup = () => {
    setInitialData(null);
    setIsPopupOpen(true);
  };

  const openEditPopup = (subscriptionData) => {
    setInitialData(subscriptionData);
    setIsPopupOpen(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subscription?"
    );
    if (confirmDelete) {
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const payload = {
        title: formData.name,
        description: formData.description,
        max_employee_no: parseInt(formData.maxEmployeeLimit),
        discount: parseFloat(formData.limitedPeriodDiscount),
        total_amount: parseFloat(formData.subscriptionAmount),
      };

      await axios.post(
        "https://www.attend-pay.com/subscription/addsubscriptiontype",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsPopupOpen(false);
      fetchSubscriptions(); // Refresh after submission
    } catch (error) {
      console.error("Error adding subscription", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg text-gray-600 font-semibold">
          Subscription Listed:
        </h2>
        <button
          onClick={openAddPopup}
          className="flex items-center space-x-2 bg-[#FFD85F] hover:bg-yellow-400 text-gray-700 font-semibold py-2 px-4 rounded-full shadow"
        >
          <FiPlus />
          <span>Add Subscription</span>
        </button>
      </div>

      <div className="mt-10">
        {subscriptions.length === 0 ? (
          <p className="text-center text-gray-500">
            No subscriptions available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {subscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="relative p-4 rounded-lg shadow-md bg-white w-full max-w-xs mx-auto"
              >
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => openEditPopup(subscription)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(subscription.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTrashAlt />
                  </button>
                </div>

                <h3 className="text-gray-600 text-lg text-center mt-6 font-semibold">
                  {subscription.title || subscription.name}
                </h3>
                <p className="text-sm text-gray-500 mt-3 text-left">
                  {subscription.description}
                </p>

                <div className="space-y-2 mt-4 mb-4">
                  <p className="text-sm">
                    Max Employee Limit:{" "}
                    <span className="text-gray-700">
                      {subscription.max_employee_no}
                    </span>
                  </p>
                  <p className="text-sm mb-4 mt-4">
                    Subscription Amount:{" "}
                    <span className="text-gray-900">
                      ${subscription.total_amount}
                    </span>
                  </p>
                  <p className="text-sm mb-4">
                    Discount:{" "}
                    <span className="text-gray-900">
                      {subscription.discount}%
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <SubscriptionPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleSubmit}
        initialData={initialData}
      />
    </div>
  );
};

export default Subscription;
