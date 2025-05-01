import React, { useState } from "react";

const subscriptionData = {
  Monthly: [
    {
      title: "Basic Subscription",
      price: "₹10K",
      original: "₹20K",
      discount: "50%",
      offer: "₹10K",
      limit: 50,
    },
    {
      title: "Pro Subscription",
      price: "₹15K",
      original: "₹30K",
      discount: "50%",
      offer: "₹15K",
      limit: 150,
    },
    {
      title: "Max Subscription",
      price: "₹20K",
      original: "₹40K",
      discount: "50%",
      offer: "₹20K",
      limit: 300,
    },
  ],
  Annually: [
    {
      title: "Basic Subscription",
      price: "₹100K",
      original: "₹200K",
      discount: "50%",
      offer: "₹100K",
      limit: 50,
    },
    {
      title: "Pro Subscription",
      price: "₹150K",
      original: "₹300K",
      discount: "50%",
      offer: "₹150K",
      limit: 150,
    },
    {
      title: "Max Subscription",
      price: "₹200K",
      original: "₹400K",
      discount: "50%",
      offer: "₹200K",
      limit: 300,
    },
  ],
};

const SubscriptionPlans = () => {
  const [planType, setPlanType] = useState("Monthly");
  const [showAll, setShowAll] = useState(false);

  const plansToShow = showAll
    ? [...subscriptionData.Monthly, ...subscriptionData.Annually]
    : subscriptionData[planType];

  return (
    <div className="p-6">
      {/* Title + Toggle aligned inline */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
          Choose the plan that suits you:
        </h2>

        {/* Toggle */}
        <div className="flex items-center gap-2 border border-dashed border-gray-400 rounded-full w-fit p-1 transition-transform duration-200 ease-in-out shadow-sm">
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium transition-transform transform active:scale-95 ${
              planType === "Monthly"
                ? "bg-yellow-400 text-gray-800"
                : "text-gray-400"
            }`}
            onClick={() => {
              setShowAll(false);
              setPlanType("Monthly");
            }}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium transition-transform transform active:scale-95 ${
              planType === "Annually"
                ? "bg-yellow-400 text-gray-800"
                : "text-gray-400"
            }`}
            onClick={() => {
              setShowAll(false);
              setPlanType("Annually");
            }}
          >
            Annually
          </button>
        </div>
      </div>

      <h3 className="text-gray-500 font-medium mb-4">Subscription Plans:</h3>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plansToShow.map((plan, index) => (
          <div
            key={index}
            className="max-w-sm mx-auto rounded-xl shadow-md p-5 bg-white text-gray-500 space-y-4"
          >
            <h4 className="font-semibold text-gray-800 text-md">
              {plan.title}
            </h4>
            <p className="text-2xl font-bold text-gray-700">
              {plan.price}
              <span className="text-base font-medium text-gray-600">
                {" "}
                / {planType === "Annually" && !showAll ? "year" : "month"}
              </span>
            </p>
            <p className="text-gray-600 text-sm">
              Descriptions Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Aenean pretium ligula nec nunc pulvinar facilisis.
            </p>
            <ul className="text-sm text-gray-700 space-y-2 pt-1">
              <li>
                Max Employee limit: <strong>{plan.limit}</strong>
              </li>
              <li>
                Subscription Amount: <strong>{plan.original}</strong>
              </li>
              <li>
                Limited period Discount: <strong>{plan.discount}</strong>
              </li>
              <li>
                Discounted Offer Price: <strong>{plan.offer}</strong>
              </li>
            </ul>
            <div className="flex justify-center">
              <button className="mt-3 bg-[#FFD85F] w-2/3 text-gray-800 py-2 px-6 rounded-full font-semibold shadow hover:bg-yellow-500 transition">
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Plans */}
      {!showAll && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="text-gray-700 font-semibold underline hover:text-black"
          >
            Browse/ View All Plans
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
