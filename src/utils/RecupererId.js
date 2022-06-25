//retourne l'id présent dans l'url

export default function RecupererId() {
  var path = window.location.href;
  var Tableau = path.split("/");
  return Tableau[Tableau.length - 1];
}
