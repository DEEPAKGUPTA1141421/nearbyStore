import React from "react";
import "../styles/sellerPage/Sponsered.css";
import tanishq from "../../images/Tanishq.webp";
import iphone from "../../images/iphone.png";
import boat from "../../images/boat.webp";
import samsung from "../../images/samsung.png";
import handm from "../../images/handm.png";
import "../styles/Sponsered.css";

const Sponsered = () => {
  return (
    <>
      <p className="sponseredheading">Sponsored Brands</p>
      <div className="image-gallery">
        <img className="brand-image" src={handm} alt="Brand 1" />
        <img className="brand-image" src={samsung} alt="Brand 2" />
        <img className="brand-image" src={boat} alt="Brand 3" />
        <img className="brand-image" src={iphone} alt="Brand 4" />
        <img className="brand-image" src={tanishq} alt="Brand 5" />
      </div>
    </>
  );
};

export default Sponsered;
