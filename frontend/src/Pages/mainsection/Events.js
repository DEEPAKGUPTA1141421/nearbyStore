// import React, { useState, useEffect } from 'react';
// import { server } from '../../FixedUrl';
// import axios from 'axios';

// const Events = () => {
  
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     setLoading(true);
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const {data} = await axios.get(`${server}/product/search`, {
//         params: {
//           category: 'smartphone',
//           limitproduct: 5
//         }
//       });
//       console.log("check",data.products);
//       let currarr = data.products.map((product, index) => {
//         let endTime;
      
//         switch (index) {
//           case 0:
//             endTime = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Adding approximately one month (30 days) to the current date
//             break;
//           case 1:
//             endTime = new Date(Date.now() + 35 * 24 * 60 * 60 * 1000); // Adding approximately one month and 5 days to the current date
//             break;
//           case 2:
//             endTime = new Date(Date.now() + 40 * 24 * 60 * 60 * 1000); // Adding approximately one month and 10 days to the current date
//             break;
//           case 3:
//             endTime = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000); // Adding approximately one month and 15 days to the current date
//             break;
//           case 4:
//             endTime = new Date(Date.now() + 50 * 24 * 60 * 60 * 1000); // Adding approximately one month and 20 days to the current date
//             break;
//           default:
//             // Set a default value for endTime if needed
//             endTime = new Date(); // Example default value
//         }
      
//         // Add endTime property to the product
//         return {
//           ...product,
//           endTime: endTime
//         };
//       });
      
//       setProducts(currarr);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setLoading(false);
//     }
//   };

//   const calculateTimeRemaining = (endTime) => {
//     const currentTime = new Date();
//     const difference = endTime - currentTime;
//     if (difference <= 0) {
//       return 'Offer Expired';
//     }
//     const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((difference % (1000 * 60)) / 1000);
//     return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//   };

//   return (
//     <>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="container mx-auto py-8">
//           <h1 className="text-3xl font-bold mb-4">Event Page</h1>
//           {products && products.length > 0 && products.map(product => (
//             <div key={product.id} className="bg-gray-100 rounded-lg p-4 mb-4">
//               <img src={product.images[0]}/>
//               <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//               <p className="text-green-600 font-semibold mb-2">{product.offer}</p>
//               <p className="text-lg mb-2">Price: ${product.sellingPrice} <del className="text-gray-500">${product.actualPrice}</del></p>
//               <p className="text-sm text-gray-600">Time Remaining: {calculateTimeRemaining(product.endTime)}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default Events
import React, { useState, useEffect } from 'react';
import { server } from '../../FixedUrl';
import axios from 'axios';
import { Box, Flex, Heading, Image, Spinner } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const Events = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch initial data
    const interval = setInterval(fetchData, 60000); // Fetch data every minute
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/product/search`, {
        params: {
          category: 'smartphone',
          limitproduct: 5
        }
      });
      const updatedProducts = data.products.map(product => {
        const endTime = new Date(product.endTime); // Parse endTime from data
        return { ...product, endTime };
      });
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTimeRemaining = (endTime) => {
    const currentTime = new Date();
    const difference = endTime.getTime() - currentTime.getTime();
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
    <Flex height="100vh" alignItems="center" justifyContent="center" style={{position: "relative",top: "15rem"}}>
      {loading ? (
        <Spinner size="3xl" />
      ) : (
        <Box p="4">
          <Heading as="h1" size="xl" mb="4">Event Page</Heading>
          <Flex flexWrap="wrap" style={{columnGap: "30px",rowGap:"5px"}}>
            {products.map((product, index) => (
              <Box key={product.id} bg="gray.100" p="4" mb="4" borderRadius="md" display="flex">
              <Link to={`/product/${product._id}`}>
                <Image src={product.images[0]} alt={product.name} style={{ height: "20rem", flex: "1" }} />
                </Link>
                <Box flex="2" ml="4">
                  <Heading as="h2" size="lg" mt="2">{product.name}</Heading>
                  <Box color="green.600" fontWeight="semibold" mt="2">{product.offer}</Box>
                  <Box fontSize="lg" mt="2">
                    Price: ${product.sellingPrice} <Box as="del" color="gray.500">${product.actualPrice}</Box>
                  </Box>
                  <Box fontSize="sm" color="gray.600" mt="2">Time Remaining: {calculateTimeRemaining(product.endTime)}</Box>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </Flex>
  );
};
export default Events;
