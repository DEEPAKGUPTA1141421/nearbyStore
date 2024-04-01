import React, { useEffect, useState,Fragment } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../FixedUrl";
import { toast } from "react-toastify";
import SingleProductCard from "../ProductPage/SingleProductCard";
import ProductOfShop from "./ProductOfShop";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  Checkbox,
  Input,
  Stack,
  Box
} from "@chakra-ui/react";
import BackIcon from "../../BackIcon";
const ShopPages = () => {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    latest: false,
    asc: false,
    desc: false,
    rating: false,
  });
  const [isAscending, setIsAscending] = useState(filters.asc);
  const [isdescending, setIsdescending] = useState(filters.desc);
  const { shopId } = useParams();
  const [product, setProduct] = useState([]);
  const[originalProduct,setOriginalProduct]=useState([]);
  const [shopName, setShopName] = useState([]);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    let sortedProducts = [...originalProduct]; // Create a new array instance

    if (filters.asc) {
      sortedProducts = sortedProducts.sort((a, b) => a.sellingPrice - b.sellingPrice);
    }
    if (filters.desc) {
      sortedProducts = sortedProducts.sort((a, b) => b.sellingPrice - a.sellingPrice);
    }
    if (filters.latest) {
      sortedProducts = sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (filters.rating) {
      sortedProducts = sortedProducts.sort((a, b) => b.totalRating - a.totalRating);
    }
    if (filters.from && filters.to) {
      const fromPrice = parseFloat(filters.from);
      const toPrice = parseFloat(filters.to);
      sortedProducts = sortedProducts.filter(product => {
        const productPrice = parseFloat(product.sellingPrice);
        return productPrice >= fromPrice && productPrice <= toPrice;
      });
    }
  
    setProduct(sortedProducts);
    // try {
    //   const { data } = await axios.get(
    //     `http://localhost:8000/api/v1/product/search`,
    //     {
    //       params: {
    //         asc: filters.asc,
    //         desc: filters.desc,
    //         rating: filters.rating,
    //         latest: filters.latest,
    //         from: filters.from,
    //         to: filters.to,
    //       },
    //     }
    //   );
    //   // /search?searchTerm=${searchText}&asc=${filters.asc}&desc=${filters.desc}&rating=${filters.rating}&latest=${filters.latest}&from=${filters.from}&to=${filters.to}`
    //   // );

    //   console.log("filtered products are ", data.products);

    //   if (data.success) {
    //   }
    // } catch (error) {
    //   console.error("Error fetching products:", error);
    // }
  };
  const handleCheckboxChange = (filterName) => {
    setFilters((prevFilters) =>({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const fetchdata = async () => {
    try {
      const { data } = await axios.get(
        `${server}/shop/getAllProductforuser/${shopId}`
      );
      console.log("data", data);
      if (data.success) {
        toast.success(data.message);
        setProduct(data.productToReturn);
        setOriginalProduct(data.productToReturn);
        setShopName(data.nameofShop);
      } else {
        toast.error("can't get the product");
      }
    } catch (error) {
      console.log("Error while loading seller products:", error.message);
      toast.error(error.message);
    }
  };
  const handlehome = () => {
    navigate("/");
  };
  useEffect(() => {
    fetchdata();
    console.log("product", product);
  }, []);
  return (
    <Fragment>
      <Heading textColor="green" style={{ textAlign: "center" }}>
         Welcome To {shopName}
       </Heading>
      <Stack spacing={4} direction="column" className="sidebar">
        <h3>Filters</h3>
        <Checkbox
          checked={filters.latest}
          onChange={() => handleCheckboxChange("latest")}
        >
          Latest
        </Checkbox>
        <Checkbox
          disabled={isdescending}
          checked={filters.asc}
          onChange={() =>{ setIsAscending(!isAscending);handleCheckboxChange("asc")}}
        >
          Ascending
        </Checkbox>
        <Checkbox 
          disabled={isAscending}
          checked={filters.desc}
          onChange={() => {setIsdescending(!isdescending);handleCheckboxChange("desc")}}
        >
          Descending
        </Checkbox>
        <Checkbox
          checked={filters.rating}
          onChange={() => handleCheckboxChange("rating")}
        >
          Rating
        </Checkbox>
        <Box>
          <label>
            From:
            <Input
              type="number"
              name="from"
              value={filters.from}
              onChange={handleInputChange}
            />
          </label>
          <label>
            To:
            <Input
              type="number"
              name="to"
              value={filters.to}
              onChange={handleInputChange}
            />
          </label>
        </Box>
        <Button onClick={fetchProducts} colorScheme="red">Apply Filters</Button>
      </Stack>
      <Box className="content">
        <div className="shop-product-page">
          {product && product.length === 0 ? (
            <h1>No Product in The List</h1>
          ) : (
           product&&product.length>0&& product.map((prod, index) => (
              <SingleProductCard product={prod} key={index} />
            ))
          )}
        </div>
      </Box>
    </Fragment>
  );
};

export default ShopPages;
