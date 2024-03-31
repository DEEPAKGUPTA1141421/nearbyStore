import { useNavigate } from "react-router-dom"

export const handlehome=()=>{
    const navigate=useNavigate();
    navigate("/");
}