//fonction qui convertie le prix en format numérique

export default function convertirPrixEnNombre(prix) {
  let nvPrix = prix.slice(0, prix.length - 1);
  return parseInt(nvPrix);
}
