import { useState } from "react";
import "./Pagination.css";
function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  function goToDoubelRight() {
    setCurrentPage((page) =>
      page + pageLimit < pages ? page + (pageLimit - page + 1) : pages
    );
  }

  function goToDoubleLeft() {
    setCurrentPage((page) => (page - pageLimit > 0 ? page - pageLimit : 1));
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };
  console.log(currentPage);
  return (
    <div>
      <h1>{title}</h1>

      <div className="dataContainer">
        {getPaginatedData().map((d, idx) => (
          <RenderComponent key={idx} data={d} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={goToDoubleLeft}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          «
        </button>
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          {"<"}
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className={`prev ${currentPage === pages ? "disabled" : ""}`}
        >
          {">"}
        </button>

        <button
          onClick={goToDoubelRight}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          »
        </button>
      </div>
    </div>
  );
}

export default Pagination;
