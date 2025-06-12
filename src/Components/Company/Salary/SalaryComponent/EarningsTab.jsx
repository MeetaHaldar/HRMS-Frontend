import { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import dev_url from "../../../../config";
import AddEarningsPopup from "./AddEarningsPopup";
import DeleteConfirmationPopup from "../../../SuperAdmin/DeleteConfirmationPopup";

const EarningTab = () => {
  const [data, setData] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const token = localStorage.getItem("token");
  const companyId = JSON.parse(localStorage.getItem("user"))?.companyId;

  const fetchData = () => {
    axios
      .get(`${dev_url}salary/getearnigComponent`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data || []))
      .catch(() => setData([]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(
        `${dev_url}salary/getComponentById?id=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedItem(res.data);
      setPopupOpen(true);
    } catch (err) {
      console.error("Error fetching earning by ID", err);
    }
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDeletePopup(true);
  };

  const confirmDelete = async (item) => {
    try {
      await axios.delete(
        `${dev_url}salary/deleteearningComponent?id=${item.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
    } catch (error) {
      console.error("Failed to delete earning:", error);
    } finally {
      setShowDeletePopup(false);
      setSelectedItem(null);
    }
  };

  return (
    <>
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Payslip Name</th>
            <th className="px-4 py-2">Calculation Type</th>
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
                onClick={() => handleEdit(item.id)}
              >
                {item.earning_name}
              </td>
              <td className="px-4 py-2">{item.name_in_payslip}</td>
              <td className="px-4 py-2">{item.calculation_type}</td>
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
                  onClick={() => handleEdit(item.id)}
                  className="mr-2 text-gray-600 hover:text-black"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="text-gray-600 hover:text-black"
                >
                  <RiDeleteBin6Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {popupOpen && (
        <AddEarningsPopup
          isOpen={popupOpen}
          onClose={() => {
            setPopupOpen(false);
            setSelectedItem(null);
            fetchData();
          }}
          item={selectedItem}
        />
      )}

      <DeleteConfirmationPopup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={confirmDelete}
        data={selectedItem}
        message={`Are you sure you want to delete "${selectedItem?.earning_name}"?`}
      />
    </>
  );
};

export default EarningTab;
