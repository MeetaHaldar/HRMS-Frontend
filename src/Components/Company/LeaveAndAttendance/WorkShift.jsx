import React, { useEffect, useState } from "react";
import axios from "axios";

const WorkShift = () => {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    graceTime: "",
  });

  const [savedData, setSavedData] = useState(formData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("token");
  const company_id = JSON.parse(localStorage.getItem("user"))?.companyId;

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hh, mm] = timeStr.split(":");
    return `${hh}:${mm}`;
  };

  const fetchSavedShift = async () => {
    try {
      const res = await axios.get(
        `https://www.attend-pay.com/api/auth/company/getTimeInterval?company_id=${company_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data?.data;
      if (
        data?.checkin &&
        data?.checkout &&
        data?.in_above_margin !== undefined
      ) {
        const loadedData = {
          checkIn: formatTime(data.checkin),
          checkOut: formatTime(data.checkout),
          graceTime: data.in_above_margin.toString(),
        };
        setFormData(loadedData);
        setSavedData(loadedData);
      }
    } catch (err) {
      setError("Failed to load saved shift data.");
    }
  };

  useEffect(() => {
    if (!token || !company_id) {
      setError("Missing token or company ID.");
      return;
    }
    fetchSavedShift();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess(false);
  };

  const isTimeEarlier = (start, end) => {
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    return startH < endH || (startH === endH && startM < endM);
  };

  const handleSave = async () => {
    if (!formData.checkIn || !formData.checkOut) {
      setError("Both check-in and check-out times are required.");
      return;
    }

    if (!isTimeEarlier(formData.checkIn, formData.checkOut)) {
      setError("Check-in time must be earlier than check-out time.");
      return;
    }

    const payload = {
      checkin: `${formData.checkIn}:00.000000`,
      checkout: `${formData.checkOut}:00.000000`,
      company_id,
      in_above_margin: parseInt(formData.graceTime, 10),
    };

    try {
      await axios.post(
        "https://www.attend-pay.com/api/auth/company/addtimeInterval",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setError("");
      // Fetch updated data from backend
      await fetchSavedShift();
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to save shift. Please try again.";
      setError(message);
      setSuccess(false);
    }
  };

  const handleCancel = () => {
    setFormData(savedData);
    setError("");
    setSuccess(false);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="p-6 rounded-md max-w-md">
      <h2 className="text-lg text-gray-500 font-semibold mb-6">
        Define Work Shift Time
      </h2>

      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-600 mb-3">
            Check-in time:
          </label>
          <input
            type="time"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-600 mb-3">
            Check-out time:
          </label>
          <input
            type="time"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-3">
          Grace time (in minutes):
        </label>
        <input
          type="number"
          name="graceTime"
          value={formData.graceTime}
          onChange={handleChange}
          placeholder="Grace time (in minutes)"
          className="w-full p-2 border border-gray-300 rounded placeholder:text-gray-400"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">
          Shift time saved successfully!
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-[#FFD85F] text-gray-800 px-6 py-1 rounded-full shadow-md hover:bg-yellow-500 w-1/3 cursor-pointer"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="border border-gray-400 text-gray-700 px-6 py-1 rounded-full hover:bg-gray-100 w-1/3 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WorkShift;
