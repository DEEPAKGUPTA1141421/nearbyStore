import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../FixedUrl";
import { FaTrash, FaHeart, FaShoppingCart } from "react-icons/fa";
import "./styles/Wishlist.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BackIcon from "../BackIcon";
import { Heading } from "@chakra-ui/react";
const Wishlist = () => {
  const [wishlistItems, setwishlistItems] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useSelector((state) => state.userreducer);
  console.log("user", user);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get(
        `${server}/user/wishlistItems/${user._id}`
      );
      console.log("data check", data.wishItems);
      if (data.success) {
        setwishlistItems(data.wishItems);
        toast.success("Your  Wishlist items ");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleMovetoCart = async (id) => {
    const productId = id;
    console.log(productId);

    try {
      const { data } = await axios.post(
        `${server}/user/wishlistToCart/${user._id}/${productId}`
      );
      console.log(data);
      if (data.success) {
        setwishlistItems((prevWishlist) =>
          prevWishlist.filter((product) => product.productId.id !== productId)
        );
        fetchItems();
        toast.success("Your  item has been moved to cart ");
      } else {
        alert("item already in cart");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
    setIsMounted(true);
  }, []);

  const deleteItemFromWishlist = async (id) => {
    const productId = id;
    console.log(productId);

    try {
      const { data } = await axios.delete(
        `${server}/user/removefromwishlist/${user._id}/${productId}`
      );
      console.log(data);
      if (data.success) {
        setwishlistItems((prevwishlist) =>
          prevwishlist.filter((product) => product.productId.id !== productId)
        );

        fetchItems();
        toast.success("Your   items has deleted from wishlist ");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <BackIcon/>
      {isMounted && (
        <div className="main-container">
          <div className="wishlist-heading">
            <Heading textAlign="center">Wishlist</Heading>
          </div>
          <div className="wishlist-page">
            {wishlistItems.length==0&&<Heading style={{margin:"0px auto"}} color="green">No Product  In The WishList</Heading>}
            {wishlistItems &&
              wishlistItems.length > 0 &&
              wishlistItems.map((product) => (
                <div key={product.productId._id} className="wishlist-item">
                  <div className="product-image">
                    <img
                      src={product.productId.images[0]}
                      alt={product.productId.name}
                    />
                  </div>
                  <div className="product-desc">
                    <div>
                      <h2>
                        <b>{product.productId.name}</b>
                      </h2>
                    </div>
                    <div className="eve">
                      <p>
                        Rs.
                        {product.productId.discountPrice}{" "}
                        <strike>Rs.{product.productId.actualPrice}</strike>
                      </p>
                    </div>

                    <div className="footer-div">
                      <div>
                        <button
                          className="cart-btn"
                          onClick={() =>
                            handleMovetoCart(product.productId._id)
                          }
                        >
                          Move To Cart &nbsp;
                          <FaShoppingCart />
                        </button>
                      </div>

                      <div>
                        <button
                          className="remove-btn"
                          onClick={() =>
                            deleteItemFromWishlist(product.productId._id)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
