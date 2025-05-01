export default function SubscriptionHistory() {
  const history = [
    {
      name: "Basic Plan",
      type: "Monthly",
      amount: "₹10K",
      startDate: "01/05/2024",
      endDate: "31/05/2024",
    },
    {
      name: "Pro Plan",
      type: "Monthly",
      amount: "₹15K",
      startDate: "01/06/2024",
      endDate: "30/06/2024",
    },
    {
      name: "Max Plan",
      type: "Monthly",
      amount: "₹20K",
      startDate: "01/07/2024",
      endDate: "31/07/2024",
    },
  ];
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
              <th className="px-4 py-2">Subs. Type</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Renewal</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, i) => (
              <tr key={i} className=" text-gray-800">
                <td className="px-4 py-2 underline">{item.name}</td>
                <td className="px-4 py-2">{item.type}</td>
                <td className="px-4 py-2">{item.amount}</td>
                <td className="px-4 py-2">{item.startDate}</td>
                <td className="px-4 py-2">{item.endDate}</td>
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
}
