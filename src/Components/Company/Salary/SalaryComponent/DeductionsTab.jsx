import { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import dev_url from "../../../../config";
import DeleteConfirmationPopup from "../../../SuperAdmin/DeleteConfirmationPopup";
import AddDeductionPopup from "./AddDeductionPopup";

const DeductionsTab = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editItemData, setEditItemData] = useState(null);

  const token = localStorage.getItem("token");

  const fetchData = () => {
    axios
      .get(`${dev_url}salary/getdeductioncomponent`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data.data || []))
      .catch(() => setData([]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (item) => {
    try {
      const response = await axios.get(
        `${dev_url}salary/getdeductionById?id=${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditItemData(response.data.data);
      console.log("Edit Item Data:", response.data.data);
      setPopupOpen(true);
    } catch (error) {
      console.error("Failed to fetch deduction by ID:", error);
    }
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDeletePopup(true);
  };

  const confirmDelete = async (item) => {
    try {
      await axios.delete(
        `${dev_url}salary/deletedeductionComponent?id=${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
    } catch (error) {
      console.error("Failed to delete deduction:", error);
    } finally {
      setShowDeletePopup(false);
      setSelectedItem(null);
    }
  };

  const handlePopupClose = (shouldRefresh) => {
    setPopupOpen(false);
    setEditItemData(null);
    if (shouldRefresh) fetchData();
  };

  return (
    <>
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Payslip Name</th>
            <th className="px-4 py-2">Deduction Frequency</th>
            <th className="px-4 py-2">Pay Type</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td
                className="px-4 py-2 text-yellow-600 underline cursor-pointer"
                onClick={() => handleEdit(item)}
              >
                {item.deduction_type_name}
              </td>
              <td className="px-4 py-2">{item.name_in_payslip}</td>
              <td className="px-4 py-2">{item.deduction_frequency}</td>
              <td className="px-4 py-2">{item.pay_type}</td>
              <td className="px-4 py-2">{item.amount}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block px-2 py-1 font-semibold ${
                    item.is_active == 1 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.is_active ? "Active" : "Not Active"}
                </span>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="mr-2 text-gray-600 hover:text-black cursor-pointer"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="text-gray-600 hover:text-blackcursor-pointer"
                >
                  <RiDeleteBin6Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmationPopup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={confirmDelete}
        data={selectedItem}
        message={`Are you sure you want to delete "${selectedItem?.deduction_type_name}"?`}
      />

      {popupOpen && (
        <AddDeductionPopup
          isOpen={popupOpen}
          onClose={handlePopupClose}
          onSuccess={fetchData}
          item={editItemData}
        />
      )}
    </>
  );
};

export default DeductionsTab;
