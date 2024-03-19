import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {useParams} from "react-router-dom";
import axios from 'axios';
import { server } from '../../FixedUrl';
import { toast } from 'react-toastify';
import SingleProductCard from "../ProductPage/SingleProductCard";
const ShopPages = () => {
    const {shopId}=useParams();
    const[product,setProduct]=useState([]);
    const[shopName,setShopName]=useState([]);
    const fetchdata=async()=>{
        try {
            const { data } = await axios.get(`${server}/shop/getAllProductforuser/${shopId}`);
            console.log("data",data);
            if (data.success) {
                toast.success(data.message);
                setProduct(data.productToReturn);
                setShopName(data.nameofShop);
            } else {
                toast.error("can't get the product");
            }
        } catch(error) {
            console.log("Error while loading seller products:", error.message);
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        fetchdata();
        console.log("product",product);
    },[]);
  return (
    <>
    <h1 style={{textAlign:"center"}}>Welcome To {shopName}</h1>
    {product&&product.length==0?<h1 style={{textAlign:"center"}}>No Items Are Present for this shop</h1>:<h1 style={{textAlign:"center"}}>List Of All The Product</h1>}
    {product&&product.length>0&&product.map((prod)=>(
        <SingleProductCard product={prod}/>
    ))}
    </>

  )
}

export default ShopPages