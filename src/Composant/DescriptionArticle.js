import React from "react";

function DescriptionArticle({ texte }) {
  return (
    <div className="col-sm-12">
      <h2>Détail</h2>
      <p>{texte}</p>
    </div>
  );
}

export default DescriptionArticle;
