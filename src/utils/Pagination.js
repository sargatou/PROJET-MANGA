//fonction qui crée un tableau de pagination en fonction du numéro de la page consultée

export default function CreerPagination(numPage, maxPage) {
  switch (numPage) {
    case 1:
      return [1, 2, 3];
      break;
    case maxPage:
      return [parseInt(numPage) - 2, parseInt(numPage) - 1, parseInt(numPage)];
      break;

    default:
      return [parseInt(numPage) - 1, parseInt(numPage), parseInt(numPage) + 1];
      break;
  }
}
