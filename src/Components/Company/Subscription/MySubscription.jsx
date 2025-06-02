import React, { useEffect, useState } from "react";
import axios from "axios";
import SubscriptionHistory from "./SubscriptionHistory";
import { useNavigate } from "react-router-dom";

const MySubscription = () => {
  const [history, setHistory] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const companyId = JSON.parse(user).companyId;
  useEffect(() => {
    const fetchSubscriptionHistory = async () => {
      try {
        const res = await axios.get(
          `https://www.attend-pay.com/subscription/history?id=${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data || [];
        setHistory(data);
        // console.log("Subscription History:", data);

        if (data.length > 0 && latest.end_date < new Date().toISOString()) {
          const latest = data[data.length - 1];

          // Calculate remaining days
          const end = new Date(latest.end_date);
          const today = new Date();
          const remainingDays = Math.max(
            0,
            Math.ceil((end - today) / (1000 * 60 * 60 * 24))
          );

          setCurrentPlan({
            name: latest.title,
            startDate: formatDate(latest.start_date),
            endDate: formatDate(latest.end_date),
            amount: `₹${latest.total_amount}`,
            remaining: `${remainingDays} Days left`,
          });
        } else if (data.length === 0) {
          setCurrentPlan(null);
        }
      } catch (error) {
        console.error("Error fetching subscription history:", error);
      }
    };

    fetchSubscriptionHistory();
  }, [companyId, token]);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-GB");

  const getNextDayFormatted = (dateStr) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString("en-GB");
  };

  const handleChangePlan = () => {
    navigate("/companyAdmin/SubscriptionPlans");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
          My Current Subscription:
        </h2>
      </div>

      {currentPlan ? (
        <div className="w-full overflow-auto">
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-500 text-sm bg-gray-100">
                <th className="px-4 py-2">Subscriptions</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">End Date</th>
                <th className="px-4 py-2">Remaining Days</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-800 font-medium">
                <td className="px-4 py-2 underline underline-offset-2">
                  {currentPlan.name}
                </td>

                <td className="px-4 py-2">{currentPlan.startDate}</td>

                <td className="px-4 py-2 font-bold">{currentPlan.amount}</td>
                <td className="px-4 py-2">{currentPlan.endDate}</td>
                <td className="px-4 py-2">{currentPlan.remaining}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>Don't Have any Current Plan</div>
      )}

      <div className="flex items-center gap-6 pl-4">
        <button className="bg-[#FFD85F] w-1/7 text-gray-800 shadow-md font-semibold px-5 py-2 rounded-full hover:bg-yellow-500 transition cursor-pointer">
          Renew Plan
        </button>
        <button
          className="underline underline-offset-4 text-gray-800 font-medium hover:text-black cursor-pointer"
          onClick={handleChangePlan}
        >
          Change Plan
        </button>
      </div>

      <SubscriptionHistory history={history} />
    </div>
  );
};

export default MySubscription;
