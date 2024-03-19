import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "../styles/Product.css";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import MultiVendorWebsite from "../CategoryHeader";
import { FaMessage } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";
import { server } from "../../FixedUrl";
const ProductDetails = () => {
  const[colorImages,setColorImages]=useState([
      "https://www.parivarceremony.com/media/catalog/product/cache/62408a38a401bb86dbe3ed2f017b539f/p/2/p2167sr06.jpg",
      "https://assets.shopkund.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/a/c/acu8056-1-printed-weaving-silk-saree-in-pink-sr23494.jpg",
      "https://assets.shopkund.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/a/c/acu8057-1-silk-saree-with-printed-weaving-in-green-sr23495.jpg",
  ]);
  const { productid } = useParams();
  console.log(productid);
  const { user } = useSelector((state) => state.userreducer);
  const userName = user.fullname;
  const navigate = useNavigate();
  useSelector((state) => {
    console.log(state);
  });

  const [mainImage, setMainImage] = useState(
    "https://www.parivarceremony.com/media/catalog/product/cache/62408a38a401bb86dbe3ed2f017b539f/p/2/p2167sr06.jpg"
  );

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    actualPrice: "",
    discountPrice: "",
  });
  const [shopId, setShopId] = useState();
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [ownerName, setOwnerName] = useState();
  const [rating, setRating] = useState();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("user", user._id);
    formData.append("comment", comment);
    formData.append("name", userName);
    const { data } = await axios.post(
      `${server}/user/addcomment/${productid}`,
      formData
    );
    console.log("data is ", data);
    console.log(comment);
    fetchData();
    setComment("");
  };

  const handleSubmitRating = async () => {
    try {
      const formData = new FormData();
      console.log(rating);
      formData.append("user", user._id);
      formData.append("singleRating", rating);
      const { data } = await axios.post(
        `${server}/user/addrating/${productid}`,
        formData
      );
      console.log("data is ", data);
      fetchData();

      console.log("rating doneeeeeeeeeeeeeeeeeeeeeeeeeeeeee ");

      const { data2 } = await axios.get(
        `${server}/product/totalrating/${productid}`
      );
      console.log("new total rating is ", data2);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   fetchTotalRating();
  // }, []);
  const changeMainImage = (newImage) => {
    setMainImage(newImage);
  };

  const handleRatingChange = (rating) => {
    console.log(rating);
    setRating(rating);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${server}/product/get/${productid}`
      );

      const productDetails = data.product;
      console.log(productDetails);
      setEmail(productDetails.shopId.email);
      setCity(productDetails.shopId.city);
      setState(productDetails.shopId.state);
      setCountry(productDetails.shopId.country);
      setOwnerName(productDetails.shopId.ownername);
      setContact(productDetails.shopId.contact);
      if(productDetails.images){
        setColorImages(productDetails.images);
      }
      if (productDetails.reviews) {
        setReviews(productDetails.reviews);
      }
      setShopId(productDetails.shopId);
      setProduct({
        name: productDetails.name,
        description: productDetails.description,
        actualPrice: productDetails.actualPrice,
        discountPrice: productDetails.discountPrice,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMessageSeller = () => {
    navigate(`/messageseller/${shopId}`);
  };
  const addToCart = async () =>{
    const productId = productid;

    try {
      const { data } = await axios.post(
        `${server}/user/cart/${user._id}/${productId}`
      );
      console.log(data);
      if (data.success) {
        toast.success("Added To Cart");
      } else {
        toast.error("Item already in cart");
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div style={{ position: "relative" }}>
        <MultiVendorWebsite />
      </div>

      <div className="container">
        <div className="images">
          <div className="images-container">
            <img src={mainImage} alt="Product Image" />
          </div>
          <div className="color-options-container">
            {colorImages.map((color, index) => (
              <div className="color-images">
                <img
                  key={index}
                  src={color}
                  alt={`Color Option ${index + 1}`}
                  onClick={() => changeMainImage(color)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="details-container">
          <div className="product-title">{product.name}</div>
          <div className="product-description">{product.description}</div>
          <div className="price">
            <strike className="actualPrice">Rs. {product.actualPrice}</strike>
            <span className="discountPrice">Rs. {product.discountPrice}</span>
          </div>

          <div className="quantity-button">
            <button className="quantity-btn" onClick={handleDecrease}>
              -
            </button>
            <span className="quantity-display">{quantity}</span>
            <button className="quantity-btn" onClick={handleIncrease}>
              +
            </button>
          </div>

          <button className="add-to-cart-btn">
            <span onClick={addToCart}>Add to Cart</span> <FaShoppingCart />
          </button>
          <button className="add-to-cart-btn" onClick={handleMessageSeller}>
          <span>Message Seller</span>
  <FaMessage />

          </button>
        </div>
      </div>

      <div className="product-reviews">
        <h2>Product Reviews</h2>
        {reviews.length > 0
          ? reviews.map((review, index) => (
              <div key={index} className="review-item">
                <p>{review.comment}</p>
                <p>Rating: {review.rating}</p>
              </div>
            ))
          : "No reviews yet !!"}
      </div>

      <div className="add-review-form">
        <h2>Add a Review</h2>
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={handleSubmit}>Submit Review</button>
      </div>

      <div className="add-rating-form">
        <h2>Rate the product</h2>
        {/* <label>Rating: </label> */}
        {/* <input type="number" onChange={(e) => setRating(e.target.value)} /> */}
        <ReactStars
          count={5}
          onChange={handleRatingChange}
          size={24}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
        <button onClick={handleSubmitRating}>Submit Rating</button>
      </div>

      <div className="seller-info">
        <p>{email}</p>
        <p>{ownerName}</p>
        <p>{contact}</p>
        <p>
          {city}
          {state}
          {country}
        </p>
      </div>
    </>
  );
};

export default ProductDetails;
