import axios from "axios";
import React, { useEffect, useState } from "react";

import Carte from "../Composant/Carte";
import Pagination from "../Composant/Pagination";

function ResultatRecherche({ recherche }) {
  const [page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState(null);
  const [article, setArticle] = useState([]);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://otakod.es/hetic/ecommerce-api/products?search=" +
          recherche +
          "&limit=12&page=" +
          page
      )
      .then((response) => {
        setArticle(response.data.products);
        setTotalPage(response.data.total_pages);
      });
  });

  return (
    <div className="container">
      {TotalPage == 0 ? (
        <h3>aucun article trouvé pour {recherche}</h3>
      ) : (
        <>
          <h3>Résultat pour {recherche}</h3>
          <div className="row">
            {article.map((element) => {
              return (
                <Carte
                  key={element.id}
                  nom={element.title}
                  image={element.images.photos[0]}
                  prix={element.price}
                  prixPromo={element.priceDiscount}
                  id={element.id}
                  no
                />
              );
            })}
          </div>
          <Pagination
            pagePrecedente={() => setPage(page != 1 ? page - 1 : 1)}
            AccederPage={(e) => setPage(parseInt(e.target.textContent))}
            pageSuivante={() =>
              setPage(page != TotalPage ? page + 1 : TotalPage)
            }
            tableauPagination={pagination}
            pageActuelle={page}
          />
        </>
      )}
    </div>
  );
}

export default ResultatRecherche;
