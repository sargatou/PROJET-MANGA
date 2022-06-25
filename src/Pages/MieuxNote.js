import axios from "axios";
import React , { useEffect, useState } from "react";
import Carte from "../Composant/Carte";
import Hero from "../Composant/Hero";

const MieuxNote = () => {
  const [article, setArticle] = useState([]);
  
  useEffect(() => {
    axios
      .get("https://otakod.es/hetic/ecommerce-api/products/top")
      .then((response) => {
        setArticle(response.data.products);
      });
  }, []);

  return (
    <div>
      {/* Section Hero */}
      <Hero titre="Les articles les mieux notés" />
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

              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MieuxNote;
