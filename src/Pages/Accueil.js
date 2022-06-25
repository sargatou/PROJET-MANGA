import axios from "axios";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  DotGroup,
  Image,
  Slide,
  Slider,
} from "pure-react-carousel";
import React, { useEffect, useState } from "react";

import Carte from "../Composant/Carte";
import Hero from "../Composant/Hero";
import Pagination from "../Composant/Pagination";
import CreerPagination from "../utils/Pagination";

const Accueil = () => {
  const [page, setPage] = useState(1);
  const [TotalPage, setTotalPage] = useState(null);
  const [article, setArticle] = useState([]);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://otakod.es/hetic/ecommerce-api/products?&limit=12&page=" + page
      )
      .then((response) => {
        setArticle(response.data.products);
        setTotalPage(response.data.total_pages);
      });

    setPagination(CreerPagination(page, TotalPage));
  }, [page]);

  return (
    <div>
      {/* Carousel */}
      <div className="container-fluid pt-3">
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={35}
          totalSlides={3}
          isPlaying = {true}
          interval = {5000}
        >
          <Slider>
            <Slide index={0}>
              <Image
                src={
                  "https://cdn.shopify.com/s/files/1/2365/2477/products/product-image-442863293_1024x1024.jpg?v=1574262136"
                }
                style={{maxWidth : "50%", margin:"auto"}}
              />
            </Slide>
            <Slide index={1}>
              <Image
                src={
                  "https://cdn.shopify.com/s/files/1/2365/2477/products/tableau-anime-fille_1024x1024.jpg?v=1581324222"
                }
                style={{maxWidth : "50%", margin:"auto"}}
              />
            </Slide>
            <Slide index={2}>
              <Image
                src={
                  "https://cdn.shopify.com/s/files/1/2365/2477/products/product-image-1197474751_1024x1024.jpg?v=1612772042"
                }
                style={{maxWidth : "50%", margin:"auto"}}
              />
            </Slide>
          </Slider>
          <div className="d-flex justify-content-between" style={{transform : "translateY(-250px)"}}>
            <ButtonBack className="navCarousel">
              <i className="bi bi-chevron-left" style={{fontSize : "3em"}}></i>
            </ButtonBack>
            <ButtonNext className="navCarousel">
              <i className="bi bi-chevron-right" style={{fontSize : "3em"}}></i>
            </ButtonNext>
          </div>
          <DotGroup/>
        </CarouselProvider>
      </div>
      {/* Section Hero */}
      <Hero titre="DISPONIBLE CHEZ NOUS" sousTitre="" />
      <div className="container">
        {/* // les articles */}

        <div className="row">
          {article.map((element) => {
            return (
              <Carte
                key={element.id}
                nom={element.title}
                image={element.images.photos[0]}
                prix={element.price}
                prixPromo={element.priceDiscount}
                id={element.id}
                no
              />
            );
          })}
        </div>
        {/* pagination */}
        <Pagination
          pagePrecedente={() => setPage(page != 1 ? page - 1 : 1)}
          AccederPage={(e) => setPage(parseInt(e.target.textContent) )}
          pageSuivante={() => setPage(page != TotalPage ? page + 1 : TotalPage)}
          tableauPagination={pagination}
          pageActuelle={page}
        />
      </div>
    </div>
  );
};

export default Accueil;
