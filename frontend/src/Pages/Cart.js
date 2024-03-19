import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../FixedUrl";
import { FaTrash, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles/Cart.css";
import { decreasecount, increasecount, loadcartitem, setcartitem } from "../actions/cartAction";
import { toast } from "react-toastify";
const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  console.log("quanties",quantities);
  console.log(quantities);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {cartitem}=useSelector((state)=>state.cartreducer);
  console.log("cartitem",cartitem);
  const state=useSelector((state)=>state);
  console.log("state",state);
  const handleIncrease = (productId) => {
    console.log("inside increase");
    setQuantities((prevQuantities) =>({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
    dispatch(increasecount(productId));
    
  };

  const handleDecrease = (productId) => {
    console.log("inside decrease");
    if (quantities[productId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
      dispatch(decreasecount(productId));
    }
  };
  useEffect(() => {
    dispatch(loadcartitem());
  },[]);
  useEffect(() =>{
    setCart(cartitem);
  }, [cartitem]);

  const deleteItemFromCart = async (id) => {
    console.log(id);
    const productId = id;
    console.log(productId);

    try {
      const axiosConfig = {
        withCredentials: true
      };
      const { data } = await axios.delete(`${server}/user/removefromcart/${productId}`,axiosConfig);
      console.log(data);
      if (data.success) {
        setCart((prevCart) =>
          prevCart.filter((product) => product.productId.id !== productId)
        );
        dispatch(loadcartitem());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleMoveFromCartToWishlist = async (id) => {
    console.log("handlechhnage");
    const productId = id;
    console.log(productId);
    const axiosConfig = {
      withCredentials: true
    };
    try {
      const { data } = await axios.post(
        `${server}/user/cartToWishlist/${productId}`,axiosConfig);
      console.log("data",data);
      if (data.success) {
        toast.error(data.message);
        setCart((prevCart) =>
          prevCart.filter((product) => product.productId.id !== productId)
        );
      dispatch(loadcartitem());
      } else {
        alert("Item already in wishlist");
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const handleOrderNow = () => {
    const cartWithQuantities = cart.map((product) => ({
      ...product,
      quantity: quantities[product.productId._id] || 1,
    }));
    dispatch(setcartitem(cartWithQuantities));
    // navigate("/placeOrder", { state: { cart: cartWithQuantities } });
    navigate("/placeOrder");
  };

  return (
    <div className="main-container">
      <div className="cart-page">
        {cart&&cart.length>0&&cart.map((product) => (
          <div key={product.productId._id} className="cart-item">
            <div className="product-image">
              <img
                src="https://images.app.goo.gl/jiKPdHCF2SqR1hm17"
                alt={product.productId.name}
              />
            </div>
            <div className="product-desc">
              <div>
                <h2>{product.productId.name}</h2>
              </div>
              <div className="eve">
                <p>
                  Rs.
                  {product.productId.sellingPrice}{" "}
                  <strike>Rs.{product.productId.actualPrice}</strike>
                </p>
              </div>

              <div className="quantity-button">
                <button
                  className="quantity-btn"
                  onClick={() => handleDecrease(product.productId._id)}
                >
                  -
                </button>
                <span className="quantity-display">
                  {quantities[product.productId._id] || 1}
                </span>
                <button
                  className="quantity-btn"
                  onClick={() => handleIncrease(product.productId._id)}
                >
                  +
                </button>
              </div>

              <div>
                <button
                  className="wishlist-btn"
                  onClick={() =>
                    handleMoveFromCartToWishlist(product.productId._id)
                  }
                >
                  Move to Wishlist &nbsp;
                  <FaHeart />
                </button>
              </div>
            </div>
            <div className="delete-btn">
              <div>
                <FaTrash
                  onClick={() => deleteItemFromCart(product.productId._id)}
                />
              </div>
            </div>
          </div>
        ))}
        {cart&&cart.length==0&&<h1>No Product In The Cart</h1>}
        {cart.length > 0 && (
          <button className="order-now-btn" onClick={handleOrderNow}>
            Order Now
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;