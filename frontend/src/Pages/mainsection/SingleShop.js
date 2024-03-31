import React from 'react';
import tanishq from "../../images/Tanishq.webp";
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import "../styles/SingleProduct.css";
import { Flex, Image, Box, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
const SingleShop = (shop) => {
    console.log("shop",shop,shop.shop);
  return (
    // <div style={{display:"flex",flexWrap:"wrap"}}>
    //     <div style={{display:"flex", flexDirection:"column"}}>
    //     <div style={{display:"flex"}}>
    //         <img src={shop.shop.imageofshop} style={{height:"20rem" ,width:"100%"}}/>
    //     </div>
    //     <div style={{display:"flex",justifyContent:"space-around"}}>
    //         <div>shop Name{shop.shop.shopname}</div>
    //         <div>shop Owner name{shop.shop.ownername}</div>
    //         <div>Category{shop.shop.category}</div>
    //     </div>
    //     <div style={{display:"flex",justifyContent:"space-around"}}>
    //         <div>Product Count{shop.shop.productId.length}</div>
    //         <div>shop Address{shop.shop.address.city}</div>
    //         <div>How Old The Shop {shop.shop.createdAt}</div>
    //     </div>
    //     </div>
    // </div>
    <Flex flexWrap="wrap" pb="20px">
      <Flex flexDirection="column">
        <Flex>
          <Image src={shop.shop.imageofshop} h="20rem" w="100%" />
        </Flex>
        <Flex justifyContent="space-around">
          <Box bg="blue.200" p={2} borderRadius="md">
            <Text>Shop Name: {shop.shop.shopname}</Text>
          </Box>
          <Box bg="green.200" p={2} borderRadius="md">
            <Text>Shop Owner Name: {shop.shop.ownername}</Text>
          </Box>
          <Box bg="yellow.200" p={2} borderRadius="md">
            <Text>Category: {shop.shop.category}</Text>
          </Box>
        </Flex>
        <Flex justifyContent="space-around">
          <Box bg="pink.200" p={2} borderRadius="md">
            <Text>Product Count: {shop.shop.productId.length}</Text>
          </Box>
          <Box bg="purple.200" p={2} borderRadius="md">
            <Text>Shop Address: {shop.shop.address.city}</Text>
          </Box>
          <Box bg="orange.200" p={2} borderRadius="md">
            <Text>How Old The Shop: {shop.shop.createdAt}</Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default SingleShop;
