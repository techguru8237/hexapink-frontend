import React from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer"
      >
        <GoArrowLeft />
      </button>
      <span>
        {currentPage} of {totalPages} Pages
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer"
      >
        <GoArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
