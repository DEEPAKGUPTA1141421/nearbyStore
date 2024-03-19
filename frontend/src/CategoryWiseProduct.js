import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import './Pages/styles/Product.css'
import { useSelector } from "react-redux";
import SingleProductCard from "./Pages/ProductPage/SingleProductCard";
import { useParams } from "react-router-dom";
import MultiVendorWebsite from "./Pages/CategoryHeader";
import { server } from "./FixedUrl";

const CategoryWiseProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  console.log(category.split("=")[1]);
  const[currCategory,setCurreCategory]=useState(category.split("=")[1]);
  const fetchData = async () => {
    try {
      const {data} = await axios.get(`${server}/product/search`, {
      params: {
        category: currCategory
      }
    });
      console.log("data",data);
      if(data.success){
        console.log(data.products);
        setProducts(data.products);
      }
      else{
        console.log("error");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      {products&&products.length==0&&<h1 style={{textAlign:"center",color:"red",position:"relative",top:"50%"}}>No Product Of This Category</h1>}
        <div>
          {products&&products.length>0&&<h1 className="productpageHeading">All Products</h1>}
          <div className="product-page">
            {products&&products.length>0&&products.map((product, index) => (
              <SingleProductCard product={product} key={index} />
            ))}
          </div>
        </div>
    </Fragment>
  );
};
export default CategoryWiseProduct;