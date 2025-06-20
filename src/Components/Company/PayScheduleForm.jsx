import { useState } from "react";

const PayScheduleForm = () => {
  const dayOptions = [
    { label: "SUN", short: "S" },
    { label: "MON", short: "M" },
    { label: "TUE", short: "T" },
    { label: "WED", short: "W" },
    { label: "THU", short: "T" },
    { label: "FRI", short: "F" },
    { label: "SAT", short: "S" },
  ];

  const [selectedDays, setSelectedDays] = useState([]);
  const [payFrequency, setPayFrequency] = useState("Monthly");
  const [paymentDay, setPaymentDay] = useState(
    "The last working day of each month"
  );
  const [firstMonth, setFirstMonth] = useState("Month");
  const [firstYear, setFirstYear] = useState("Year");
  const [firstPayDate, setFirstPayDate] = useState("2025-05-31");

  const toggleDay = (label) => {
    setSelectedDays((prev) =>
      prev.includes(label) ? prev.filter((d) => d !== label) : [...prev, label]
    );
  };

  return (
    <form className="w-full p-6 space-y-6">
      {/* Pay Frequency */}
      <div>
        <label className="block font-semibold mb-2">Pay Frequency:</label>
        <select
          value={payFrequency}
          onChange={(e) => setPayFrequency(e.target.value)}
          className="w-[300px] border border-gray-300 rounded px-4 py-2"
        >
          <option>Monthly</option>
          <option>Weekly</option>
        </select>
      </div>

      {/* Working Days */}
      <div>
        <label className="block font-semibold mb-2">
          Select Number of Working Days:
        </label>
        <div className="flex gap-3 flex-wrap">
          {dayOptions.map((day, index) => (
            <div
              key={index}
              onClick={() => toggleDay(day.label)}
              className="relative w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
            >
              <div
                className={`absolute top-1 left-1 w-3 h-3 rounded-full border-2 ${
                  selectedDays.includes(day.label)
                    ? "bg-[#FFD85F]  border-black border-3"
                    : "border-gray-300"
                }`}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {day.short}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Day and First Pay Period */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-[300px]">
          <label className="block font-semibold mb-2">Payment Day:</label>
          <select
            value={paymentDay}
            onChange={(e) => setPaymentDay(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option>The last working day of each month</option>
            <option>The first day of each month</option>
          </select>
        </div>

        <div className="flex gap-4">
          <div className="w-[150px]">
            <label className="block font-semibold mb-2">
              First Pay Period (Month):
            </label>
            <select
              value={firstMonth}
              onChange={(e) => setFirstMonth(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option>Month</option>
              <option>January</option>
              <option>February</option>
              {/* ... add all months */}
            </select>
          </div>

          <div className="w-[150px]">
            <label className="block font-semibold mb-2">
              First Pay Period (Year):
            </label>
            <select
              value={firstYear}
              onChange={(e) => setFirstYear(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option>Year</option>
              <option>2025</option>
              <option>2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* Note */}
      <p className="text-sm text-gray-600 italic">
        <strong>Note:</strong> When payment day falls on a non-working day or a
        holiday, employees will get paid on the previous working day.
        <span className="text-red-500">*</span>
      </p>

      {/* 1st Pay Date */}
      <div>
        <label className="block font-semibold mb-2">1st Pay Date:</label>
        <input
          type="date"
          value={firstPayDate}
          onChange={(e) => setFirstPayDate(e.target.value)}
          className="w-[300px] border border-gray-300 rounded px-4 py-2"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-[#FFD85F]  text-gray-800 px-8 py-2 rounded-full font-semibold cursor-pointer w-1/5"
        >
          Save
        </button>
        <button
          type="button"
          className="border border-gray-400 px-8 py-2 rounded-full font-semibold text-gray-700 cursor-pointer w-1/5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PayScheduleForm;
