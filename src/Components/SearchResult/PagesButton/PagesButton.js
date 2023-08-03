import Classes from "./PageButton.module.css";

const PagesButton = ({
  onFirstPage,
  onLastPage,
  currentPage,
  onPrevPage,
  onNextPage,
  totalPages,
}) => {
  const nextPageHandler = () => {
    onNextPage();
  };

  const prevPageHandler = () => {
    onPrevPage();
  };

  const firstPageHandler = () => {
    onFirstPage();
  };
  const lastPageHandler = () => {
    onLastPage();
  };

  return (
    <div className={Classes["page_button"]}>
      {currentPage > 1 && <button onClick={firstPageHandler}>First</button>}
      <button disabled={currentPage < 2} onClick={prevPageHandler}>
        Prev
      </button>

      <p>
        {currentPage} of {totalPages}
      </p>
      <button disabled={currentPage > totalPages - 1} onClick={nextPageHandler}>
        Next
      </button>
      {currentPage < totalPages && (
        <button onClick={lastPageHandler}>Last</button>
      )}
    </div>
  );
};

export default PagesButton;
