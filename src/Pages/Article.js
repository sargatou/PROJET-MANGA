import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  ImageWithZoom,
  Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import enregistrerCommande from "../utils/EnregistrerCommande";
import InfoArticle from "../Composant/InfoArticle";
import DescriptionArticle from "../Composant/DescriptionArticle";
import RecupererId from "../utils/RecupererId";
import { Link } from "react-router-dom";

function Article() {
  const [id, setId] = useState(() => RecupererId());
  const [article, setArticle] = useState({});
  const [articleSimilaire, setArticleSimilaire] = useState([]);
  const [image, setImage] = useState([]);
  const [panierOuvert, setPanierOuvert] = useState(false);
  const [quantite, setQuantite] = useState(0);
  const [prix, setPrix] = useState(null);
  var myTimeout;

  useEffect(() => {
    axios
      .get("https://otakod.es/hetic/ecommerce-api/products/" + id)
      .then((response) => {
        setArticle(response.data);
        setImage(
          response.data.images.photos.concat(response.data.images.thumbs)
        );
        response.data.priceDiscount == null
          ? setPrix(response.data.price)
          : setPrix(response.data.priceDiscount);
      });
  }, [id]);

  useEffect(() => {
    // requete pour les produit similaire de même catégorie
    axios
      .get(
        "https://otakod.es/hetic/ecommerce-api/products?page=1&category=" +
          article.category +
          "&limit=3"
      )
      .then((response) => {
        setArticleSimilaire(response.data.products);
      });
  });

  const CacherPanier = () => {
    setPanierOuvert(false);
  }

  const AjoutPanier = () => {
    setQuantite(quantite + 1);
    if (quantite <= article.stock) {
      enregistrerCommande(
        article.images.photos[0],
        article.title,
        quantite + 1,
        prix,
        article.id,
        article.stock
      );
      setPanierOuvert(true);
    } else {
      setPanierOuvert(true);
    }
    myTimeout = setTimeout(CacherPanier, 5000);
  };

  

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-6">
            {/* carousel d'image */}
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={90}
              totalSlides={image.length}
            >
              <Slider>
                {image.map((element, index) => {
                  return (
                    <Slide index={index} key={index}>
                      <ImageWithZoom src={element} />
                    </Slide>
                  );
                })}
              </Slider>
              <div
                className="d-flex justify-content-between"
                style={{ transform: "translateY(-250px)" }}
              >
                <ButtonBack className="navCarousel">
                  <i
                    className="bi bi-chevron-left"
                    style={{ fontSize: "1.5em" }}
                  ></i>
                </ButtonBack>
                <ButtonNext className="navCarousel">
                  <i
                    className="bi bi-chevron-right"
                    style={{ fontSize: "1.5em" }}
                  ></i>
                </ButtonNext>
              </div>
              <div className="dotContainer">
                {image.map((element, index) => {
                  return (
                    <Dot
                      slide={index}
                      key={index}
                      children={<img src={element} className="dotClass" />}
                    />
                  );
                })}
              </div>
            </CarouselProvider>
          </div>
          {/* information concernant l'article */}
          <InfoArticle
            titre={article.title}
            note={article.rating}
            nbrNote={article.raters}
            categorie={article.category}
            prixPromo={article.priceDiscount}
            prix={article.price}
            stock={article.stock}
            onclick={() => AjoutPanier()}
          />
        </div>
        {/* description du produit */}
        <div className="row py-5">
          <DescriptionArticle texte={article.description} />
        </div>
        <div className="row py-3">
          <h2>Produits similaires</h2>
          {articleSimilaire.map((element, index) => {
            return (
              <div className="col-sm-4" key={index}>
                <Link
                  to={`/article/${element.id}`}
                  className="produit_similaire"
                  onClick={() => setId(element.id)}
                >
                  <img
                    width={200}
                    height={200}
                    src={element.images.photos[0]}
                  />
                  <h6>{element.title}</h6>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {panierOuvert && (
        <div className="Notif-panier">
          {article.stock > quantite ? (
            <div>
              <div className="d-flex justify-content-between">
                <h2>Votre panier</h2>
                <i
                  className="bi bi-x click"
                  onClick={() => setPanierOuvert(!panierOuvert)}
                ></i>
              </div>
              <div>{quantite} articles ont été ajoutés avec succès</div>
              <div>
                <Link to="/panier" className="btn btn-success">
                  Voir le panier
                </Link>
              </div>
            </div>
          ) : (
            <div>
              Toutes nos excuses, il est impossible de commander cet article car
              son stock est épuisé
            </div>
          )}
        </div>
      )}
      {/* <Switch>
        <Route path={"/article/:id"}>
          <Article />
        </Route>
      </Switch> */}
    </>
  );
}
export default Article;
