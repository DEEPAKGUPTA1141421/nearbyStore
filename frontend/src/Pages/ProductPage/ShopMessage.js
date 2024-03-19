import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../FixedUrl";
import { toast } from "react-toastify";
const ShopMessage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { shopId } = useParams();
  console.log(shopId);
  const createChat = async () => {
    try {
      const axiosConfig = {
        withCredentials: true, // Store cookies
        // ContentType: 'application/data' // Handle application/data responses
      };
      const { data } = await axios.get(
        `${server}/chat/accesschat/${shopId}`,
        axiosConfig
      );
      console.log("data check",data);
      if (data.success) {
        toast.success("Success In Creating The chat");
        navigate("/inbox");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    createChat();
    setIsLoading(false);
  }, []);
  return (
    <div>
      { (
        <div>
          <h1 style={{textAlign:"center",color:"red"}}>Redirecting You To Chat Chat With Seller</h1>
        </div>
      )}
    </div>
  );
};

export default ShopMessage;
