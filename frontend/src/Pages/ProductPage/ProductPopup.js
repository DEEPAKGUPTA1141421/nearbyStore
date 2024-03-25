import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../styles/sellerPage/ProDuctPopUp.css";
import tv from "../../images/Ecommerce.jpg";
import { TiArrowUpThick } from "react-icons/ti";
import { FaArrowDown } from "react-icons/fa";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,Button, Image, Text, Box } from "@chakra-ui/react";
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
    <Modal isOpen={handleOpen} onClose={handleOpen} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box as="div" cursor="pointer" onClick={handleOpen} fontSize="2rem" position="absolute" top="0.5rem" right="0.5rem"><GiCancel /></Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="div" padding="1rem">
            <Image src={product.images ? product.images[0] : tv} alt="Product" width="100%" height="auto" />
            <Text as="h1" fontSize="2xl" marginTop="1rem">{product.name}</Text>
            <Text as="p" fontSize="lg" marginBottom="1rem">
              {product.description.length < 100 ? product.description : `${product.description.slice(0, 100)}...`}
            </Text>
            <Box as="div" marginBottom="1rem">
              <Text as="span" fontWeight="bold">Price:</Text>
              <Text as="span" marginLeft="0.5rem">Rs.{product.sellingPrice} Rs.<strike>{product.actualPrice}</strike></Text>
            </Box>
            <Box as="div">
              <Text as="div">
                <Text as="span" fontWeight="bold">Shop Name:</Text>
                <Text as="span" marginLeft="0.5rem">{shop.name}</Text>
              </Text>
              <Text as="div">
                <Text as="span" fontWeight="bold">Shop City:</Text>
                <Text as="span" marginLeft="0.5rem">{shop.city}</Text>
              </Text>
              <Text as="div">
                <Text as="span" fontWeight="bold">Shop Owner:</Text>
                <Text as="span" marginLeft="0.5rem">{shop.owner}</Text>
              </Text>
            </Box>
            <Box as="div" marginTop="1rem" marginBottom="1rem">
              <Button onClick={addToCart}>Add to Cart</Button>
            </Box>
            <Box as="div" display="flex" alignItems="center">
              <Button onClick={handleIncrease} marginRight="0.5rem"><TiArrowUpThick /></Button>
              <Text>{amount}</Text>
              <Button onClick={handleDecrease} marginLeft="0.5rem"><FaArrowDown /></Button>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          {/* Add any additional footer elements or buttons here */}
        </ModalFooter>
      </ModalContent>
    </Modal>
    </Fragment>,
    document.getElementById("popuproot") // Target root element
  );
};

export default ProductPopUp;
