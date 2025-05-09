import React, { useState } from "react";

const AddReimbursementPopup = ({ isOpen, onClose, onSubmit }) => {
  const [reimbursementType, setReimbursementType] = useState("");
  const [nameInPayslip, setNameInPayslip] = useState("");
  const [includeInFBP, setIncludeInFBP] = useState(false);
  const [unclaimedHandling, setUnclaimedHandling] = useState("monthly");
  const [amount, setAmount] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      reimbursementType,
      nameInPayslip,
      includeInFBP,
      unclaimedHandling,
      amount,
      isActive,
    };
    onSubmit(formData);
  };

  if (!isOpen) return null;

  const dummyReimbursementTypes = [
    { id: 1, label: "Travel Allowance" },
    { id: 2, label: "Meal Coupons" },
    { id: 3, label: "Medical Bills" },
    { id: 4, label: "Fuel Reimbursement" },
    { id: 5, label: "Internet Expenses" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Reimbursements
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer "
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reimbursement Type <span className="text-red-500">*</span>
            </label>
            <select
              value={reimbursementType}
              onChange={(e) => setReimbursementType(e.target.value)}
              required
              className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="" className="hover:bg-[#FFD85F]">
                Select reimbursement type...
              </option>
              {dummyReimbursementTypes.map((type) => (
                <option key={type.id} value={type.label}>
                  {type.label}
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
              placeholder="Name in Payslip..."
              value={nameInPayslip}
              onChange={(e) => setNameInPayslip(e.target.value)}
              required
              className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                FBP allows your employees to personalize their salary structure
                by choosing how much they want to receive under each FBP
                component.
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How do you want to handle unclaimed reimbursement?
            </label>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="unclaimed"
                  value="year-end"
                  checked={unclaimedHandling === "year-end"}
                  onChange={() => setUnclaimedHandling("year-end")}
                  className="accent-yellow-500"
                />
                <span>
                  Encash unclaimed reimbursement at the end of each financial
                  year
                </span>
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
                <span>
                  Do not carry forward and encash unclaimed reimbursements
                  monthly
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Amount
            </label>
            <input
              type="number"
              placeholder="Enter Amount here..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
            <strong>Note:</strong> Once you associate this component with an
            employee, you will only be able to edit the Name in Payslip and
            Amount. The changes you make to Amount will only apply to new
            employees.
          </div>

          <div className="flex justify-between items-center pt-2 gap-4">
            <button
              type="submit"
              className="w-1/2 text-sm text-nowrap bg-[#FFD85F] hover:bg-yellow-500 text-gray-700 font-semibold py-2 px-6 rounded-full text-center  cursor-pointer"
            >
              + Add Reimbursement
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-1/2  border border-gray-400 text-gray-700 font-semibold py-1 px-6 rounded-full hover:bg-gray-100 text-center  cursor-pointer"
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
