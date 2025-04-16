import { Button } from "@/components/ui/button";
import { ThickArrowLeftIcon, ThickArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="flex items-center justify-center w-full gap-3 py-3 border-t-[1px]">
      <Button
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        className="bg-green-600 text-white hover:bg-green-500"
      >
        <ThickArrowLeftIcon />
      </Button>
      <p>
        Page <span className="font-bold">{currentPage}</span> of{" "}
        <span className="font-bold text-blue-700">{totalPages}</span>
      </p>
      <Button
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        className="bg-green-600 text-white hover:bg-green-500"
      >
        <ThickArrowRightIcon />
      </Button>
    </div>
  );
};

export default Pagination;