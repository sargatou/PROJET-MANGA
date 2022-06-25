// fonction qui met à jour le panier dans le local storage

export default function enregistrerCommande(
  img,
  nom,
  quantite,
  prix,
  id,
  stock
) {
  let panier =
    localStorage.getItem("MangaStore_panier") !== null
      ? JSON.parse(localStorage.getItem("MangaStore_panier"))
      : [];
  let commande = {
    id: id,
    image: img,
    titre: nom,
    quantite: quantite,
    prix_unitaire: prix,
    stock: stock,
  };
  // si l'id existe déja il sera suprimmer
  panier = panier.filter((data) => data.id != id);
  // ajouter le nouvel objet
  panier.push(commande);
  localStorage.setItem("MangaStore_panier", JSON.stringify(panier));
} 
