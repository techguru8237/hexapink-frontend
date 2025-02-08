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
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if(currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`${currentPage === 1 ? "border-none" : ""} cursor-pointer`}
      >
        <GoArrowLeft />
      </button>
      <span>
        {currentPage} of {totalPages} Pages
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`${currentPage === totalPages ? "border-none" : ""} cursor-pointer`}
      >
        <GoArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
