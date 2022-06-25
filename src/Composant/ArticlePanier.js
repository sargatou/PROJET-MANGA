import React from "react";

function ArticlePanier({ image, titre, prix, qte, soustraire, additionner,supprimer }) {
  return (
    <div class="ArtcleContainer">
      <div class="img">
        <img src={image} height={100} />
      </div>
      <div class="description">
        <div class="Titre">
          <h2>{titre}</h2>
        </div>
        <div class="prix">Prix : {prix} €</div>
        <div class="qte">
          <div className="qteButton">
            <button onClick={soustraire}> - </button>
            <p>{qte}</p>
            <button onClick={additionner}> + </button>
          </div>
        </div>
      </div>
      <div class="close">
        <i
          className="bi bi-x click"
          onClick={supprimer}
          style={{ fontSize: "2em",color : "red" }}
        ></i>
      </div>
    </div>
  );
}

export default ArticlePanier;
