import { useState } from "react";
import React from "react";
import "../styles/sellerPage/CreateProduct.css";
import axios from "axios";
import { server } from "../../FixedUrl";
import {toast} from "react-toastify";
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
function CreateProduct() {
  const [images, setImages] = useState([]);
  const shopId= "65c89e49776c9d6a9ba2b14e";
  const [formData, setFormData] = useState(useFormInitialState());
  const[imageurlArray,SetImageUrlArray]=useState([]);
  const handleImageChange = (e) => {
    // Convert FileList to Array
    const filesArray = Array.from(e.target.files);
    // Set selected files in state
    setImages(filesArray);
    console.log(filesArray);
  };
  const uploadImage=async(e)=>{
    if(images.length==0){
      toast.error("select image to upload the image");
      return;
    }
    const temparr=[];
    for(let i=0;i<images.length;i++){
      const formdata=new FormData();
      formdata.append("file",images[i]);
      formdata.append("upload_preset","imagepreset");
      formdata.append("cloud_name",'drt8pxy1q');
      const {data}=await axios.post("https://api.cloudinary.com/v1_1/drt8pxy1q/image/upload",formdata);
      console.log(data.secure_url);
      temparr.push(data.secure_url);
    }
    SetImageUrlArray(temparr);
    console.log(imageurlArray);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("image check".imageurlArray);
    const formdata = new FormData();
    // Append form data
    for (const key in formData) {
      formdata.append(key, formData[key]);
    }
    // Append images
    formdata.append("images",imageurlArray);
    try {
      const axiosConfig = {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      };
      const { data } = await axios.post(`${server}/product/create/${shopId}`,formdata,axiosConfig);
      if(data.success){
        toast.success(data.message);
        setFormData({
          name: "",
          description: "",
          actualPrice: "",
          discountPrice: "",
          sellingPrice: "",
          stock: "",
          category: "",
          genderspecific: "Neutral",
        });
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="create-product-container">
      <h1>Product Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <div>
            <label>
              Name
              <br />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="full-width-input"
              />
            </label>
          </div>

          <div>
            {" "}
            <label>
              Description
              <br />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="full-width-input"
              />
            </label>
          </div>
          <div>
            <label>
              Actual Price
              <br />
              <input
                type="text"
                name="actualPrice"
                value={formData.actualPrice}
                onChange={handleChange}
                className="full-width-input"
              />
            </label>
          </div>

          <div>
            {" "}
            <label>
              Discount Price
              <br />
              <input
                type="text"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                className="full-width-input"
              />
            </label>
          </div>
          <div>
            {" "}
            <label>
              Selling Price
              <br />
              <input
                type="text"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
                className="full-width-input"
              />
            </label>
          </div>

          <div>
            {" "}
            <label>
              Stock
              <br />
              <input
                type="text"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="full-width-input"
              />
            </label>
          </div>

          <div>
            <label>
              Category
              <br />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="full-width-input"
              />
            </label>
          </div>

          <div>
            {" "}
            <label>
              Gender specification
              <br />
              <input
                type="text"
                name="genderspecific"
                value={formData.genderspecific}
                onChange={handleChange}
                className="full-width-input"
              />
            </label>
          </div>
          <div>
            <h1>Multiple Image Upload to Cloudinary</h1>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*"
              required
            />
            <button onClick={uploadImage}>click to Upload Image or Drag </button>
            <div>
              {images &&
                images.length > 0 &&
                Array.from(images).map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index}`}
                    style={{ width: "200px", height: "200px", margin: "10px" }}
                  />
                ))}
            </div>
          </div>
          <button className="create-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
