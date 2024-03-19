import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProfilePage/OrdersUser.css";
import { useSelector } from "react-redux";

const OrdersUser = () => {
  const [orders, setOrders] = useState([]);
  const[isMounted,setIsMounted]=useState(false);
  const{user}=useSelector((state)=>state.userreducer);
  const fetchOrders = async () => {
    try {
      const axiosConfig = {
        withCredentials: true
      };
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/user/getallorders`,axiosConfig
      );
      setOrders(data.order);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(!isMounted){
      fetchOrders();
      setIsMounted(true);
    }
  }, [isMounted]);

  return (
    <>
    {
      isMounted&&
      <div className="orders-container">
      <h2>Your Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Order Placed Date</th>
            <th>Status</th>
            <th>Price</th>
            <th>Shipping Address</th>
          </tr>
        </thead>
        <tbody>
          {orders&&orders.length>0&&orders.map((order) => (
            <tr key={order.orderId._id}>
              <td>
                {order.orderId.orderItems && order.orderId.orderItems.length > 0
                  ? order.orderId.orderItems[0].name
                  : "N/A"}
              </td>
              <td>{new Date(order.orderId.createdAt).toLocaleString()}</td>
              <td>{order.orderId.orderStatus}</td>
              <td>{order.orderId.totalPrice}</td>
              <td>
                {order.orderId.shippingInfo.address},{" "}
                {order.orderId.shippingInfo.city},{" "}
                {order.orderId.shippingInfo.state},{" "}
                {order.orderId.shippingInfo.country} -{" "}
                {order.orderId.shippingInfo.postalCode}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    }
    </>
  );
};

export default OrdersUser;
