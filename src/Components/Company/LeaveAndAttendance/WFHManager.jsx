import { useState, useEffect } from "react";
import axios from "axios";
import dev_url from "../../../config";
const WFHManager = () => {
  const [allowedDays, setAllowedDays] = useState("");
  const [savedAllowedDays, setSavedAllowedDays] = useState("");
  const [carryForward, setCarryForward] = useState("yes");
  const [savedCarryForward, setSavedCarryForward] = useState("yes");
  const [notification, setNotification] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const company_id = JSON.parse(localStorage.getItem("user"))?.companyId;

  const fetchWFHSettings = async () => {
    try {
      setError("");
      const response = await axios.get(
        `${dev_url}api/auth/company/getwfhsetting?company_id=${company_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      if (data?.allowed_days_per_month !== undefined) {
        setAllowedDays(data.allowed_days_per_month.toString());
        setSavedAllowedDays(data.allowed_days_per_month.toString());
      }

      if (data?.carry_forward) {
        setCarryForward(data.carry_forward.toLowerCase());
        setSavedCarryForward(data.carry_forward.toLowerCase());
      }
    } catch (error) {
      setError("Failed to load WFH settings. Please try again.");
    }
  };

  useEffect(() => {
    if (token && company_id) {
      fetchWFHSettings();
    } else {
      setError("Missing token or company ID.");
    }
  }, []);

  const handleSave = async () => {
    try {
      await axios.post(
        `${dev_url}api/auth/company/setwfhsetting`,
        {
          company_id,
          allowed_days_per_month: parseInt(allowedDays),
          carry_forward: carryForward,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedAllowedDays(allowedDays);
      setSavedCarryForward(carryForward);
      setNotification(true);
      setTimeout(() => setNotification(false), 3000);
      fetchWFHSettings(); // Refresh data
    } catch (error) {
      setError(
        error?.response?.data?.message || "Failed to save WFH settings."
      );
    }
  };

  const handleCancel = () => {
    setAllowedDays(savedAllowedDays);
    setCarryForward(savedCarryForward);
    setError("");
  };

  return (
    <div className="p-6 max-w-md relative">
      <h2 className="text-lg md:text-lg text-gray-500 font-semibold mb-2">
        Work From Home Settings
      </h2>

      <p className="text-sm text-gray-600 mb-4">
        Configure how many WFH days are allowed per month, and whether unused
        days can be carried forward.
      </p>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded shadow">
          {error}
        </div>
      )}

      <label className="block text-sm text-gray-600 mb-1">
        Allowed Days Per Month
      </label>
      <input
        type="number"
        min="0"
        placeholder="Enter number of WFH days"
        value={allowedDays}
        onChange={(e) => {
          setAllowedDays(e.target.value);
          setError("");
        }}
        className="w-full border border-gray-300 rounded-md p-2 placeholder-gray-400 mb-4"
      />

      <div className="flex items-center mb-6">
        <p className="text-sm font-medium mr-4 text-gray-600">
          Carryforward WFH:
        </p>
        <label className="flex items-center space-x-1 mr-6">
          <input
            type="radio"
            name="carryForward"
            value="yes"
            checked={carryForward === "yes"}
            onChange={() => setCarryForward("yes")}
            className="appearance-none h-3 w-3 border checked:bg-[#FFD85F] checked:border-black rounded-full"
          />
          <span>Yes</span>
        </label>
        <label className="flex items-center space-x-1">
          <input
            type="radio"
            name="carryForward"
            value="no"
            checked={carryForward === "no"}
            onChange={() => setCarryForward("no")}
            className="appearance-none h-3 w-3 border checked:bg-[#FFD85F] checked:border-black rounded-full"
          />
          <span>No</span>
        </label>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          disabled={
            allowedDays === "" ||
            (allowedDays === savedAllowedDays &&
              carryForward === savedCarryForward)
          }
          className={`px-6 py-1 bg-[#FFD85F] text-gray-800 rounded-full shadow-md w-1/3 ${
            allowedDays === "" ||
            (allowedDays === savedAllowedDays &&
              carryForward === savedCarryForward)
              ? "cursor-not-allowed"
              : "hover:bg-yellow-500 cursor-pointer"
          }`}
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

      {notification && (
        <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-4 py-2 rounded shadow text-sm">
          WFH settings updated successfully!
        </div>
      )}
    </div>
  );
};

export default WFHManager;
