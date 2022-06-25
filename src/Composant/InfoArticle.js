import React from "react";

function InfoArticle({
  titre,
  note,
  nbrNote,
  categorie,
  prixPromo,
  prix,
  stock,
  onclick,
}) {
  return (
    <div className="col-sm-6">
      <h1>{titre}</h1>
      {note == null ? (
        <p>Pas de note pour cet article</p>
      ) : (
        <p>
          note : {note} <b>/ 5</b>
          <em> ({nbrNote} avis sur cet article )</em>
        </p>
      )}

      <p>Catégorie : {categorie}</p>
      {prixPromo != null ? (
        <span style={{ color: "red", backgroundColor: "yellow" }}>
          EN PROMOTION !
        </span>
      ) : null}
      <h4 style={{ color: "green" }}>{prixPromo != null ? prixPromo : prix}</h4>
      <p style={{ textDecoration: "line-through", color: "gray" }}>
        {prixPromo != null ? prix : null}
      </p>
      {stock == 0 ? (
        <p style={{ color: "red" }}>
          <i className="bi bi-exclamation-diamond"></i> Stock épuisé
        </p>
      ) : (
        <p>{stock} article(s) disponible actuellement en stock</p>
      )}
      <button className="btn btn-success" onClick={onclick}>
        Ajouter au panier +
      </button>
    </div>
  );
}

export default InfoArticle;
