import React, { useState, useEffect } from "react";
import axios from "axios";
import dev_url from "../../../../config";

const AddReimbursementPopup = ({ isOpen, onClose, onSubmit }) => {
  const [reimbursementTypeId, setReimbursementTypeId] = useState("");
  const [reimbursementTypeName, setReimbursementTypeName] = useState("");
  const [nameInPayslip, setNameInPayslip] = useState("");
  const [includeInFBP, setIncludeInFBP] = useState(false);
  const [unclaimedHandling, setUnclaimedHandling] = useState("monthly");
  const [amount, setAmount] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [types, setTypes] = useState([]);
  const [selectedMaxAmount, setSelectedMaxAmount] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`${dev_url}salary/getreimbursementtype`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setTypes(res.data || []);
        })
        .catch((err) => {
          console.error("Error fetching reimbursement types", err);
        });
    }
  }, [isOpen]);

  const handleClose = () => {
    setReimbursementTypeId("");
    setReimbursementTypeName("");
    setNameInPayslip("");
    setIncludeInFBP(false);
    setUnclaimedHandling("monthly");
    setAmount("");
    setIsActive(false);
    setError("");
    setSelectedMaxAmount(null);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const amountValue = parseFloat(amount);

    if (selectedMaxAmount != null && amountValue > selectedMaxAmount) {
      setError(
        `Amount must be less than or equal to the selected reimbursement type's max limit (${selectedMaxAmount}).`
      );
      return;
    }

    const data = {
      reimbursemnt_type_id: parseInt(reimbursementTypeId),
      reimbursement_type_name: reimbursementTypeName,
      name_in_payslip: nameInPayslip,
      is_fbp: includeInFBP ? 1 : 0,
      unclaimed_option: unclaimedHandling,
      amount: amountValue,
      type: "monthly",
      is_active: isActive ? 1 : 0,
    };

    axios
      .post(`${dev_url}salary/addreimbursementComponent`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        onSubmit(res.data);
        handleClose();
      })
      .catch((err) => {
        console.error("Error submitting reimbursement", err);
        setError("Failed to submit reimbursement.");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Reimbursements
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-6 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 80px)" }}
        >
          {error && (
            <div className="text-red-500 text-sm bg-red-100 px-3 py-2 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reimbursement Type <span className="text-red-500">*</span>
            </label>
            <select
              value={reimbursementTypeId}
              onChange={(e) => {
                const selected = types.find(
                  (t) => t.id === parseInt(e.target.value)
                );
                setReimbursementTypeId(selected?.id || "");
                setReimbursementTypeName(selected?.name || "");
                setSelectedMaxAmount(selected?.max_amount || null);
              }}
              required
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select reimbursement type</option>
              {types.map((type) => (
                <option key={type.id} value={type.id} className="text-gray-700">
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name in Payslip <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nameInPayslip}
              onChange={(e) => setNameInPayslip(e.target.value)}
              placeholder="Name in Payslip..."
              required
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="fbp"
              checked={includeInFBP}
              onChange={(e) => setIncludeInFBP(e.target.checked)}
              className="accent-yellow-500 mt-1"
            />
            <label htmlFor="fbp" className="text-sm text-gray-700">
              Include this as a Flexible Benefit Plan component <br />
              <span className="text-xs text-gray-500">
                FBP allows your employees to personalize their salary structure.
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How do you want to handle unclaimed reimbursement?
            </label>
            <div className="flex gap-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="unclaimed"
                  value="year_end"
                  checked={unclaimedHandling === "year_end"}
                  onChange={() => setUnclaimedHandling("year_end")}
                  className="accent-yellow-500"
                />
                <span>Encash yearly</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="unclaimed"
                  value="monthly"
                  checked={unclaimedHandling === "monthly"}
                  onChange={() => setUnclaimedHandling("monthly")}
                  className="accent-yellow-500"
                />
                <span>Discard monthly</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Amount
              {selectedMaxAmount !== null && (
                <span className="text-xs text-gray-500 ml-2">
                  (Max: {selectedMaxAmount})
                </span>
              )}
            </label>
            <input
              type="number"
              placeholder="Amount..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="accent-yellow-500"
            />
            <label htmlFor="isActive">Mark this as Active</label>
          </div>

          <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
            <strong>Note:</strong> You can only edit Name in Payslip and Amount
            for associated employees. Amount changes apply to new employees.
          </div>

          <div className="flex justify-between items-center pt-2 gap-4">
            <button
              type="submit"
              className="w-1/2 text-sm bg-[#FFD85F] hover:bg-yellow-500 text-gray-700 font-semibold py-2 px-6 rounded-full cursor-pointer"
            >
              + Add Reimbursement
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="w-1/2 border border-gray-400 text-gray-700 font-semibold py-1 px-6 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReimbursementPopup;
