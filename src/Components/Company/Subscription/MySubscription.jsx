import React from "react";
import SubscriptionHistory from "./SubscriptionHistory";
import { useNavigate } from "react-router-dom";
const currentPlan = {
  name: "Pro Plan",
  startDate: "01/04/2025",
  remaining: "0 Days left",
  amount: "₹15K",
  endDate: "30/04/2025",
  renewalDate: "01/05/2025",
};

const MySubscription = () => {
  const navigate = useNavigate();

  const handleChangePlan = () => {
    navigate("/companyAdmin/SubscriptionPlans");
  };
  return (
    <div className="p-6 space-y-6 text-sm text-gray-700">
      {/* Current Subscription Title & Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
          My Current Subscription:
        </h2>
      </div>

      {/* Current Subscription Table */}
      <div className="w-full overflow-auto">
        <table className="min-w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-500 text-sm bg-gray-100">
              <th className="px-4 py-2">Subscriptions</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">Remaining Period</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Renewal date</th>
            </tr>
          </thead>
          <tbody>
            <tr className=" text-gray-800 font-medium">
              <td className="px-4 py-2 underline underline-offset-2">
                {currentPlan.name}
              </td>
              <td className="px-4 py-2">{currentPlan.startDate}</td>
              <td className="px-4 py-2">{currentPlan.remaining}</td>
              <td className="px-4 py-2 font-bold">{currentPlan.amount}</td>
              <td className="px-4 py-2">{currentPlan.endDate}</td>
              <td className="px-4 py-2">{currentPlan.renewalDate}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6 pl-4">
        <button className="bg-[#FFD85F] w-1/7 text-gray-800 shadow-md font-semibold px-5 py-2 rounded-full shadow hover:bg-yellow-500 transition cursor-pointer">
          Renew Plan
        </button>
        <button
          className="underline underline-offset-4 text-gray-800 font-medium hover:text-black cursor-pointer"
          onClick={handleChangePlan}
        >
          Change Plan
        </button>
      </div>
      <SubscriptionHistory />
    </div>
  );
};

export default MySubscription;
