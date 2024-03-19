import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SingleProductCard from "../ProductPage/SingleProductCard.js";
import "../styles/SingleProduct.css";
import "../styles/FeaturedProducts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const FeaturedProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/product/search",
        {
          params: {
            limitproduct: 8,
          },
        }
      );
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} custom-arrow next`} onClick={onClick}>
        <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} custom-arrow prev`} onClick={onClick}>
        <FontAwesomeIcon icon={faArrowLeft} className="arrow-icon" />
      </div>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust the number of products shown at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <SingleProductCard product={product} />
    </div>
  );

  return (
    <Fragment>
      <p className="featuredHeading">Featured Products</p>
      {loading ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"></svg>
      ) : (
        <div className="slider-container">
          <Slider {...sliderSettings}>
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </Slider>
        </div>
      )}
    </Fragment>
  );
};

export default FeaturedProduct;
