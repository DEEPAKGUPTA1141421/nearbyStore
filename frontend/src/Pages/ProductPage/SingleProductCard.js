import React, { useEffect, useState } from "react";
import tv from "../../images/Ecommerce.jpg";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import axios from "axios";
import { server } from "../../FixedUrl";
import ProductPopup from "./ProductPopup";
import { RxEyeOpen } from "react-icons/rx";
import { useSelector } from "react-redux";
import "../styles/SingleProduct.css";
import {toast} from "react-toastify";
const SingleProductCard = ({ product }) => {
  const { user } = useSelector((state) => state.userreducer);
  const [addedToCart, setaddedToCart] = useState(false);
  const [wishlist, setwishlist] = useState(false);
  const [eyeopen, setEyeOpen] = useState(false);

  const addToCart = async () => {
    const productId = product._id;

    try {
      const { data } = await axios.post(
        `${server}/user/cart/${user._id}/${productId}`
      );
      console.log(data);
      if (data.success) {
        setaddedToCart(true);
      } else {
        toast.error("Item already in cart");
      }
    } catch (err){
      console.log(err);
    }
  };
  const handleOpen = () => {
    setEyeOpen(!eyeopen);
  };

  const wishList = async () => {
    const userId = user._id;
    const productId = product._id;

    try {
      const { data } = await axios.post(
        `${server}/user/wishlist/${userId}/${productId}`
      );
      console.log(data);
      if (data.success) {
        setwishlist(true);
      } else {
        toast.error("Item already in wishlist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const openDetailsPage = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={product.images&&product.images.length>0?product.images[0]:tv}
          alt={product.name}
          onClick={() => openDetailsPage(product._id)}
        />
      </div>
      <div className="product-details">
        <div className="desc-container">
          <b>{product.name}</b>
          <p>
            <i>
              {product.description.length < 100
                ? product.description
                : product.description.slice(0, 100) + "..."}
            </i>
          </p>
        </div>

        <div className="bottom-container">
          <div className="product-footer">
            <span>
              <b>Price: </b>
              <strike>Rs.{product.actualPrice}</strike>&nbsp;
              <b>Rs.{product.sellingPrice}</b>
            </span>
            <span>Rating: {product.totalRating}</span>
          </div>
          <div className="cart-wishlist-btns">
            <div>
              <button onClick={addToCart}>
                {addedToCart ? "Added " : "Add to cart "}&nbsp;
                <FaShoppingCart />
              </button>
            </div>
            <div>
              <button onClick={wishList}>
                {wishlist ? "Wishlisted " : "Add to wishlist "}&nbsp;
                <FaHeart />
              </button>
            </div>
            <div>
              <RxEyeOpen onClick={handleOpen} className="eye-btn" />
            </div>
            {eyeopen && (
              <ProductPopup
                product={product}
                handleOpen={handleOpen}
                addToCart={addToCart}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleProductCard;
