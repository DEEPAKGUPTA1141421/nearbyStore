import React from 'react';
import tanishq from "../../images/Tanishq.webp";
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import "../styles/SingleProduct.css";
const SingleShop = (shop) => {
    console.log("shop",shop,shop.shop);
  return (
    <div style={{display:"flex",flexWrap:"wrap"}}>
        <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{display:"flex"}}>
            <img src={shop.shop.imageofshop} style={{height:"20rem" ,width:"100%"}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-around"}}>
            <div>shop Name{shop.shop.shopname}</div>
            <div>shop Owner name{shop.shop.ownername}</div>
            <div>Category{shop.shop.category}</div>
        </div>
        <div style={{display:"flex",justifyContent:"space-around"}}>
            <div>Product Count{shop.shop.productId.length}</div>
            <div>shop Address{shop.shop.address.city}</div>
            <div>How Old The Shop {shop.shop.createdAt}</div>
        </div>
        </div>
    </div>
  );
};
export default SingleShop;
