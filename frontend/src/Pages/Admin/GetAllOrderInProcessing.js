import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '../../FixedUrl';
import "../styles/sellerPage/Dashboard.css";
import handm from "../../images/handm.png";
import { Button } from '@chakra-ui/react';
import {toast} from "react-toastify";
const GetAllOrderInProcessing = () => {
    const[allorder,setAllOrder]=useState();
    const loadorder=async()=>{
        const formdata=new FormData();
        const axiosConfig = {
            withCredentials: true, // Store cookies
            
          };
        const{data}=await axios.get(`${server}/admin/get`,axiosConfig);
        console.log(data);
        if(data.success){
            console.log(data.processingOrders);
            setAllOrder(data.processingOrders);
        }
        else{
            alert("hello error");
        }
    }
    const allocateorder=async(trackingid)=>{
        try{
            const { data } = await axios.post(`${server}/admin/allocateOrder/${trackingid}`);
            console.log("check",data);
        if(data.success){
            console.log("success");
            loadorder();
            toast.success("Allocated To Admin");
        }
        else{
            console.log("failed");
        }
        }
        catch(err){
            console.log(err.message);
        }
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
      }
    useEffect(()=>{
        loadorder();
    },[]);
  return (
    <div>
        <h1 style={{textAlign:"center",color:"red"}}>All Orders In Processing</h1>
        <div className="left-top">
          {/* Your content for left-top section */}
          <table className="orders-table">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Selling Price</th>
            <th>Order Status</th>
            <th>Order Date</th>
            <th>Allocate Product</th>
          </tr>
        </thead>
        <tbody>
          {allorder&&allorder.length==0&&<h1 style={{textAlign:"center",color:"red"}}>Loading Proceesing Order</h1>}
          {allorder&&allorder.length>0&&allorder.map((order,index) => (
            <tr key={index}>
              <td>
                {/* <img src={handm} alt="productphoto"/> */}
                {order.productId.images.length>0&&<img src={order.productId.images[0]}/>}
                {order.productId.images.length==0&&<img src={handm} alt="productphoto"/>}
              </td>
              <td>{order.productId.name}</td>
              <td>{order.productId.sellingPrice}</td>
              <td>{order.status}</td>
              <td>{formatDate(order.createdAt)}</td>
              <td><Button colorScheme='red' onClick={() => allocateorder(order._id)}>AllocateToRider</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    </div>
  )
}

export default GetAllOrderInProcessing