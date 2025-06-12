import { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import dev_url from "../../../../config";
import DeleteConfirmationPopup from "../../../SuperAdmin/DeleteConfirmationPopup";

const BenefitsTab = ({ setEditData, onEdit }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const token = localStorage.getItem("token");

  const fetchData = () => {
    axios
      .get(`${dev_url}salary/getbenefitcomponent`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data.data || []))
      .catch(() => setData([]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setEditData(item);
    onEdit();
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDeletePopup(true);
  };

  const confirmDelete = async (item) => {
    try {
      await axios.delete(
        `${dev_url}salary/deleteBenefitComponent?id=${item.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchData();
    } catch (error) {
      console.error("Failed to delete benefit:", error);
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
            <th className="px-4 py-2">Benefit Name</th>
            <th className="px-4 py-2">Employer Contribution</th>
            <th className="px-4 py-2">Benefit Type ID</th>
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
                {item.benefit_type_name}
              </td>
              <td className="px-4 py-2">
                {item.include_employer_contribution}
              </td>
              <td className="px-4 py-2">{item.benefit_type_id}</td>
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

      <DeleteConfirmationPopup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={confirmDelete}
        data={selectedItem}
        message={`Are you sure you want to delete "${selectedItem?.benefit_type_name}"?`}
      />
    </>
  );
};

export default BenefitsTab;
