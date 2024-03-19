import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '../../FixedUrl';

const PayToRider = () => {
  const[riders,setRiders]=useState();
  const[totalpay,setTotalPay]=useState(0);
  const getpaymentInfo=async()=>{
    try{
      const {data}=await axios.get(`${server}/admin/getriderpayment`);
      if(data.success){
        setRiders(data.rider);
        console.log(data.rider);
        console.log("success");
        
      }
      else{
        console.log("error");
      }
    }
    catch(err){
      console.log(err.message);
    }
  }
  const calculatetotalmoney=(arr)=>{
    let sum=0;
    for(let i=0;i<=11;i++){
      sum+=arr[i];
    }
    return sum;
  }
  useEffect(()=>{
    getpaymentInfo();
  },[]);
  const handlePayment=()=>{
    
  }
  return (
    <>
    <div className="rider-list">
  {riders && riders.map((r, index) => (
    <div className='ridermaindiv'>
      <div className="info-item">Name: {r.name}</div>
      <div className="info-item">Email: {r.email}</div>
      <div className="info-item">Allocated Orders: {r.allocatedOrder.length}</div>
      <div className="info-item">Van: {r.nameOfVan}</div>
      <div className="info-item">Money To Pay: {calculatetotalmoney(r.riderTotalRemainingArray)}</div>
      <div><button className="pay-button" onClick={handlePayment}>Pay To Rider</button></div>
    </div>
  ))}
</div>

    </>
  )
}
export default PayToRider;
