import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { loaduser } from '../../actions/userAction';
import { loadcartitem } from '../../actions/cartAction';
import { server } from '../../FixedUrl';
import {toast} from "react-toastify";
import axios from 'axios';
const SuccessSection = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reference = params.get('reference');
  useEffect(()=>{
    toast.success("Order created successfully.");
  },[]);
//   const[subtotal,setSubTotal]=useState(0);
//   const[shippingcharge,setShippingCharge]=useState(0);
//   const[discount,setDiscount]=useState(0);
//   const[total,setTotal]=useState(0);
//   const dispatch=useDispatch();
//   const navigate=useNavigate();
//   const {user}=useSelector((state)=>state.userreducer);
//   const[isMounted,setIsMounted]=useState(true);
//   const {cartitem}=useSelector((state)=>state.cartreducer);
//   console.log("cartitem",cartitem);
//   const shippingInfo=JSON.parse(localStorage.getItem("shippingInfo")); 
//   const createOrder = async () => {
//     console.log("1");
//     try {
//         const axiosConfig = {
//             withCredentials: true
//         };
//         const formdata = new FormData();
//         console.log("2");
//         formdata.append("shippingInfo", JSON.stringify(shippingInfo));
//         let orderItemsobj = [];
//         for (let i = 0; i < cartitem.length; i++) {
//             const item = cartitem[i];
//             let obj = {};
//             obj.name = item.productId.description;
//             obj.price = item.productId.sellingPrice;
//             obj.Quantity = 1;
//             obj.image = item.productId.images;
//             obj.product = item.productId._id;
//             orderItemsobj.push(obj);
//         }
//         console.log("3");
//         console.log("finalcheck", orderItemsobj);
//         for (let i = 0; i < orderItemsobj.length; i++) {
//             const item = orderItemsobj[i];
//             for (const key in item) {
//                 formdata.append(`orderItems[${i}][${key}]`, item[key]);
//             }
//         }
//         const paymentobj = {"id": "online"};
//         formdata.append("paymentInfo", JSON.stringify(paymentobj));
//         formdata.append("itemsPrice", subtotal);
//         formdata.append("taxPrice", 0);
//         formdata.append("shippingPrice", shippingcharge);
//         formdata.append("totalPrice", total);
//         formdata.append("orderStatus","processing");
//         console.log("4");
//         console.log("5",subtotal,shippingcharge,);
//         const { data } = await axios.post(`${server}/order/create`, formdata, axiosConfig);
      
//         // Handle response
//         console.log("Response check by deepak:", data);
//         if (data.success) {
//             toast.success("Order created successfully.");
//             console.log("6");
//             const { data: clearCartData } = await axios.get(`${server}/user/clearcart`, axiosConfig);
//             if (clearCartData.success) {
//                 toast.success("Cart cleared successfully.");
//                 // navigate("/");
//             } else {
//                 toast.error("Failed to clear cart.");
//             }
//         } else {
//             console.log("7");
//             toast.error("Failed to create order.");
//         }
//     } catch (error) {
//         console.log("8");
//         console.error("Error:", error);
//         toast.error("Error creating order.");
//     }
// };

  
  
//   const calcuateData = () => {
//     let newShippingCharge = 0;
//     let newDiscount = 0;
//     let newSubTotal = 0;
//     console.log("cartitem sum check",cartitem);
//     for (let i = 0; i < cartitem.length; i++) {
      
//         newShippingCharge += 80;
//         newDiscount += cartitem[i].productId.discountPrice;
//         newSubTotal += cartitem[i].productId.actualPrice
      
//     }
  
//     setShippingCharge(newShippingCharge);
//     setDiscount(newDiscount);
//     setSubTotal(newSubTotal);
//     setTotal(newSubTotal - newDiscount + newShippingCharge);
//   }
//   useEffect(() => {
//     if (isMounted==true) {
//         console.log("loadcartitem");
//         dispatch(loadcartitem());
//         setIsMounted(false);
//     } else {
//         calcuateData();
//         createOrder(); 
//     }
// }, [isMounted]);
const navigate=useNavigate();
const handlehome=()=>{
  toast.success("Bakc To Home Page");
  navigate("/");
}

  return (
  //   <div>
  //   <h1>Payment Success</h1>
  //   <p>Reference: {reference}</p>
  // </div>
  <>
  <button onClick={handlehome}>backToHome</button>
  <div className="w-screen flex items-center justify-center h-screen bg-gray-200"
  style={{
    backgroundImage: "url('https://cdn1.vectorstock.com/i/1000x1000/70/70/payment-successful-website-landing-page-vector-26627070.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
  >
      <div className="card bg-white p-12 rounded-lg shadow-md"
      style={{width:"100vw"}}
      >
        <div className="rounded-full h-48 w-48 bg-gray-100 flex items-center justify-center mx-auto">
          <i className="text-green-500 text-6xl">✓</i>
        </div>
        <h1 className="text-green-600 font-bold text-4xl my-6">Success</h1>
        <p className="text-gray-700 font-medium text-xl">
          You Succesfully Order  Your  product <br /> we'll be in meet again shortly!
        </p>
        <p className="text-gray-700 font-medium text-xl">
           <h1 className="text-green-600 font-bold text-4xl my-6">Payment Success</h1>
           <p>Reference: {reference}</p>
        </p>
      </div>
    </div>
  </>
  )
}

export default SuccessSection;
