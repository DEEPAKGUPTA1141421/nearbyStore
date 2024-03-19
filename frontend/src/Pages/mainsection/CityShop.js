import React, { useState, useEffect } from 'react';
import { State, City } from 'country-state-city';
import {useDispatch, useSelector} from "react-redux";
import { getallShopofcity } from '../../actions/sellerAction';
import SingleShop from './SingleShop';
import{useNavigate} from "react-router-dom";
const CityShop = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const dispatch=useDispatch();
  const {shoplist}=useSelector((state)=>state.sellerreducer);
  console.log("shoplist",shoplist);
  const navigate=useNavigate();
  const handleShopPage=(shopid)=>{
   navigate(`/shoppage/${shopid}`);
  }
  // Fetch the list of states for India
  const indiaStates = State.getStatesOfCountry('IN');
  const stateOptions = indiaStates.map(state => ({
    value: state.isoCode,
    label: state.name
  }));

  const handleStateChange = event => {
    const selectedStateCode = event.target.value;
    setSelectedState(selectedStateCode);
    dispatch(getallShopofcity("mumbai"));
  };

  useEffect(() => {
    console.log("hello state");
    if (selectedState) {
        console.log("selectedstate",selectedState);
      const stateCities = City.getCitiesOfState(selectedState);
      console.log("hello",stateCities);
      setCities(stateCities);
      setSelectedCity(''); // Reset selected city when state changes
    }
  }, [selectedState]);

  const handleCityChange = event => {
    setSelectedCity(event.target.value);
  };

  const handleSelect = () => {
    // You can perform any action with the selected state and city here
    console.log("Selected State:", selectedState);
    console.log("Selected City:", selectedCity);
  };

  return (
    <>
    <div>
      <h2>Select a State:</h2>
      <select value={selectedState} onChange={handleStateChange}>
        <option value="">Select State</option>
        {stateOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      {selectedState && (
  <>
    <h2>Select a City:</h2>
    <select value={selectedCity} onChange={handleCityChange}>
      <option value="">Select City</option>
      {cities.map(city => (
        <option key={city.name} value={city.name}>{city.name}</option>
      ))}
    </select>
  </>
)}
      <button onClick={handleSelect}>Search For The Desired City</button>
    </div>
    <div style={{display:"flex", flexWrap:"wrap",justifyContent:"space-around"}}>
      {shoplist&&shoplist.length>0&&shoplist.map((shop)=>(
       <>
        <div onClick={()=>handleShopPage(shop._id)}>
        <SingleShop shop={shop}/>
        </div>
       </>
      ))}
    </div>
    </>
  );
};

export default CityShop;

