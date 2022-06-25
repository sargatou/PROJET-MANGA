import { Switch, Route, Link } from "react-router-dom";
import Article from "../Pages/Article";
import React from "react";

function Carte({ image, nom, prix, prixPromo, id }) {
  return (
    <>
      <div className="col-md-4 col-sm-6">
        <div
          className="card my-5"
          style={{ position: "relative", height: 500,overflow : 'hidden' }}
        >
          {prixPromo != null ? <div className="promo">promo</div> : null}
          <Link to={`/article/${id}`} style={{margin :"auto" }}>
            <img src={image} style={{ maxHeight: "300px"}} alt={nom} />
          </Link>

          <div className="card-body">
            <h5 className="card-title">{nom}</h5>
            <h4 className="card-title" style={{ color: "green" }}>
              {prixPromo != null ? prixPromo : prix}
            </h4>
            <p
              className="card-text p-0"
              style={{ textDecoration: "line-through", color: "gray" }}
            >
              {prixPromo != null ? prix : null}
            </p>

            <div className="d-flex center-block justify-content-center">
              <Link to={`/article/${id}`} className="btn btn-primary">
                Acheter
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Switch>
        <Route path={"/article/:id"}>
          <Article />
        </Route>
      </Switch>
    </>
  );
}

export default Carte;
