import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../styles/sellerPage/ProDuctPopUp.css";
import tv from "../../images/Ecommerce.jpg";
import { TiArrowUpThick } from "react-icons/ti";
import { FaArrowDown } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
const ProductPopUp = ({ product, handleOpen }) => {
  const shop = {
    name: "Galaxy Shop",
    city: "delhi",
    onwer: "ramsingh",
  };
  console.log("product", product);
  const [amount, setAmount] = useState(1);
  const handleIncrease = () => {
    if (amount <= product.stock) {
      setAmount(amount + 1);
    }
  };
  const handleDecrease = () => {
    if (amount == 1) {
      return;
    }
    setAmount(amount - 1);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
    return () => {
      document.body.style.overflow = "scroll"; // Re-enable scrolling when component is unmounted
    };
  }, []);
  const addToCart = () => {};
  return ReactDOM.createPortal(
    <Fragment>
      <div className="modalWrapper" onClick={handleOpen}></div>
      <div className="modalContainer">
        <div className="popupcontainer">
          <div>
            <div className="croosicon" onClick={handleOpen}><GiCancel /></div>
            {/* <div>
              <img className="popupimage" src={tv} alt="productimage" />
            </div>
            <div className="ShopInfo">
              <div><span>Shop Name  </span><span>{shop.name}</span></div>
              <div><span>Shop City  </span><span>{shop.city}</span></div>
              <div><span>Shop Onwer  </span><span>{shop.onwer}</span></div>
            </div> */}
          {/* </div> */}
          {/* <div className="footerpop">
            <p>Description<br/>{product.description}</p>
            <div>
              <span>
                <b>Price: </b>
                <strike>Rs.{product.actualPrice}</strike> Rs.
                {product.discountPrice}
              </span>
              <span>Rating: {product.singleRating}</span>
            </div> */}
            <div className="card">
      <img src={product.images?product.images[0]:tv} alt="Denim Jeans" style={{ width: '100%',height:"100%" }} />
      <h1>{product.name}</h1>
      <p className="price"><span>
                <b>Price: </b>
                Rs.{product.sellingPrice} Rs.
                <strike>{product.actualPrice}</strike>
              </span></p>
      <p>
      {product.description}
      </p>
      <p>
      <div><span>Shop Name  </span><span>{shop.name}</span></div>
      <div><span>Shop City  </span><span>{shop.city}</span></div>
      <div><span>Shop Onwer  </span><span>{shop.onwer}</span></div>
      </p>
      <p>
      <div>
              <button className="addToCartPop" onClick={addToCart}>
                Add to cart
              </button>
            </div>
            <div className="updownicon">
              <span onClick={handleIncrease}><TiArrowUpThick /></span>
              <span>{amount}</span>
              <span onClick={handleDecrease}><FaArrowDown /></span>
            </div>
      </p>
    </div>
          </div>
        </div>
      </div>
    </Fragment>,
    document.getElementById("popuproot") // Target root element
  );
};

export default ProductPopUp;
