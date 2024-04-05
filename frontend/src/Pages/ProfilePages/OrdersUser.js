import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProfilePage/OrdersUser.css";
import { useSelector } from "react-redux";
import { server } from "../../FixedUrl";
import handm from "../../images/handm.png";
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
        `${server}/user/getallorders`,axiosConfig
      );
      console.log("order checkk",data);
      // const pro=[];
      // for(let i=0;i<data.order.length;i++){
      //   for(let j=0;j<data.order[i].orderItems.length;j++){
      //     pro.push(data.order[i].orderItems[j]);
      //   }
      // }
      // console.log("pro",pro);
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
            <th>order Image</th>
            <th>Product Name</th>
            <th>Order Placed Date</th>
            <th>Status</th>
            <th>Price</th>
            <th>Shipping Address</th>
          </tr>
        </thead>
        <tbody>
          {orders&&orders.length>0&&orders.map((order) => (
            <tr key={order._id}>
              <td>
                <img src={handm} alt="orderimage"/>
              </td>
              <td>
                {order&& order.orderItems.length > 0
                  ? order.orderItems[0].name.substring(0,30)
                  : "N/A"}
              </td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{order.orderStatus}</td>
              <td>{order.totalPrice}</td>
              <td>
                {order.shippingInfo.address},{" "}
                {order.shippingInfo.city},{" "}
                {order.shippingInfo.state},{" "}
                {order.shippingInfo.country} -{" "}
                {order.shippingInfo.postalCode}
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
