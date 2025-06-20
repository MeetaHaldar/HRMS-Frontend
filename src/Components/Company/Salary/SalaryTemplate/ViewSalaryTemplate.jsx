import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SalaryComponentDropdown from "./SalaryComponentDropdown";
import axios from "axios";
import dev_url from "../../../../config";

const ViewSalaryTemplate = () => {
  const { id: templateId } = useParams();
  const navigate = useNavigate();

  const [templateName, setTemplateName] = useState("");
  const [description, setDescription] = useState("");
  const [annualCTC, setAnnualCTC] = useState(0);
  const [components, setComponents] = useState([]);
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${dev_url}salary/getTemplateById?id=${templateId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data;

        setTemplateName(data.name);
        setDescription(data.description);
        setAnnualCTC(data.annual_ctc);

        const formatComponents = (items, type) =>
          items.map((item) => ({
            ...item,
            name:
              item.earning_name ||
              item.deduction_name ||
              item.reimbursement_type_name ||
              item.benefit_type_name,
            component_id: item.id,
            amount: item.amount || 0,
            category: type,
            monthly: `₹ ${item.amount || 0}`,
            description: `(${type})`,
          }));

        const allComponents = [
          ...formatComponents(data.deductionDetails || [], "deduction"),
          ...formatComponents(data.reimbursementDetails || [], "reimbursement"),
          ...formatComponents(data.benefitDetails || [], "benefit"),
          ...formatComponents(data.earningDetails || [], "earning"),
        ];

        setComponents(allComponents);
      } catch (err) {
        console.error("Error fetching template:", err);
      }
    };

    if (templateId) fetchTemplate();
  }, [templateId]);

  const handleRemoveComponent = (index) => {
    const newList = components.filter((_, i) => i !== index);
    setComponents(newList);
    setIsChanged(true);
  };

  const handleAddComponent = (category, item) => {
    const newComponent = {
      ...item,
      name: item.component_name,
      component_id: item.id,
      amount: item.amount || 0,
      category,
      monthly: `₹ ${item.amount || 0}`,
      description: `(${category})`,
    };
    setComponents((prev) => [...prev, newComponent]);
    setIsChanged(true);
  };

  const validate = () => {
    const err = {};
    if (!templateName.trim()) err.templateName = "Template name is required.";
    if (!description.trim()) err.description = "Description is required.";
    if (!annualCTC || annualCTC <= 0)
      err.annualCTC = "Annual CTC must be greater than zero.";
    if (components.length === 0)
      err.components = "At least one component is required.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    const selectedComponents = {
      earnings: [],
      deductions: [],
      reimbursement: [],
      benefit: [],
    };

    components.forEach((comp) => {
      if (comp.category === "earning")
        selectedComponents.earnings.push(comp.component_id);
      else if (comp.category === "deduction")
        selectedComponents.deductions.push(comp.component_id);
      else if (comp.category === "reimbursement")
        selectedComponents.reimbursement.push(comp.component_id);
      else if (comp.category === "benefit")
        selectedComponents.benefit.push(comp.component_id);
    });

    const payload = {
      id: templateId,
      name: templateName,
      description,
      annual_ctc: annualCTC,
      selectedComponents,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${dev_url}salary/updateTemplate?id=${templateId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Template updated successfully.");
      navigate("/companyAdmin/salaryTemplate");
    } catch (err) {
      console.error("Error updating template:", err);
    }
  };

  const handleCancel = () => {
    navigate("/companyAdmin/salaryTemplate");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
          View Salary Template:
        </h2>
        <div className="relative text-left">
          <SalaryComponentDropdown
            onAddComponent={handleAddComponent}
            selectedComponents={components.map((c) => c.component_id)}
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
            onChange={(e) => {
              setTemplateName(e.target.value);
              setIsChanged(true);
            }}
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
            onChange={(e) => {
              setDescription(e.target.value);
              setIsChanged(true);
            }}
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
              onChange={(e) => {
                setAnnualCTC(Number(e.target.value));
                setIsChanged(true);
              }}
              className="p-2 w-40 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <span className="ml-2 text-gray-600">per year</span>
          </div>
        </div>
        {errors.annualCTC && (
          <p className="text-red-500 text-sm">{errors.annualCTC}</p>
        )}

        {components.length > 0 && (
          <table className="w-full text-left mt-4">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="py-2">Salary Components</th>
                <th className="py-2">Calculation Type</th>
                <th className="py-2">Monthly Amt.</th>
                <th className="py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {components.map((component, index) => (
                <tr key={index}>
                  <td className="py-2">
                    {component.name}
                    <div className="text-xs text-gray-500">
                      {component.description}
                    </div>
                  </td>
                  <td className="py-2 text-gray-500 italic">(Fixed)</td>
                  <td className="py-2">{component.monthly}</td>
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
          </table>
        )}

        {errors.components && (
          <p className="text-red-500 text-sm mt-2">{errors.components}</p>
        )}
      </div>

      <div className="flex items-center p-4">
        <button
          onClick={handleUpdate}
          disabled={!isChanged}
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-full font-semibold ${
            isChanged
              ? "bg-[#FFD85F] hover:bg-yellow-500 text-gray-900 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Update Template
        </button>
        <button
          onClick={handleCancel}
          className="ml-4 border border-gray-300 text-gray-900 px-4 py-2 text-sm rounded-full font-semibold hover:bg-gray-300 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ViewSalaryTemplate;
