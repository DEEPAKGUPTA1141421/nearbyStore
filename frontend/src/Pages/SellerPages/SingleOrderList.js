import React from "react";

const SigleOrderList = ({ order }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  return (
    <div className="order-details">
      <img src={order.image} alt={order.name} />
      <div>
        <h2>{order.name}</h2>
        <p>Description: {order.product.description}</p>
        <p>Actual Price: {order.product.actualPrice}</p>
        <p>Discount Price: {order.product.discountPrice}</p>
        <p>Selling Price: {order.product.sellingPrice}</p>
        <p>Stock: {order.product.stock}</p>
        <p>Category: {order.product.category}</p>
        <p>User Order At: {formatDate(order.product.createdAt)}</p>
        <p>Tracking ID: {order.trackingId}</p>
      </div>
    </div>
  );
};

export default SigleOrderList;
