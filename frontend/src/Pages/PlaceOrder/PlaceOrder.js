import React, { useState } from "react";
import ShippingSection from "./ShippingSection";
import PaymentSection from "./PaymentSection";
import SuccessSection from "./SuccessSection";
import "../styles/Order/PlaceOrder.css";
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";

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
        <h1>Place Order And Get Coins</h1>
      </div>
      <div className="container">
        <div className="process">
          <div className="step">
            <Button
              colorScheme={activeSection==="payment"||activeSection==="success"?"whatsapp":"red"}
              // onClick={() => handleSectionChange("address")}
              className={activeSection === "address" ? "active" : ""}
            >
              Address
            </Button>
          </div>
          <div className="lines"></div>
          <div className="step">
            <Button
              colorScheme={activeSection==="payment"?"red":(activeSection==="success"?"whatsapp":"gray")}
              // onClick={() => handleSectionChange("payment")}
              className={activeSection === "payment" ? "active" : ""}
            >
              Payment
            </Button>
          </div>
          <div className="lines"></div>
          <div className="step">
            <Button
              className="order-process-btn"
              colorScheme={activeSection==="success"?"red":"gray"}
              // onClick={() => handleSectionChange("success")}
              // className={activeSection === "success" ? "active" : ""}
            >
              Success
            </Button>
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
