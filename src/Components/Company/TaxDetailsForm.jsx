import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Tooltip = ({ text }) => (
  <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-64 text-sm text-white bg-gray-700 p-2 rounded-md shadow-lg z-50">
    {text}
  </div>
);

const EditableField = ({
  label,
  value,
  onChange,
  editable,
  type = "text",
  required = false,
  placeholder = "",
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    disabled={!editable}
    required={required}
    placeholder={placeholder}
    className={`border border-gray-400 mt-3 px-3 py-2 rounded-md w-full italic placeholder:italic`}
  />
);

export default function TaxDetailsForm() {
  const [editMode, setEditMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState({
    tds: false,
    frequency: false,
  });

  const [form, setForm] = useState({
    pan: "",
    tan: "",
    aoCode: ["", "", "", ""],
    frequency: "Monthly",
    type: "Non-Employee",
    name: "",
    fatherName: "",
    designation: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAoCodeChange = (index, value) => {
    const newAo = [...form.aoCode];
    newAo[index] = value;
    setForm((prev) => ({ ...prev, aoCode: newAo }));
  };

  return (
    <div className="max-w-4xl mx-auto p-2 space-y-6 font-sans">
      {/* Edit icon */}
      <div className="text-right">
        <button onClick={() => setEditMode(true)} className="cursor-pointer">
          <FiEdit />
        </button>
      </div>

      {/* Section Title: Organization Tax Details */}
      <div className="text-left text-xl font-semibold text-gray-600">
        Organization Tax Details
      </div>

      {/* PAN and TAN row */}
      <div className="grid grid-cols-2 gap-6 relative">
        <div className="relative">
          <label className="text-gray-700 mb-3">
            PAN<span className="text-red-500">*</span>
          </label>
          <EditableField
            value={form.pan}
            onChange={(e) => handleChange("pan", e.target.value)}
            editable={editMode}
            required
            placeholder="e.g. AAAAA1234A"
          />
        </div>

        <div className="relative">
          <label className="text-gray-700 mb-3">TAN</label>
          <EditableField
            value={form.tan}
            onChange={(e) => handleChange("tan", e.target.value)}
            editable={editMode}
            placeholder="e.g. MUMA00000B"
          />
        </div>
      </div>

      {/* AO Code and Frequency */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2">
            <label className="text-gray-700 mb-3">TDS Circle / AO Code</label>
            <div
              className="relative mb-3"
              onMouseEnter={() => setShowTooltip((p) => ({ ...p, tds: true }))}
              onMouseLeave={() => setShowTooltip((p) => ({ ...p, tds: false }))}
            >
              <span className="cursor-pointer">
                <IoIosInformationCircleOutline />
              </span>
              {showTooltip.tds && (
                <Tooltip text="This number can be obtained from Income tax office or you can login into your Income tax account and navigate to  My Profile section to find this number." />
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-1">
            {form.aoCode.map((code, index) => (
              <input
                key={index}
                value={code}
                onChange={(e) => handleAoCodeChange(index, e.target.value)}
                disabled={!editMode}
                placeholder={["AAA", "AA", "000", "00"][index]}
                className="border border-gray-300 px-3 py-2 rounded-md text-center italic placeholder:italic"
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <label className="text-gray-700 mb-3">Tax Payment Frequency</label>
            <div
              className="relative mb-3"
              onMouseEnter={() =>
                setShowTooltip((p) => ({ ...p, frequency: true }))
              }
              onMouseLeave={() =>
                setShowTooltip((p) => ({ ...p, frequency: false }))
              }
            >
              <span className="cursor-pointer">
                <IoIosInformationCircleOutline />
              </span>
              {showTooltip.frequency && (
                <Tooltip text="Tax Deducted at Source (TDS) for each month should be paid to the Income Tax Department on or before the 7th of the following month. Only for the month of March, TDS should be deposited on or before the 30th of April" />
              )}
            </div>
          </div>
          <input
            type="text"
            value="Monthly"
            disabled
            className="border border-gray-400 mt-3 px-3 py-2 rounded-md w-full italic bg-gray-100 text-gray-700"
          />
        </div>
      </div>

      {/* Section Title: Tax Deductor Details */}
      <div className="text-left text-xl font-semibold text-gray-600 mt-8">
        Tax Deductor Details
      </div>

      {/* Deductor Type */}
      <div className="text-gray-700 mb-2">Deductor's Type</div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="radio"
            name="type"
            checked={form.type === "Employee"}
            disabled={!editMode}
            onChange={() => handleChange("type", "Employee")}
            className="appearance-none h-4 w-4 border checked:bg-[#FFD85F] checked:border-3 checked:border-black rounded-full focus:outline-none"
          />
          Employee
        </label>
        <label className="flex items-center gap-2 text-gray-700 ">
          <input
            type="radio"
            name="type"
            checked={form.type === "Non-Employee"}
            disabled={!editMode}
            onChange={() => handleChange("type", "Non-Employee")}
            className="appearance-none h-4 w-4 border checked:bg-[#FFD85F] checked:border-3 checked:border-black rounded-full focus:outline-none"
          />
          Non-Employee
        </label>
      </div>

      {/* Deductor fields */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-gray-700 mb-3">
            Deductor’s Name<span className="text-red-500">*</span>
          </label>
          <EditableField
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            editable={editMode}
            required
          />
        </div>
        <div>
          <label className="text-gray-700 mb-3">
            Deductor’s Father’s Name<span className="text-red-500">*</span>
          </label>
          <EditableField
            value={form.fatherName}
            onChange={(e) => handleChange("fatherName", e.target.value)}
            editable={editMode}
            required
          />
        </div>
        {form.type === "Non-Employee" && (
          <div className="col-span-2 w-1/2">
            <label className="text-gray-700 mb-3">
              Deductor’s Designation<span className="text-red-500 mb-3">*</span>
            </label>
            <EditableField
              value={form.designation}
              onChange={(e) => handleChange("designation", e.target.value)}
              editable={editMode}
              required
            />
          </div>
        )}
      </div>

      {/* Save / Cancel Buttons */}
      {editMode && (
        <div className="flex gap-4 mt-6">
          <button
            className="bg-[#FFD85F] text-gray-800 hover:bg-yellow-500 w-1/4 py-2 rounded-full font-semibold shadow-md cursor-pointer"
            onClick={() => setEditMode(false)}
          >
            Save
          </button>
          <button
            className="border w-1/4 py-2 rounded-full font-semibold cursor-pointer"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
