import React, { useState } from "react";
import ArticlePanier from "../Composant/ArticlePanier";
import convertirPrixEnNombre from "../utils/convertirPrixEnNombre";

const Panier = () => {
  const [panier, setPanier] = useState(
    JSON.parse(localStorage.getItem("MangaStore_panier"))
  );
  const [CodePromo, setCodePromo] = useState(false);

  const SupprimerPanier = () => {
    localStorage.removeItem("MangaStore_panier");
  };

  const EnregistrerPanier = () => {
    localStorage.setItem("MangaStore_panier", JSON.stringify(panier));
  };

  const SupprimerArticle = (index) => {
    const nvPanier = [...panier];
    nvPanier.splice(index, 1);
    setPanier(nvPanier);
  };

  const AjoutQte = (index) => {
    const nvPanier = [...panier];
    nvPanier[index].quantite = nvPanier[index].quantite + 1;
    if (nvPanier[index].quantite > nvPanier[index].stock) {
      nvPanier[index].quantite = nvPanier[index].quantite - 1;
      alert("Vous avez atteint le maximum de commande autorisé sur ce produit");
    }
    setPanier(nvPanier);
  };

  const Total = () => {
    let total = 0;
    panier.map((element) => {
      total =
        total + convertirPrixEnNombre(element.prix_unitaire) * element.quantite;
    });
    if (CodePromo == true) {
      total = total * 0.65;
    }
    return total;
  };

  const SoustraireQte = (index) => {
    const nvPanier = [...panier];
    nvPanier[index].quantite = nvPanier[index].quantite - 1;
    if (nvPanier[index].quantite == 0) {
      nvPanier.splice(index, 1);
    }
    setPanier(nvPanier);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Panier</h1>
      {panier == null ? (
        " "
      ) : (
        <div className="row  ">
          <div className="d-flex justify-content-center col-sm-4 py-5">
            <button
              className="btn btn-success"
              onClick={() => EnregistrerPanier()}
            >
              Enregistrer le panier
            </button>
          </div>

          <div className="d-flex justify-content-center col-sm-4 py-5">
            <button
              className="btn btn-danger"
              onClick={() => SupprimerPanier()}
            >
              Vider le panier
            </button>
          </div>
          <div className="d-flex justify-content-center col-sm-4 py-5">
            <button
              className="btn btn-secondary"
              onClick={() => setCodePromo(true)}
            >
              Ajouter un code promo
            </button>
          </div>
        </div>
      )}

      {panier == null ? (
        <div className="text-center">le panier est vide </div>
      ) : (
        panier.map((element, index) => {
          return (
            <ArticlePanier
              key={index}
              image={element.image}
              titre={element.titre}
              prix={
                element.quantite * convertirPrixEnNombre(element.prix_unitaire)
              }
              qte={element.quantite}
              soustraire={() => SoustraireQte(index)}
              additionner={() => AjoutQte(index)}
              supprimer={() => SupprimerArticle(index)}
            />
          );
        })
      )}

      {CodePromo && (
        <div
          className="d-flex justify-content-between  py-3"
          style={{ backgroundColor: "rgb(223, 220, 201)" }}
        >
          <h2 style={{ color: "orange" }}>Code promo activé -35% </h2>
          <i
            className="bi bi-x click "
            style={{ fontSize: "2em", color: "red" }}
            onClick={() => setCodePromo(false)}
          ></i>
        </div>
      )}
      {panier == null ? (
        ""
      ) : (
        <>
          <div
            className="py-3 d-flex justify-content-center"
            style={{ color: "green" }}
          >
            <h2>TOTAL : {Total()} €</h2>
          </div>
          <div className="py-3 d-flex justify-content-center ">
            <button className="btn btn-success">Passer la commande</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Panier;
