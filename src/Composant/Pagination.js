import React from "react";

function Pagination({
  
  pagePrecedente,
  AccederPage,
  pageSuivante,
  
  tableauPagination,
  pageActuelle,
}) {
  return (
    <div className="row d-flex justify-content-center py-5">
     
      <button className="PageBtn" onClick={pagePrecedente}>
        <i className="bi bi-chevron-left"></i>
      </button>
      {tableauPagination.map((element, index) => {
        return (
          <button
            className={element == pageActuelle ? "PageBtn actif" : "PageBtn"}
            onClick={AccederPage}
            key={index}
          >
            {element}
          </button>
        );
      })}
      <button className="PageBtn" onClick={pageSuivante}>
        <i className="bi bi-chevron-right"></i>
      </button>
      
    </div>
  );
}

export default Pagination;
