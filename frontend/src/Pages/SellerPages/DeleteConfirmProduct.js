import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "../styles/sellerPage/ProDuctPopUp.css";
import tv from "../../images/Ecommerce.jpg";
import { TiArrowUpThick } from "react-icons/ti";
import { FaArrowDown } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import {toast} from "react-toastify";
import { server } from "../../FixedUrl";
const DeleteConfirmProduct = ({handleDelete,setDeleteProduct,deleteProduct}) => {
    const deleteProdectfromdb=async()=>{
        try{
            const axiosConfig = {
                withCredentials: true
            };
            const {data}=await axios.delete(`${server}/product/delete/${deleteProduct}`,axiosConfig);
            console.log("data",data);
            if(data.success){
                toast.success(data.message);
            }
            else{
                toast.error("can't delete");
            }

        }
        catch(error){
            toast.error(error.message);
        }
    }
    const confirm=()=>{
        const d=deleteProduct;
        setDeleteProduct(d);
        deleteProdectfromdb();
        handleDelete();
    }
    const cancel=()=>{
        setDeleteProduct(undefined);
        handleDelete();
        toast.success("Cancel Delete Product By Seller");
    }  
  return ReactDOM.createPortal(
    <Fragment>
      <div className="modalWrapper" onClick={handleDelete}></div>
      <div className="modalContainer">
        <div className="popupcontainer">
        <div className="container">
      <div className="confirmation-dialog">
        <p>Are you sure you want to delete?</p>
        <button onClick={cancel}>Cancel</button>
        <button onClick={confirm}>Confirm Delete</button>
      </div>
       </div>
        </div>
      </div>
    </Fragment>,
    document.getElementById("popuproot") // Target root element
  );
};
export default DeleteConfirmProduct;
