interface PaginationProps {
  currentPage: number;
  isLastPage: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, onPageChange, isLastPage = false }: PaginationProps): JSX.Element {
  const handlePrevious = () => {
    if (currentPage === 1) {
      return;
    }

    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (isLastPage) {
      return;
    }

    onPageChange(currentPage  + 1);
  }

  return (
    <div className="flex items-center gap-2 m-2">
      {currentPage > 1 && (
        <button onClick={handlePrevious} className="btn">{`<<`}</button>
      )}
      {currentPage}
      {!isLastPage && (
        <button onClick={handleNext} className="btn">{`>>`}</button>
      )}
    </div>
  )
}