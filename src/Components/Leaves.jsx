import React, { useEffect, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import axios from 'axios';

const Leaves = () => {
  const [leaveData, setLeaveData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('2025-03');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/leaves?month=${selectedMonth}`);
        setLeaveData(response.data);
      } catch (error) {
        console.error('Failed to fetch leave data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const Card = ({ title, value }) => (
    <div className="bg-gray-100 w-44 h-28 rounded-xl shadow-sm relative flex flex-col justify-center items-center text-center mx-auto">
      <FaExternalLinkAlt className="absolute top-2 right-2 text-xs opacity-40" />
      <div className="text-sm font-medium text-gray-600">{title}</div>
      <div className="mt-2 text-2xl font-bold text-gray-800">{String(value).padStart(2, '0')}</div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Leaves:</h2>
          <input
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="mt-2 bg-transparent border border-gray-300 text-sm p-1 rounded focus:outline-none"
          />
        </div>

        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 text-sm rounded-lg">
          Apply Leaves
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-500 text-center">Loading...</p>}

      {/* Leave Stats */}
      {!loading && leaveData && (
        <div className="flex flex-wrap justify-center gap-6">
          <Card title="Leaves Granted" value={leaveData.granted} />
          <Card title="Leaves Taken" value={leaveData.taken} />
          <Card title="Leaves Balance" value={leaveData.balance} />
          <Card title="Pending Leaves" value={leaveData.pending} />
        </div>
      )}
    </div>
  );
};

export default Leaves;
