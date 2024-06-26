import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import SingleProductCard from "../ProductPage/SingleProductCard";
import loadingsvg from "../../images/Iphone-spinner-2.gif";
//import SingleProductCard from './SingleProductCard';
import "../styles/ProductPage.css";
import MultiVendorWebsite from "../CategoryHeader";
import { server } from "../../FixedUrl";
import { Flex, Skeleton, Stack } from "@chakra-ui/react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${server}/product/search`
      );
      console.log("data is ", data.products);

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

  return (
    <Fragment>
      <div className="cheader" style={{position:"relative",zIndex: "9999"}}>
        <div style={{margin:"0px auto"}}><MultiVendorWebsite/></div>
      </div>
      {loading ? (
        // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
        //   <path
        //     fill="none"
        //     stroke="#FF156D"
        //     stroke-width="15"
        //     stroke-linecap="round"
        //     stroke-dasharray="300 385"
        //     stroke-dashoffset="0"
        //     d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
        //   >
        //     <animate
        //       attributeName="stroke-dashoffset"
        //       calcMode="spline"
        //       dur="2"
        //       values="685;-685"
        //       keySplines="0 0 1 1"
        //       repeatCount="indefinite"
        //     ></animate>
        //   </path>
        // </svg>
        // <Stack spacing={4} >
        // <Skeleton height='300px' />
        // <Skeleton height='300px' />
        // <Skeleton height='300px' />
        // <Skeleton height='300px' />
        // <Skeleton height='300px' />
        // <Skeleton height='300px' />
        // </Stack>
      <Stack style={{position:"relative",top:"50px",left:"10px",right:"10px"}}>
      <Stack direction="row">
      <Skeleton height='250px' width="500px" />
      <Skeleton height='250px' width="500px" />
      <Skeleton height='250px' width="500px" />
      </Stack>
      <Stack direction="row">
      <Skeleton height='250px' width="500px" />
      <Skeleton height='250px' width="500px" />
      <Skeleton height='250px' width="500px" />
      </Stack>
      <Stack direction="row">
      <Skeleton height='250px' width="500px" />
      <Skeleton height='250px' width="500px" />
      <Skeleton height='250px' width="500px" />
      </Stack>
      <Stack direction="row">
      <Skeleton height='250px' width="500px" />
      <Skeleton height='250px' width="500px" />
      <Skeleton height='250px' width="500px" />
      </Stack>
    </Stack>
      ) : (
        <div>
          <div className="product-page" style={{top:"40px"}}>
            {products.map((product, index) => (
              <SingleProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Products;
