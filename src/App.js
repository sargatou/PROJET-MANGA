import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
 
} from "react-router-dom";
import MieuxNote from "./Pages/MieuxNote";
import Panier from "./Pages/Panier";
import Accueil from "./Pages/Accueil";
import Article from "./Pages/Article";
import ResultatRecherche from "./Pages/ResultatRecherche";
import BarreDeRecherche from "./Composant/BarreDeRecherche";

export default function App() {
  const [menuOuvert, setmenuOuvert] = useState(false);
  const [recherche, setRecherche] = useState("");

  return (
    <Router>
      <div>
        <nav className="navbar header bg-dark" id="header">
         <Link to="/"><h6 className="logo">Manga Lovers</h6></Link> 
          <ul className="navLinkList desktop-only">
            <li>
              <NavLink exact to="/">
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/mieux_note">
                Articles mieux notés
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/panier">
                <i className="bi bi-cart4"></i>
              </NavLink>
            </li>
          </ul>
          <BarreDeRecherche onchange={(e) => setRecherche(e.target.value)} />
          <i
            className="bi bi-list click mobile-only"
            onClick={() => setmenuOuvert(!menuOuvert)}
            style={{ color: "#fff", fontSize: "1.5em" }}
          ></i>
        </nav>
        {menuOuvert && (
          <div className="menu-mobile">
            <ul>
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/mieux_note">Articles mieux notés</Link>
              </li>
              <li>
                <Link to="/panier">
                  <i className="bi bi-cart4 mobile-only"></i>
                </Link>
              </li>
            </ul>
          </div>
        )}

        <Switch>
          <Route exact path="/">
            <Accueil />
          </Route>
          <Route path="/mieux_note">
            <MieuxNote />
          </Route>
          <Route path="/panier">
            <Panier />
          </Route>

          <Route path="/article/:id">
            <Article />
          </Route>
          <Route path="/recherche">
            <ResultatRecherche recherche={recherche} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
