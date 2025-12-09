import React from "react";

export const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-end items-center gap-4 my-4 ">
      <button
        disabled={page === 1}
        className="px-4 py-1 bg-blue-600 rounded disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
      >
        prev
      </button>

      <span className="font-semibold">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        className="px-4 py-1 bg-blue-600 rounded disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};
