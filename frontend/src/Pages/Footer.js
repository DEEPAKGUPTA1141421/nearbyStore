import React from "react";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./styles/Footer.css"; // Import your custom CSS file
import { Box, Button, Input, Text } from '@chakra-ui/react'
import { Typography } from "@material-tailwind/react";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="subscribe-section">
        <h1>Subscribe us for news, events, and offers</h1>
        <div className="subscribe-input">
          <Input type="email" required placeholder="Enter your email..." />
          <Button>Submit</Button>
        </div>
      </div>
      <div className="footer-links-container">
        <ul className="logo-section">
          <Box>
          <Typography colorScheme="whatsapp">Empower Your Business: Join Our Thriving Multivendor Marketplace Today!</Typography>
          <Typography colorScheme="whatsapp">Discover Limitless Opportunities: Expand Your Reach with Our Multivendor Platform</Typography>
          <Typography colorScheme="whatsapp">Unleash Your Potential: Showcase Your Products on Our Multivendor Ecommerce Hub.</Typography>
          <Typography colorScheme="whatsapp">Elevate Your Sales: Partner with Us to Access a Diverse Audience of Shoppers.</Typography>
          <Typography colorScheme="whatsapp">Transform Your Business: Harness the Power of Collaboration on Our Multivendor Marketplace.</Typography>
          </Box>
          <div className="social-icons">
            <AiFillFacebook size={25} />
            <AiOutlineTwitter size={25} />
            <AiFillInstagram size={25} />
            <AiFillYoutube size={25} />
          </div>
        </ul>
        
      </div>
      <div className="bottom-section">
        <span>© 2020 Ecommerce. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="payment-icons">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
