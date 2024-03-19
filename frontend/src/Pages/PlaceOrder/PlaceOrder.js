import React, { useState } from "react";
import ShippingSection from "./ShippingSection";
import PaymentSection from "./PaymentSection";
import SuccessSection from "./SuccessSection";
import "../styles/Order/PlaceOrder.css";
import { useSelector } from "react-redux";

const OrderPage = () => {
  const [activeSection, setActiveSection] = useState("address");
  const {cartitem}=useSelector((state)=>state.cartreducer);
  console.log("placeorder",cartitem);
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <div className="header">
        <h1>Header</h1>
      </div>
      <div className="container">
        <div className="process">
          <div className="step">
            <button
              onClick={() => handleSectionChange("address")}
              className={activeSection === "address" ? "active" : ""}
            >
              Address
            </button>
          </div>
          <div className="lines"></div>
          <div className="step">
            <button
              onClick={() => handleSectionChange("payment")}
              className={activeSection === "payment" ? "active" : ""}
            >
              Payment
            </button>
          </div>
          <div className="lines"></div>
          <div className="step">
            <button
              className="order-process-btn"
              onClick={() => handleSectionChange("success")}
              // className={activeSection === "success" ? "active" : ""}
            >
              Success
            </button>
          </div>
        </div>

        <div className="content">
          {activeSection === "address" && <ShippingSection handleSectionChange={handleSectionChange} />}
          {activeSection === "payment" && <PaymentSection handleSectionChange={handleSectionChange} />}
          {activeSection === "success" && <SuccessSection />}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
