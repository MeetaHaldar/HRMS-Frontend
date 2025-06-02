import React from "react";

const SubscriptionHistory = ({ history }) => {
  return (
    <div>
      <h2 className="text-lg md:text-lg text-gray-500 font-semibold mb-4">
        My Subscription History:
      </h2>

      <div className="w-full overflow-auto">
        <table className="min-w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-500 text-sm bg-gray-100">
              <th className="px-4 py-2">Subscriptions</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Renewal</th>
            </tr>
          </thead>
          <tbody>
            {history?.map((item, i) => (
              <tr key={i} className="text-gray-800">
                <td className="px-4 py-2 underline">{item.title}</td>
                <td className="px-4 py-2 ">{item.total_amount}</td>
                <td className="px-4 py-2">
                  {new Date(item.start_date).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-2">
                  {new Date(item.end_date).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-2 underline underline-offset-2 cursor-pointer">
                  Renew Plan
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionHistory;
