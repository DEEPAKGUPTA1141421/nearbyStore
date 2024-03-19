import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../FixedUrl";
import './styles/ActivateUrl.css';
const ActivateAccount = () => {
    const [user, setUser] = useState();
    const [success, setSuccess] = useState(false);
    const { activationToken } = useParams();
    console.log(activationToken);
    const fetchData = async () => {
        try {
            const formData = new FormData();
            formData.append("activationToken", activationToken);
            const { data } = await axios.post(`${server}/user/activation`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });            
            
            if (data.success === true) {
                setUser(data.user); // Fix here
                setSuccess(data.success);
            }
        } catch (err) {
            setSuccess(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div class="text">
            {success ? (
                <div  class="div1">Your Account Is created Successfully</div>
            ) : (
                <div class="div1">Failed To Create the Account</div>
            )}
        </div>
    );
};
export default ActivateAccount;
