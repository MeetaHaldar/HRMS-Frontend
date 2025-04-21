// src/components/common/Pagination.jsx
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
      <button
        className="hover:underline disabled:text-gray-400"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt; Previous
      </button>

      <div className="flex space-x-2">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded ${
              page === currentPage ? 'bg-[#FFD85F] text-black font-bold' : 'hover:bg-gray-200'
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="hover:underline disabled:text-gray-400"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
