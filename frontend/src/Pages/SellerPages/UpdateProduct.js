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
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Input, Textarea, Button } from "@chakra-ui/react";
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
      <Modal isOpen={handleOpen} onClose={handleOpen} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={handleSubmit} padding="1rem">
            <Box as="div" display="flex" justifyContent="space-between">
              <Box as="div" flex="1" marginRight="1rem">
                <Box as="label" display="block" marginBottom="1rem">
                  Name:
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box as="label" display="block" marginBottom="1rem">
                  Description:
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box as="label" display="block" marginBottom="1rem">
                  Actual Price:
                  <Input
                    type="text"
                    name="actualPrice"
                    value={formData.actualPrice}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box as="label" display="block" marginBottom="1rem">
                  Discount Price:
                  <Input
                    type="text"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box as="label" display="block" marginBottom="1rem">
                  Selling Price:
                  <Input
                    type="text"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box as="label" display="block" marginBottom="1rem">
                  Stock:
                  <Input
                    type="text"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </Box>
              </Box>
              <Box as="div" flex="1">
                <Box as="label" display="block" marginBottom="1rem">
                  Category:
                  <Input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Box as="label" display="block" marginBottom="1rem">
                  Gender specification:
                  <Input
                    type="text"
                    name="genderspecific"
                    value={formData.genderspecific}
                    onChange={handleChange}
                    required
                  />
                </Box>
                <Button type="submit" backgroundColor="#007bff" color="white">Update</Button>
              </Box>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
    </Fragment>,
    document.getElementById("popuproot") // Target root element
  );
};

export default UpdateProduct;
