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

function useFormInitialState() {
    return {
      name: "",
      description: "",
      actualPrice: "",
      discountPrice: "",
      sellingPrice: "",
      stock: "",
      category: "",
      genderspecific: "Neutral",
    };
  }
const UpdateProduct = ({ singleproduct,handleOpen,reRender, setReRender }) => {
    const[FormInitialState,setFormInitialState]=useState({
        name:singleproduct.name,
        description: singleproduct.description,
      actualPrice:singleproduct.actualPrice,
      discountPrice: singleproduct.discountPrice,
      sellingPrice: singleproduct.sellingPrice,
      stock: singleproduct.stock,
      category: singleproduct.category,
      genderspecific: singleproduct.genderSpecific,
});
    const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState(FormInitialState);
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
    return () => {
      document.body.style.overflow = "scroll"; // Re-enable scrolling when component is unmounted
    };
  }, []);
  const handleSubmit = async (e) => {
    console.log("handlesubmit");
    e.preventDefault();
    try {
      const axiosConfig = {
        withCredentials: true,
      };
      const formdata = new FormData();
      for (const key in formData) {
        if(formData[key]==""||formData[key]==undefined){
            toast.error("Please Do not Temper");
            console.log("Please Do not Temper");
            return;
        }
        formdata.append(key, formData[key]);
      }
      const { data } = await axios.put(
        `${server}/product/update/${singleproduct._id}`,
        formdata,
        axiosConfig
      );
      console.log("data",data);
      if (data.success) {
        toast.success(data.message);
        let d=reRender;
        setReRender(!d);
        handleOpen();
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error updating product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return ReactDOM.createPortal(
    <Fragment>
      <div className="modalWrapper" onClick={handleOpen}></div>
      <div className="modalContainer">
        <div className="popupcontainer">
        <form className="form-container" onSubmit={handleSubmit}>
  <div className="form-section">
    <label>
      Name:
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </label>
    <label>
      Description:
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />
    </label>
    <label>
      Actual Price:
      <input
        type="text"
        name="actualPrice"
        value={formData.actualPrice}
        onChange={handleChange}
        required
      />
    </label>
    <label>
      Discount Price:
      <input
        type="text"
        name="discountPrice"
        value={formData.discountPrice}
        onChange={handleChange}
        required
      />
    </label>
    <label>
      Selling Price:
      <input
        type="text"
        name="sellingPrice"
        value={formData.sellingPrice}
        onChange={handleChange}
        required
      />
    </label>
    <label>
      Stock:
      <input
        type="text"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        required
      />
    </label>
  </div>

  <div className="form-section">
    <label>
      Category:
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />
    </label>
    <label>
      Gender specification:
      <input
        type="text"
        name="genderspecific"
        value={formData.genderspecific}
        onChange={handleChange}
        required
      />
    </label>
    <button type="submit" style={{background:"#007bff"}}>Update</button>
  </div>
</form>

        </div>
      </div>
    </Fragment>,
    document.getElementById("popuproot") // Target root element
  );
};

export default UpdateProduct;
