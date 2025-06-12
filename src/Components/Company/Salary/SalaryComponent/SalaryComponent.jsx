import { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmationPopup from "../../../SuperAdmin/DeleteConfirmationPopup";
import AddBenefitPopup from "./AddBenifitPopup";
import AddDeductionPopup from "./AddDeductionPopup";
import AddReimbursementPopup from "./AddReimbursementPopup";
import AddEarningsPopup from "./AddEarningsPopup";
import Pagination from "../../../Pagination";
import dev_url from "../../../../config";
import EarningsTab from "./EarningsTab";
import DeductionsTab from "./DeductionsTab";
import BenefitsTab from "./BenefitsTab";
import ReimbursementTab from "./ReimbursementTab";

export default function SalaryComponent() {
  const [activeTab, setActiveTab] = useState("earnings");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showBenefitPopup, setShowBenefitPopup] = useState(false);
  const [showDeductionPopup, setShowDeductionPopup] = useState(false);
  const [showReimbursementPopup, setShowReimbursementPopup] = useState(false);
  const [showEarningsPopup, setShowEarningsPopup] = useState(false);

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDeletePopup(true);
  };

  const confirmDelete = (item) => {
    setShowDeletePopup(false);
    setSelectedItem(null);
  };

  const handleNameClick = (item) => {
    setEditData(item);
    if (activeTab === "earnings") setShowEarningsPopup(true);
    else if (activeTab === "deductions") setShowDeductionPopup(true);
    else if (activeTab === "benefits") setShowBenefitPopup(true);
    else if (activeTab === "Reimbursment") setShowReimbursementPopup(true);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-lg text-gray-500 font-semibold">
          Salary Components:
        </h2>
        <div className="relative inline-block text-left">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex justify-center w-full rounded-full shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            + Add Salary Component ▾
          </button>
          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10">
              <div className="py-1">
                {["Earnings", "Benefits", "Deductions", "Reimbursements"].map(
                  (item, idx) => (
                    <a
                      key={idx}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setEditData(null);
                        setDropdownOpen(false);
                        if (item === "Benefits") setShowBenefitPopup(true);
                        if (item === "Deductions") setShowDeductionPopup(true);
                        if (item === "Reimbursements")
                          setShowReimbursementPopup(true);
                        if (item === "Earnings") setShowEarningsPopup(true);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#FFD85F]"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full space-x-4 mb-6">
        {["earnings", "deductions", "benefits", "Reimbursment"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 rounded-lg font-semibold text-lg cursor-pointer ${
              activeTab === tab
                ? "bg-[#FFD85F] text-gray-600"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex-grow overflow-auto">
        {activeTab === "earnings" && (
          <EarningsTab onEdit={handleNameClick} onDelete={handleDelete} />
        )}
        {activeTab === "deductions" && (
          <DeductionsTab onEdit={handleNameClick} onDelete={handleDelete} />
        )}
        {activeTab === "benefits" && (
          <BenefitsTab onEdit={handleNameClick} onDelete={handleDelete} />
        )}
        {activeTab === "Reimbursment" && (
          <ReimbursementTab onEdit={handleNameClick} onDelete={handleDelete} />
        )}
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      <DeleteConfirmationPopup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={confirmDelete}
        data={selectedItem}
        message={`Are you sure you want to delete "${selectedItem?.name}"?`}
      />

      <AddBenefitPopup
        isOpen={showBenefitPopup}
        onClose={() => {
          setShowBenefitPopup(false);
          setEditData(null);
        }}
        editData={editData}
      />

      <AddDeductionPopup
        isOpen={showDeductionPopup}
        onClose={() => {
          setShowDeductionPopup(false);
          setEditData(null);
        }}
        editData={editData}
      />

      <AddReimbursementPopup
        isOpen={showReimbursementPopup}
        onClose={() => {
          setShowReimbursementPopup(false);
          setEditData(null);
        }}
        editData={editData}
      />

      <AddEarningsPopup
        isOpen={showEarningsPopup}
        onClose={() => {
          setShowEarningsPopup(false);
          setEditData(null);
        }}
        editData={editData}
      />
    </div>
  );
}
