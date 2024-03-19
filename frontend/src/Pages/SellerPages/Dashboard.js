import React, { useEffect, useMemo, useState } from 'react';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";
import {Bar,Pie} from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import "../styles/sellerPage/Dashboard.css";
import { loadProductOfAShopitem } from '../../actions/sellerAction';
import { useDispatch, useSelector } from 'react-redux';

import handm from "../../images/handm.png";
import UpdateProduct from './UpdateProduct';
import {toast} from "react-toastify";
import DeleteConfirmProduct from './DeleteConfirmProduct';
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
) 
const Dashboard = () => {
  const state=useSelector((state)=>state);
  console.log("state",state);
  // Sample sales data for the previous 30 days
  const {productList}=useSelector((state)=>state. sellerreducer);
  console.log("productList",productList);
  const [sellData,setSelldata]=useState([]);
  const[dailydate,setDailyDate]=useState([]);
  const[dailysell,setDailySell]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const[openDelete,setOpenDelete]=useState(false);
  const[deleteProduct,setDeleteProduct]=useState();
  const[mount,setMount]=useState(true);
  const[data,setData]=useState([]);
  const[reRender,setReRender]=useState(false);
  const[open,setOpen]=useState(false);
  const[producttoupdate,setProductToUpdate]=useState(null);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(mount){
       setIsLoading(true);
       dispatch(loadProductOfAShopitem());
       generateSalesData();
       setIsLoading(false);
       setMount(false);
    }
    else{
      setData(productList);
      console.log("data check",data);
    }
  },[mount,reRender]);
  const handleOpen=(product)=>{
    const d=open;
    setOpen(!d);
  }
  const handleDelete=()=>{
    const d=openDelete;
    setOpenDelete(!d);
  }
    const generateSalesData = () => {
    const salesData = [];
    const dailydate=[];
    const today = new Date();
    const dailysell=[];

    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        let sellnum= Math.random() * 100;
        salesData.push({ date, sellnum});
        dailydate.push(date.toISOString().slice(5,10));
        dailysell.push(sellnum);
    }
     setSelldata(salesData);
     setDailyDate(dailydate);
     setDailySell(dailysell);
   };
  const formatDate = (date) => {
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return formattedDate.slice(0, 5); // Take the first 5 characters of the formatted date
   };
   const handleproductDelete=()=>{
    if(deleteProduct==undefined){
      toast.error("can't delete product");
      return;
    }
    let d=openDelete;
    setOpenDelete(!d);
   }
  const bardata={
    labels:dailydate,
    datasets:[
        {
            label:"Daily Sell Of previous 30 Days",
            data:dailysell,
            backgroundColor:'yellow',
            borderWidth:1
        }
    ]
  }
  const baroptions={

  }
  const horizotalbardata={
    labels:['galaxy Apparament','Crawford Market','Colaba Causeway','Chor Bazaar',
    'Linking Road, Bandra','Zaveri Bazaar (Jewelry Market)','Fashion Street, Churchgate',
    'Hill Road, Bandra','Lokhandwala Market, Andheri','Dadar Flower Market (Phool Gully)'
    ],
    datasets:[
        {
            label:"Per Day Order Of Diffenet Seller",
            data:[500,475,460,440,422,400,390,380,375,370],
            backgroundColor:'red',
            borderWidth:2
        }
    ]
  }
  const horizotalbaroptions={
    indexAxis:'y'
  }
  const piedata={
    labels:['OrderReceived','OrderDeliver','OrderPending'],
    datasets:[{
        data:[3,6,9],
        backgroundColor:['red','purple','green']
    }
    ] 
  };
  const pieoptions={};
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="top-section">
        <div className="left-top">
          {/* Your content for left-top section */}
          <table className="orders-table">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Selling Price</th>
            <th>Stock Left</th>
            <th>Price</th>
            <th>Update Product</th>
            <th>Delete Product</th>
          </tr>
        </thead>
        <tbody>
          {data&&data.length>0&&data.map((d) => (
            <tr key={1}>
              <td>
                <img src={handm} alt="productphoto"/>
              </td>
              <td>{d.name}</td>
              <td>{d.sellingPrice}</td>
              <td>{d.stock}</td>
              <td>{d.sellingPrice}</td>
              <td><button onClick={(e)=>{setProductToUpdate(d);
              handleOpen();
              }}>update</button></td>
              <td><button onClick={(e)=>{handleDelete();setDeleteProduct(d._id);}}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        
      </div>
      <div className="middle-section">
        {/* <Line data={data} options={options} /> */}
        <Pie data={piedata} options={pieoptions}></Pie>
      </div>
      <div className="bottom-section">
        <div className="left-bottom">
          {/* Your content for left-bottom section */}
          <h2>Sales Summary for Previous 30 Days</h2>
         <Bar data={bardata} options={baroptions} />
         <Bar data={horizotalbardata} options={horizotalbaroptions}></Bar>
        </div>
        
      </div>
      {open&&<UpdateProduct handleOpen={handleOpen} singleproduct={producttoupdate} reRender={reRender} setReRender={setReRender}/>}
      {openDelete&&<DeleteConfirmProduct handleDelete={handleDelete} deleteProduct={deleteProduct} setDeleteProduct={setDeleteProduct}/>} 
    </div>
  );
};

export default Dashboard;
