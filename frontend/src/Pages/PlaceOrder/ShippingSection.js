import React, { useEffect, useState } from "react";
import "../styles/Order/Shipping.css";
import { useSelector } from "react-redux";
import { discountarray } from "../StaticData";
import { toast } from 'react-toastify';
import { json } from "react-router-dom";
const ShippingSection = ({handleSectionChange}) => {
  const{user}=useSelector((state)=>state.userreducer);
  console.log("user shipping info",user);
  const[coupon,setCoupon]=useState();
  const[countofdiscount,setCountOfDiscount]=useState(0);
  const {cartitem,cartitemqty}=useSelector((state)=>state.cartreducer);
  console.log("placeorder",cartitem,cartitemqty);
  const[subtotal,setSubTotal]=useState(0);
  const[shippingcharge,setShippingCharge]=useState(0);
  const[discount,setDiscount]=useState(0);
  const[total,setTotal]=useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    country: "india",
    address: "",
    email:"",
    postalCode: "",
    city: "",
    state: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const isFormValid = () =>{
    for (const key in formData) {
      if (!formData[key]) {
        return false; // Return false if any property is empty
      }
    }
    return true; // Return true if all properties are non-empty
  };
  const calcuateData = () => {
    console.log("1",cartitem);
    let newShippingCharge = 0;
    let newDiscount = 0;
    let newSubTotal = 0;
    console.log("2");
    for (let i = 0; i < cartitem.length; i++) {
        for(let j=0;j<cartitemqty[i].count;j++){
          newShippingCharge += 80;
          newDiscount += cartitem[i].productId.discountPrice;
          newSubTotal += cartitem[i].productId.actualPrice;
        }
    }

    console.log("3");
    setShippingCharge(newShippingCharge);
    setDiscount(newDiscount);
    setSubTotal(newSubTotal);
    setTotal(newSubTotal - newDiscount + newShippingCharge);
    console.log("4",shippingcharge,discount,total,subtotal);
  }
  const handleCouponDiscount=()=>{
    if(countofdiscount>=1)return;
    if(total<500){
      toast.error('Coupon Is Not Valid Under 500 Ruppes of Product!');
      return;
    }
    let isFound=false;
    for(let i=0;i<discountarray.length;i++){
      if(coupon===discountarray[i]){
        isFound=true;
        break;
      }
    }
    if(isFound){
    const d=discount-100;
    setDiscount(d);
    setTotal(subtotal+ d + shippingcharge);
    setCountOfDiscount(1);
    toast.success('Coupon Applied  successfully!');
    }
    else{
      toast.error('Coupon Is Not Valid !');
    }
  }
  const goToPayment=()=>{
    if (isFormValid()) {
      // Submit the form
      localStorage.setItem("shippingInfo",JSON.stringify(formData));
      localStorage.setItem("id",JSON.stringify("65c8cf8f2a58a40231de40fc"));
      console.log("Form submitted successfully!");
      handleSectionChange("payment");
    } else {
      toast.error("Please fill out all fields before go to next section.");
    }
  }
  useEffect(()=>{
    calcuateData();
  },[]);
  return (
    <div>
      <div className="container2">
        <div className="formData">
        <form>
            <div className="form-column">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <label htmlFor="contactNumber">Phone Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />

              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />

              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-column">
              <label htmlFor="emailAddress">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="postalCode">Zip Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />

              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />

              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>

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

            {/* <div className="coupon">
              <input onChange={(e)=>setCoupon(e.target.value)}  className="coupon-code" placeholder="Coupon Code" />
            </div>

            <div className="apply">
              <button className="apply-code-btn" onClick={handleCouponDiscount}>Apply Code</button>
            </div> */}
            <div>
              <button onClick={() => goToPayment()}>Go To Payment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingSection;
