import React from "react";

function Hero({ titre, sousTitre }) {
  return (
    <div className="container text-center pt-5">
      <h1>{titre}</h1>
      <p>{sousTitre}</p>
    </div>
  );
}

export default Hero;
