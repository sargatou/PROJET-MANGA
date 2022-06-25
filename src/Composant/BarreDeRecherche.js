import React from "react";
import { Link, useHistory } from "react-router-dom";

function BarreDeRecherche({ onchange }) {
const history = useHistory();


  const EnterPress = (e) => {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
       history.push("/recherche");
    }
  };
  return (
    
        <div className="searchBar">
          <input type="text" onChange={onchange} onKeyPress={EnterPress}/>
          <Link to="/recherche" style={{color : '#000'}} >
              <i className="click bi bi-search"></i>
          </Link>
        </div>
     
  );
}

export default BarreDeRecherche;
