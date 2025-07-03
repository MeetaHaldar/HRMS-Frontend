import { useEffect, useState } from "react";
import axios from "axios";
import dev_url from "../../config";

const PayScheduleForm = () => {
  const dayOptions = [
    { label: "S", full: "SUN" },
    { label: "M", full: "MON" },
    { label: "T", full: "TUE" },
    { label: "W", full: "WED" },
    { label: "Th", full: "THU" },
    { label: "F", full: "FRI" },
    { label: "S", full: "SAT" },
  ];

  const [selectedDays, setSelectedDays] = useState([]);
  const [payFrequency, setPayFrequency] = useState("Monthly");
  const [paymentDay, setPaymentDay] = useState(
    "The last working day of each month"
  );
  const [firstMonth, setFirstMonth] = useState("Month");
  const [firstYear, setFirstYear] = useState("Year");
  const [firstPayDate, setFirstPayDate] = useState("");
  const [payrollId, setPayrollId] = useState(null);
  const [companyId, setCompanyId] = useState("abc123");

  const [message, setMessage] = useState({ type: "", text: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${dev_url}salary/getpayrollsetting`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        setPayrollId(data.id);
        setCompanyId(data.company_id);
        setPayFrequency(data.pay_frequency || "Monthly");
        setSelectedDays(data.working_days || []);
        setPaymentDay(data.payment_day || "The last working day of each month");
        setFirstMonth(data.first_pay_month?.toString() || "Month");
        setFirstYear(data.first_pay_year?.toString() || "Year");
        setFirstPayDate(data.first_pay_date || "");
      })
      .catch((err) => {
        console.error("Error fetching payroll settings:", err);
      });
  }, []);

  const toggleDay = (label) => {
    setSelectedDays((prev) =>
      prev.includes(label) ? prev.filter((d) => d !== label) : [...prev, label]
    );
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: payrollId,
      company_id: companyId,
      pay_frequency: payFrequency,
      working_days: selectedDays,
      payment_day: paymentDay,
      first_pay_month: Number(firstMonth),
      first_pay_year: Number(firstYear),
      first_pay_date: firstPayDate,
    };

    axios
      .post(`${dev_url}salary/payrollsetting`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        showMessage("success", "Payroll settings saved successfully!");
      })
      .catch((err) => {
        console.error("Error saving payroll settings:", err);
        showMessage("error", "Failed to save payroll settings.");
      });
  };

  return (
    <div className="relative w-full">
      {/* Message Popup */}
      {message.text && (
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-md text-white z-50 ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <form className="w-full p-6 space-y-6" onSubmit={handleSubmit}>
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
                      ? "bg-[#FFD85F] border-black border-3"
                      : "border-gray-300"
                  }`}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {day.label}
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
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
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
          <strong>Note:</strong> When payment day falls on a non-working day or
          a holiday, employees will get paid on the previous working day.
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
            className="bg-[#FFD85F] text-gray-800 px-8 py-2 rounded-full font-semibold cursor-pointer w-1/5"
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
    </div>
  );
};

export default PayScheduleForm;
