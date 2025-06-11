import { useState, useEffect } from "react";
import axios from "axios";
import dev_url from "../../../config";
const SubscriptionPlans = () => {
  const [planType, setPlanType] = useState("Monthly");
  const [showAll, setShowAll] = useState(false);
  const [allPlans, setAllPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${dev_url}subscription/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllPlans(res.data || []);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
        setAllPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [token]);

  const normalizeType = (type) => {
    if (!type) return "";
    const lowerType = type.toLowerCase();
    if (lowerType.includes("month")) return "monthly";
    if (lowerType.includes("ann") || lowerType.includes("year"))
      return "annually";
    return lowerType;
  };

  const filteredPlans = showAll
    ? allPlans
    : allPlans.filter(
        (plan) => normalizeType(plan.duration) === planType.toLowerCase()
      );

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
          Choose the plan that suits you:
        </h2>

        <div className="flex items-center gap-2 border border-dashed border-gray-400 rounded-full w-fit p-1 shadow-sm">
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer transition-transform transform active:scale-95 ${
              !showAll && planType === "Monthly"
                ? "bg-yellow-400 text-gray-800"
                : "text-gray-400"
            }`}
            onClick={() => {
              setPlanType("Monthly");
              setShowAll(false);
            }}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer transition-transform transform active:scale-95 ${
              !showAll && planType === "Annually"
                ? "bg-yellow-400 text-gray-800"
                : "text-gray-400"
            }`}
            onClick={() => {
              setPlanType("Annually");
              setShowAll(false);
            }}
          >
            Annually
          </button>
        </div>
      </div>

      <h3 className="text-gray-500 font-medium mb-4">Subscription Plans:</h3>

      {loading ? (
        <p className="text-center text-gray-500">Loading plans...</p>
      ) : filteredPlans.length === 0 ? (
        <p className="text-center text-gray-500">No plans found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan, idx) => {
            const discountedPrice =
              plan.total_amount - (plan.total_amount * plan.discount) / 100;
            return (
              <div
                key={idx}
                className="max-w-sm mx-auto rounded-xl shadow-md p-5 bg-white text-gray-500 space-y-4"
              >
                <h4 className="font-semibold text-gray-800 text-md">
                  {plan.title}
                </h4>
                <p className="text-lg font-bold text-gray-700">
                  ₹{plan.total_amount}
                  <span className="text-base font-medium text-gray-600">
                    /{" "}
                    {normalizeType(plan.subscription_type) === "annually"
                      ? "year"
                      : "month"}
                  </span>
                </p>
                <p className="text-gray-600 text-sm">
                  {plan.description ||
                    "Descriptions Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pretium ligula nec nunc pulvinar facilisis."}
                </p>
                <ul className="text-sm text-gray-700 space-y-2 pt-1">
                  <li>
                    Max Employee limit: <strong>{plan.max_employee_no}</strong>
                  </li>
                  <li>
                    Subscription Amount: <strong>{plan.total_amount}</strong>
                  </li>
                  <li>
                    Limited period Discount: <strong>{plan.discount}</strong>
                  </li>
                  <li>
                    Discounted Offer Price: <strong>{discountedPrice}</strong>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <button className="mt-3 bg-[#FFD85F] w-2/3 text-gray-800 py-2 px-6 rounded-full font-semibold shadow hover:bg-yellow-500 transition cursor-pointer">
                    Get Started
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!showAll && !loading && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="text-gray-700 font-semibold underline hover:text-black cursor-pointer"
          >
            Browse/ View All Plans
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
