import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../FixedUrl";
import { toast } from "react-toastify";
import SingleOrderList from "./SingleOrderList";
import { useSelector } from "react-redux";
const Orders = () => {
  const {shop}=useSelector((state) => state.sellerreducer);
  console.log("state",shop);
  const [allorder, setAllorder] = useState([]);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${server}/shop/getallorderofshop/${shop._id}`
      );
      console.log(data);
      if (data.success) {
        setAllorder(data.order);
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <div>
      {allorder.length > 0 &&
        allorder.map((order) => <SingleOrderList order={order} />)}
    </div>
    <h1>All Orderds</h1>
    </>
  );
};

export default Orders;
