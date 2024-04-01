import { Carousel, Typography, Button } from "@material-tailwind/react";
import clothing from "../../images/clothing.jpg";
import grocery from "../../images/grocery.jpg";
import jewellary from "../../images/jewellary.webp";
import electrnics from "../../images/mumbaishop.jpg";
import pepejeans from "../../images/pepejeans.webp";
import "../styles/Crousel.css";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { Box, Text } from "@chakra-ui/react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Input,
} from "@chakra-ui/react";
import { server } from "../../FixedUrl";
import axios from "axios";
const Crousel = () => {
  return (
    <AwesomeSlider style={{height:"85vh"}}>
    <div data-src='https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?cs=srgb&dl=pexels-karolina-grabowska-5632371.jpg&fm=jpg' />
    <div data-src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709596800&semt=ais" />
    <div data-src="https://img.freepik.com/premium-vector/background-with-colorful-shopping-bags-vector-illustration-sale-discount-concept_653240-59.jpg" />
    <div data-src="https://st4.depositphotos.com/12985790/25316/i/450/depositphotos_253164172-stock-photo-cropped-view-young-woman-holding.jpg"/>
    <div data-src="https://t4.ftcdn.net/jpg/02/70/41/97/360_F_270419713_kNsOeqrG91dwy5qtbWxQCbUZrCAAwLIX.jpg"/>
  </AwesomeSlider>
  );
};
export default Crousel;
