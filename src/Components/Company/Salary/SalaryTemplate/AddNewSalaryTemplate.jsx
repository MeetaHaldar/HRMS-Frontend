import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SalaryComponentDropdown from "./SalaryComponentDropdown";
import axios from "axios";
import dev_url from "../../../../config";

const AddNewSalaryTemplate = () => {
  const [salaryComponents, setSalaryComponents] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [description, setDescription] = useState("");
  const [annualCTC, setAnnualCTC] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/companyAdmin/salaryTemplate");
  };

  const handleAddComponent = (category, item) => {
    const newComponent = {
      ...item,
      name: item.component_name,
      component_id: item.id,
      amount: item.amount || 0,
      description: `(${category})`,
      category: category,
      monthly: item.amount ? `₹ ${item.amount}` : "₹ 0.00",
    };
    setSalaryComponents((prev) => [...prev, newComponent]);
  };

  const handleRemoveComponent = (index) => {
    setSalaryComponents((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const err = {};
    if (!templateName.trim()) err.templateName = "Template name is required.";
    if (!description.trim()) err.description = "Description is required.";
    if (!annualCTC || annualCTC <= 0) err.annualCTC = "Annual CTC is required.";
    if (salaryComponents.length === 0)
      err.components = "At least one salary component is required.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const selectedComponents = {
      earnings: [],
      deductions: [],
      reimbursement: [],
      benefit: [],
    };
    salaryComponents.forEach((comp) => {
      if ("earning_name" in comp) {
        selectedComponents.earnings.push(comp.id);
      } else if ("deduction_type_name" in comp) {
        selectedComponents.deductions.push(comp.id);
      } else if ("reimbursement_type_name" in comp) {
        selectedComponents.reimbursement.push(comp.id);
      } else if ("benefit_type_name" in comp) {
        selectedComponents.benefit.push(comp.id);
      }
    });

    const payload = {
      name: templateName,
      description,
      annual_ctc: annualCTC,
      selectedComponents,
    };

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${dev_url}salary/salarytemplate`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200 || res.status === 201) {
        navigate("/companyAdmin/salaryTemplate");
      }
    } catch (err) {
      console.error("Error creating salary template", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
          Add New Salary Template:
        </h2>
        <div className="relative text-left">
          <SalaryComponentDropdown
            onAddComponent={handleAddComponent}
            selectedComponents={salaryComponents.map((c) => c.id)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Template Name
          </label>
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Template Name"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.templateName && (
            <p className="text-red-500 text-sm">{errors.templateName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Max 500 characters..."
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
      </div>

      <div className="p-4 border border-gray-200 rounded-md">
        <div className="flex flex-row mb-2">
          <label className="text-gray-700 mr-2 basis-1/3">Annual CTC</label>
          <div className="flex items-center basis-2/3">
            <input
              type="number"
              value={annualCTC}
              onChange={(e) => setAnnualCTC(Number(e.target.value))}
              className="p-2 w-40 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <span className="ml-2 text-gray-600">per year</span>
          </div>
        </div>
        {errors.annualCTC && (
          <p className="text-red-500 text-sm">{errors.annualCTC}</p>
        )}

        <table className="w-full text-left">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="py-2">Salary Components</th>
              <th className="py-2">Calculation Type</th>
              <th className="py-2">Monthly Amt.</th>
              <th className="py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {salaryComponents.map((component, index) => (
              <tr key={index}>
                <td className="py-2">
                  {component.earning_name ||
                    component.deduction_type_name ||
                    component.reimbursement_type_name ||
                    component.benefit_type_name}
                  <div className="text-xs text-gray-500">
                    {component.description}
                  </div>
                </td>
                <td className="py-2 text-gray-500 italic">(Fixed)</td>
                <td className="py-2">₹ {component.amount}</td>
                <td className="py-2 text-center">
                  <span
                    className="text-gray-500 cursor-pointer text-2xl"
                    onClick={() => handleRemoveComponent(index)}
                  >
                    ×
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          {errors.components && (
            <tfoot>
              <tr>
                <td colSpan="4">
                  <p className="text-red-500 text-sm">{errors.components}</p>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      <div className="flex items-center p-4">
        <button
          onClick={handleSave}
          className="flex items-center justify-center bg-[#FFD85F] hover:bg-yellow-500 text-gray-900 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full font-semibold cursor-pointer"
        >
          Save Template
        </button>
        <button
          onClick={handleCancel}
          className="flex items-center justify-center ml-4 w-1/9 border border-gray-300 text-gray-900 px-5 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-full font-semibold cursor-pointer hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddNewSalaryTemplate;
