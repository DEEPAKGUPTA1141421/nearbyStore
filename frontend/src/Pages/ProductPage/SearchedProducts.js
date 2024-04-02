import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import SingleProductCard from "./SingleProductCard";
import "../styles/SearchedProduct.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {toast} from "react-toastify";
import {
  Checkbox,
  Input,
  Stack,
  Box,
  Button,
} from "@chakra-ui/react";
import { server } from "../../FixedUrl";
import BackIcon from "../../BackIcon";
const ProductPage = () => {
  const location = useLocation();

  const { searchResults, searchText } = location.state;

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    latest: false,
    asc: false,
    desc: false,
    rating: false,
  });
  const [displayedResults, setDisplayedResults] = useState(searchResults);

  console.log("results areeeeeeeeeeeeeeeeeeeeeeeeeeee", searchResults);

  const fetchProducts = async () => {
    console.log(filters);
    
    try {
      const { data } = await axios.get(
        `${server}/product/search`,
        {
          params: {
            searchTerm: searchText,
            asc: filters.asc,
            desc: filters.desc,
            rating: filters.rating,
            latest: filters.latest,
            from: filters.from,
            to: filters.to,
          },
        }
      );
      // /search?searchTerm=${searchText}&asc=${filters.asc}&desc=${filters.desc}&rating=${filters.rating}&latest=${filters.latest}&from=${filters.from}&to=${filters.to}`
      // );

      console.log("filtered products are ", data.products);

      if (data.success) {
        setDisplayedResults(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371000; // Earth's radius in meters
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    return distance;
  }

  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  const fetchDataFromAPI = async (latitude, longitude) => {
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?key=e00ae216227f42febdfacaed394cdc20&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      const addressDetails = data.results[0].components;
      console.log(addressDetails);
      const city = addressDetails.city;
      const continent = addressDetails.continent;
      const country = addressDetails.country;
      const road = addressDetails.road;
      const state = addressDetails.state;
      const district = addressDetails.state_district;
      const village = addressDetails.village;
      const postcode = addressDetails.postcode;

      console.log(
        city,
        continent,
        country,
        road,
        state,
        district,
        village,
        postcode
      );
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

  useEffect(() => {
    const geo = navigator.geolocation;

    geo.getCurrentPosition(userCoords);
    function userCoords(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      setLatitude(latitude);
      setLongitude(longitude);
      console.log("latitude is ", latitude);
      console.log("longitude is ", longitude);
      fetchDataFromAPI(latitude, longitude);
    }
  },[]);

  const findProductsFromNearestLocation = () => {
    const productsWithDistance = searchResults.map((product) => {
      const shopLatitude = product.shopId.latitude;
      const shopLongitude = product.shopId.longitude;

      console.log("shops location is ", shopLatitude, shopLongitude);

      let distanceInMeters;

      if (
        latitude !== undefined &&
        longitude !== undefined &&
        shopLatitude !== undefined &&
        shopLongitude !== undefined
      ) {
        distanceInMeters = calculateDistance(
          latitude,
          longitude,
          shopLatitude,
          shopLongitude
        );
      }

      return { ...product, distance: distanceInMeters };
    });

    const sortedResults = productsWithDistance
      .filter((product) => product.distance !== undefined) // Remove products with undefined distance
      .sort((a, b) => a.distance - b.distance);

    setDisplayedResults(sortedResults);

    console.log("sorted results are ", sortedResults);
  };
  const handleCheckboxChange = (filterName) => {
    setFilters((prevFilters) =>({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (filters.nearestLocationChecked) {
      findProductsFromNearestLocation();
    } else {
      setDisplayedResults(searchResults);
    }
  }, [filters.nearestLocationChecked, searchResults, latitude, longitude]);

  return (
<Fragment>
        {/* <Checkbox
          checked={filters.nearestLocationChecked}
          onChange={handleInputChange}
        >
          Nearest location
        </Checkbox> */}
      <Stack spacing={4} direction="column" className="sidebar">
      <Button colorScheme="red">Nearest Product</Button>
        <h3>Filters</h3>
        <Checkbox
          checked={filters.latest}
          onChange={() => handleCheckboxChange("latest")}
        >
          Latest
        </Checkbox>
        <Checkbox
          checked={filters.asc}
          onChange={() => handleCheckboxChange("asc")}
        >
          Ascending
        </Checkbox>
        <Checkbox
          checked={filters.desc}
          onChange={() => handleCheckboxChange("desc")}
        >
          Descending
        </Checkbox>
        <Checkbox
          checked={filters.rating}
          onChange={() => handleCheckboxChange("rating")}
        >
          Rating
        </Checkbox>
        <Box>
          <label>
            From:
            <Input
              type="number"
              name="from"
              value={filters.from}
              onChange={handleInputChange}
            />
          </label>
          <label>
            To:
            <Input
              type="number"
              name="to"
              value={filters.to}
              onChange={handleInputChange}
            />
          </label>
        </Box>
        <Button onClick={fetchProducts} colorScheme="red">Apply Filters</Button>
      </Stack>
      <Box className="content">
        <div className="searched-product-page">
          {displayedResults && displayedResults.length === 0 ? (
            <h1>No Product in The List</h1>
          ) : (
            displayedResults.map((product, index) => (
              <SingleProductCard product={product} key={index} />
            ))
          )}
        </div>
      </Box>
    </Fragment>
  );
};

export default ProductPage;
