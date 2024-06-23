import { ChevronLeftIcon, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaginationBar = ({ currentPage, onPageChange }) => {
  const navigate = useNavigate();
  const totalPages = 10;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      onPageChange(newPage);
      navigate(`/page/${newPage || 1}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      onPageChange(newPage);
      navigate(`/page/${newPage || 1}`);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      const isCurrentPage = currentPage === i;
      const pageClass = isCurrentPage
        ? 'bg-secondary border px-2 rounded-md text-white font-semibold'
        : 'bg-primary border px-2 rounded-md';

      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`p-1 ${pageClass}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex justify-between items-center gap-4 p-4 border border-secondary/10 shadow-sm rounded-2xl mt-10">
      <div>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
      </div>

      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon />
        </button>

        {generatePageNumbers()}

        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PaginationBar;