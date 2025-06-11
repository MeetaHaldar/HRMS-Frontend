import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import axios from "axios";

const Tooltip = ({ text }) => (
  <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-64 text-sm text-white bg-gray-700 p-2 rounded-md shadow-lg z-50">
    {text}
  </div>
);

const EditableField = ({
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
    className="border border-gray-400 mt-3 px-3 py-2 rounded-md w-full italic placeholder:italic"
  />
);

export default function TaxDetailsForm() {
  const [editMode, setEditMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState({
    tds: false,
    frequency: false,
  });
  const [success, setSuccess] = useState(false);
  const [employees, setEmployees] = useState([]);

  const token = localStorage.getItem("token");
  const company_id = JSON.parse(localStorage.getItem("user"))?.companyId;

  const [form, setForm] = useState({
    pan: "",
    tan: "",
    tds_circle_code: ["", "", "", ""],
    deductor_type: "",
    deductor_emp_id: "",
    deductor_father_name: "",
    deductor_first_name: "", // For showing selected name
  });

  useEffect(() => {
    const fetchTaxDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://atd.infosware-test.in/salary/gettaxdetail?company_id=${company_id}`,
          { headers: { Authorization: token } }
        );

        if (data && data.data) {
          const d = data.data;
          setForm((prev) => ({
            ...prev,
            pan: d.pan || "",
            tan: d.tan || "",
            tds_circle_code: d.tds_circle_code
              ? [
                  d.tds_circle_code.slice(0, 3),
                  d.tds_circle_code.slice(3, 5),
                  d.tds_circle_code.slice(5, 8),
                  d.tds_circle_code.slice(8, 10),
                ]
              : ["", "", "", ""],
            deductor_type: d.deductor_type || "",
            deductor_emp_id: d.deductor_emp_id || "",
            deductor_father_name: d.deductor_father_name || "",
            deductor_first_name: d.deductor_first_name || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching tax details:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get(
          "https://atd.infosware-test.in/api/employee/",
          {
            headers: { Authorization: token },
          }
        );
        setEmployees(data.employees || []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchTaxDetails();
    fetchEmployees();
  }, [company_id, token]);

  const handleChange = (field, value) => {
    if (field === "deductor_emp_id") {
      const selectedEmp = employees.find((emp) => emp.id === value);
      setForm((prev) => ({
        ...prev,
        deductor_emp_id: value,
        deductor_first_name: selectedEmp?.first_name || "",
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };
  const handleTdsCircleChange = (index, value) => {
    const newTds = [...form.tds_circle_code];
    newTds[index] = value;
    setForm((prev) => ({ ...prev, tds_circle_code: newTds }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        company_id,
        pan: form.pan,
        tan: form.tan,
        tds_circle_code: form.tds_circle_code.join(""),
        tax_payment_frequency: "Monthly",
        deductor_type: form.deductor_type,
        deductor_emp_id: form.deductor_emp_id,
        deductor_father_name: form.deductor_father_name,
      };

      await axios.post("https://atd.infosware-test.in/salary/addTax", payload, {
        headers: { Authorization: token },
      });

      setSuccess(true);
      setEditMode(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save tax details:", error);
    }
  };

  const getSelectedEmployeeName = () => {
    if (form.deductor_type === "Employee") {
      const emp = employees.find((e) => e.id === form.deductor_emp_id);
      return emp?.first_name || form.deductor_first_name || "";
    } else {
      return form.deductor_first_name || "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 space-y-6 font-sans">
      <div className="text-right">
        <button onClick={() => setEditMode(true)} className="cursor-pointer">
          <FiEdit />
        </button>
      </div>
      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">
          Tax details saved successfully!
        </div>
      )}

      <div className="text-left text-xl font-semibold text-gray-600">
        Organization Tax Details
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
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
        <div>
          <label className="text-gray-700 mb-3">
            TAN<span className="text-red-500">*</span>
          </label>
          <EditableField
            value={form.tan}
            onChange={(e) => handleChange("tan", e.target.value)}
            editable={editMode}
            required
            placeholder="e.g. DELX01234A"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2">
            <label className="text-gray-700 mb-3">TDS Circle / AO Code</label>
            <div
              className="relative mb-3"
              onMouseEnter={() => setShowTooltip((p) => ({ ...p, tds: true }))}
              onMouseLeave={() => setShowTooltip((p) => ({ ...p, tds: false }))}
            >
              <IoIosInformationCircleOutline className="cursor-pointer" />
              {showTooltip.tds && (
                <Tooltip text="This number can be obtained from Income tax office or through your Income tax profile." />
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-1">
            {form.tds_circle_code.map((code, index) => (
              <input
                key={index}
                value={code}
                onChange={(e) => handleTdsCircleChange(index, e.target.value)}
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
              <IoIosInformationCircleOutline className="cursor-pointer" />
              {showTooltip.frequency && (
                <Tooltip text="TDS should be paid by 7th of each month. For March, by 30th April." />
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

      <div className="text-left text-xl font-semibold text-gray-600 mt-8">
        Tax Deductor Details
      </div>

      <div className="text-gray-700 mb-2">Deductor's Type</div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="radio"
            name="deductor_type"
            checked={form.deductor_type === "Employee"}
            disabled={!editMode}
            onChange={() => handleChange("deductor_type", "Employee")}
            className="appearance-none h-4 w-4 border checked:bg-[#FFD85F] checked:border-3 checked:border-black rounded-full"
          />
          Employee
        </label>
        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="radio"
            name="deductor_type"
            checked={form.deductor_type === "Non-Employee"}
            disabled={!editMode}
            onChange={() => handleChange("deductor_type", "Non-Employee")}
            className="appearance-none h-4 w-4 border checked:bg-[#FFD85F] checked:border-3 checked:border-black rounded-full"
          />
          Non Employee
        </label>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <label className="text-gray-700 mb-3">
            Deductor’s Employee Name<span className="text-red-500">*</span>
          </label>
          {editMode ? (
            <select
              value={form.deductor_emp_id}
              onChange={(e) => handleChange("deductor_emp_id", e.target.value)}
              className="border border-gray-400 mt-3 px-3 py-2 rounded-md w-full italic"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.first_name}
                </option>
              ))}
            </select>
          ) : (
            <EditableField
              value={getSelectedEmployeeName()}
              onChange={() => {}}
              editable={false}
            />
          )}
        </div>
        <div>
          <label className="text-gray-700 mb-3">
            Deductor’s Father’s Name<span className="text-red-500">*</span>
          </label>
          <EditableField
            value={form.deductor_father_name}
            onChange={(e) =>
              handleChange("deductor_father_name", e.target.value)
            }
            editable={editMode}
            required
          />
        </div>
      </div>

      {editMode && (
        <div className="flex gap-4 mt-6">
          <button
            className="bg-[#FFD85F] text-gray-800 hover:bg-yellow-500 w-1/4 py-2 rounded-full font-semibold shadow-md"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="border w-1/4 py-2 rounded-full font-semibold"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
