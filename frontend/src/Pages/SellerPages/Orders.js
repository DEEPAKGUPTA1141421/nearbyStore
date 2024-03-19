import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../FixedUrl";
import { toast } from "react-toastify";
import SingleOrderList from "./SingleOrderList";
const Orders = () => {
  const [allorder, setAllorder] = useState([]);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${server}/shop/getallorderofshop/65c89e49776c9d6a9ba2b14e`
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
    <div>
      {allorder.length > 0 &&
        allorder.map((order) => <SingleOrderList order={order} />)}
    </div>
  );
};

export default Orders;
