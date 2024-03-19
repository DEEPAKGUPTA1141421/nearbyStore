import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux";
import "../styles/Order/Shipping.css";
import axios from 'axios';
import { server } from '../../FixedUrl';
import { toast } from 'react-toastify';
const PaymentSection = () => {
  const{user}=useSelector((state)=>state.userreducer);
  const[subtotal,setSubTotal]=useState(0);
  const[shippingcharge,setShippingCharge]=useState(0);
  const[discount,setDiscount]=useState(0);
  const[total,setTotal]=useState(0);
  const{cartitem,cartitemqty}=useSelector((state)=>state.cartreducer);
  const calcuateData = () => {
    let newShippingCharge = 0;
    let newDiscount = 0;
    let newSubTotal = 0;
  
    for (let i = 0; i < cartitem.length; i++) {
      for(let j=0;j<cartitemqty[i].count;j++){
        newShippingCharge += 80;
        newDiscount += cartitem[i].productId.discountPrice;
        newSubTotal += cartitem[i].productId.actualPrice;
      }
    }
    setShippingCharge(newShippingCharge);
    setDiscount(newDiscount);
    setSubTotal(newSubTotal);
    setTotal(newSubTotal - newDiscount + newShippingCharge);
  }
  const handleCashOnDeliveryPayment=()=>{

  }
  const handleOnlinePayment=async()=>{
    toast.success("inside");
    const formdata=new FormData();
    formdata.append("amount",total);
    const {data:getkeydata}=await axios.get(`${server}/payment/getkey`);
    const {data:getcheckoutdata}=await axios.post(`${server}/payment/checkout`,formdata);
    try {
        const axiosConfig = {
            withCredentials: true
        };
        const formdataorder = new FormData();
        console.log("2",JSON.parse(localStorage.getItem("shippingInfo")).address);
        // formdataorder.append("shippingInfo",JSON.stringify(localStorage.getItem("shippingInfo")));
        formdataorder.append("address",JSON.parse(localStorage.getItem("shippingInfo")).address);
        formdataorder.append("city",JSON.parse(localStorage.getItem("shippingInfo")).city);
        formdataorder.append("state",JSON.parse(localStorage.getItem("shippingInfo")).state);
        formdataorder.append("country",JSON.parse(localStorage.getItem("shippingInfo")).country);
        formdataorder.append("contactNumber",JSON.parse(localStorage.getItem("shippingInfo")).contactNumber);

        let orderItemsobj = [];
        for (let i = 0; i < cartitem.length; i++) {
            const item = cartitem[i];
            let obj = {};
            obj.name = item.productId.description;
            obj.price = item.productId.sellingPrice;
            obj.Quantity = 1;
            obj.image = item.productId.images;
            obj.product = item.productId._id;
            orderItemsobj.push(obj);
        }
        console.log("3");
        console.log("finalcheck", orderItemsobj);
        // for (let i = 0; i < orderItemsobj.length; i++) {
        //     const item = orderItemsobj[i];
        //     for (const key in item) {
        //         formdata.append(`orderItems[${i}][${key}]`, item[key]);
        //     }
        // }
        const paymentobj = {"id": "online"};
        formdataorder.append("orderItems",JSON.stringify(orderItemsobj));
        formdataorder.append("paymentInfo", JSON.stringify(paymentobj));
        formdataorder.append("itemsPrice", subtotal);
        formdataorder.append("taxPrice", 0);
        formdataorder.append("shippingPrice", shippingcharge);
        formdataorder.append("totalPrice", total);
        formdataorder.append("orderStatus","processing");
        console.log("4");
        console.log("5",subtotal,shippingcharge,);
        const { data } = await axios.post(`${server}/order/create`, formdataorder, axiosConfig);
      
        // Handle response
        console.log("Response check by deepak:", data);
        if (data.success) {
            console.log("6");
            // const { data: clearCartData } = await axios.get(`${server}/user/clearcart`, axiosConfig);
            // if (clearCartData.success) {
            //     toast.success("Cart cleared successfully.");
            //     // navigate("/");
            // } else {
            //     toast.error("Failed to clear cart.");
            // }
        } else {
            console.log("7");
            toast.error("Failed to create order.");
        }
    } catch (error) {
        console.log("8");
        console.error("Error:", error);
        toast.error("Error creating order.");
    }
    if(getcheckoutdata.success){
      toast.success("wow Done");
      const options = {
        key:getkeydata.key,
        amount: getcheckoutdata.order.amount,
        currency: "INR",
        name: "Surbhi Kuhar",
        description: "Payment RazorPay Verification",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: getcheckoutdata.order.id,
        callback_url: `${server}/payment/paymentVerification`,
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
      };
      const razor=new window.Razorpay(options);
      razor.open();
    }
    else{
      toast.error("checkout Order has not Created");
    }
  }
  useEffect(()=>{
    calcuateData();
  },[total]);
  return (
    <>
    <div className="total">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-item">
              <span>Shipping Charges:</span>
              <span>₹{shippingcharge}</span>
            </div>
            <div className="summary-item">
              <span>Discount:</span>
              <span>-₹{discount}</span>
            </div>
            <hr />
            <div className="summary-item total">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
            <div className="apply">
               <button onClick={handleOnlinePayment}>Pay Now</button>
             </div>
             <div >
              <button onClick={handleCashOnDeliveryPayment}>Cash On Delivery</button>
             </div>
            {/* <div className="coupon">
              <input onChange={(e)=>setCoupon(e.target.value)}  className="coupon-code" placeholder="Coupon Code" />
            </div>

            // <div className="apply">
            //   <button className="apply-code-btn" onClick={handleCouponDiscount}>Apply Code</button>
            // </div> */}
          </div>
        </div>
    </>
  )
}

export default PaymentSection
