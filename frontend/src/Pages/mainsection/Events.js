import React, { useState, useEffect } from 'react';
const Events = () => {
  
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      offer: "20% off",
      originalPrice: 100,
      discountedPrice: 80,
      endTime: new Date('2024-03-20T12:00:00'), // Example end time for the offer
    },
    {
      id: 2,
      name: "Product 2",
      offer: "15% off",
      originalPrice: 50,
      discountedPrice: 42.5,
      endTime: new Date('2024-03-22T18:30:00'), // Example end time for the offer
    },
    {
      id: 2,
      name: "Product 2",
      offer: "15% off",
      originalPrice: 50,
      discountedPrice: 42.5,
      endTime: new Date('2024-03-22T18:30:00'), // Example end time for the offer
    },
    {
      id: 2,
      name: "Product 2",
      offer: "15% off",
      originalPrice: 50,
      discountedPrice: 42.5,
      endTime: new Date('2024-03-22T18:30:00'), // Example end time for the offer
    },
    {
      id: 2,
      name: "Product 2",
      offer: "15% off",
      originalPrice: 50,
      discountedPrice: 42.5,
      endTime: new Date('2024-03-22T18:30:00'), // Example end time for the offer
    },
    {
      id: 2,
      name: "Product 2",
      offer: "15% off",
      originalPrice: 50,
      discountedPrice: 42.5,
      endTime: new Date('2024-03-22T18:30:00'), // Example end time for the offer
    },
    // Add more products here
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the time remaining for each product
      setProducts(prevProducts => prevProducts.map(product => ({
        ...product,
        timeRemaining: calculateTimeRemaining(product.endTime)
      })));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateTimeRemaining = (endTime) => {
    const currentTime = new Date();
    const difference = endTime - currentTime;
    if (difference <= 0) {
      return 'Offer Expired';
    }
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className=" container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Event Page</h1>
      {products.map(product => (
        <div key={product.id} className="bg-gray-100 rounded-lg p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-green-600 font-semibold mb-2">{product.offer}</p>
          <p className="text-lg mb-2">Price: ${product.discountedPrice} <del className="text-gray-500">${product.originalPrice}</del></p>
          <p className="text-sm text-gray-600">Time Remaining: {product.timeRemaining}</p>
        </div>
      ))}
    </div>
  );
};

export default Events;
