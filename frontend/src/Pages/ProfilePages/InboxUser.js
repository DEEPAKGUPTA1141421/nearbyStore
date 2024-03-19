import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/ProfilePage/InboxUser.css";
import axios from "axios";
import {io} from "socket.io-client";
import { server } from "../../FixedUrl";
import { useSelector } from "react-redux";
import {toast} from "react-toastify";
import { FaLocationArrow } from "react-icons/fa";
import { useSocket } from "../../context/SocketProvider";
const InboxUser = () => {
  const socket =useSocket();
  const[socketId,setSocketId]=useState("");
  const[socketConnetd,setSocketConnected]=useState(false);
  const[isTyping,setIsTyping]=useState(false);
  const[isloading,setIsloading]=useState(false);
  const[selelctedchat,setSelectedChat]=useState(undefined);
  const[chatCompare,setChatCompare]=useState(selelctedchat);
  const{user}=useSelector((state)=>state.userreducer);
  const[messages,setMessages]=useState([]);
  console.log("user cj",user);
  const[chats,setChats]=useState([]);
  const messageContainerRef = useRef(null);
  useEffect(()=>{
    socket.on("message received",(newMessageReceived)=>{
      console.log("message received",newMessageReceived);
      if(!selelctedchat||selelctedchat!==newMessageReceived.chat._id){
        // notification
        console.log(selelctedchat,newMessageReceived.chat._id);
        console.log("notifications");

      }
      else{
        setMessages([...messages,newMessageReceived]);
      }
    });
  });
    useEffect(() => {
        // Scroll to the bottom of the container when messages change
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);
  const fetchAllMessage=async()=>{
    try{
      const axiosConfig = {
        withCredentials: true, // Store cookies
        // ContentType: 'application/data' // Handle application/data responses
      };
      const {data}=await axios.get(`${server}/chat/allmessage/${selelctedchat}`,axiosConfig);
      console.log("allmessage",data);
      if(data.success){
        toast.success(data.message);
        setMessages(data.message);
      }
      else{
        toast.error("Could Not Get All mesaages");
      }
      socket.emit("join chat",selelctedchat);
    }
    catch(err){
      toast.error(err.mesaage);
    }
  }
  const [content, setContent] = useState('');

    const handleChange = (e) => {
        setContent(e.target.value);
    };
    const handleSeleted=(id)=>{
      setSelectedChat(id);
      fetchAllMessage();
    }
    const handleSendMessage =async () => {
        if (content.trim() !== '') {
            setContent('');
        }
        // socket.emit("new message",{"message":content,"chatId":{socketId}});
        try{
          const axiosConfig = {
            withCredentials: true, // Store cookies
            // ContentType: 'application/data' // Handle application/data responses
          };
          const formdata=new FormData();
          formdata.append("content",content);
          const {data}=await axios.post(`${server}/chat/sendmessage/${selelctedchat}`,formdata,axiosConfig);
          console.log(data);
          if(data.success){
            console.log("chat check");
            toast.success(data.message);
            // fetchchat();
            // fetchAllMessage();
            setMessages([...messages,data.currmessage]);
            socket.emit("new message",data.currmessage);
          }
          else{
            toast.error("can't able to send the message");
          }
        }
        catch(err){
          toast.error(err.message);
        }
    };
  const fetchchat=async()=>{
    try{
      // const formdata=new FormData();
      // formdata.append("userId",user._id);
      console.log("id",user._id);
      const axiosConfig = {
        withCredentials: true, // Store cookies
        // ContentType: 'application/data' // Handle application/data responses
      };
      const{data}=await axios.get(`${server}/chat/fetchchat`,axiosConfig);
      console.log("data check in chat",data);
      if(data.success){
        toast.success(data.message);
        setChats(data.chats);
      }
      else{
        toast.error("Can't Fetch Chat");
      }
    }
    catch(err){
      toast.error(err.message);
    }
  }
  useEffect(()=>{
      fetchchat();
      setIsloading(true);  
  },[]);
  useEffect(()=>{
    socket.emit("setup",user);
    socket.on("typing",()=>{
      setIsTyping(true);
    });
    socket.on("stop typing",()=>{
      setIsTyping(false);
    });
    socket.on("connection",(data)=>{
      setSocketConnected(true);
      console.log("conneteted to chat");
    })
    return ()=>{
      socket.disconnect();
    }
  },[]); 
  return (
    <>
    {isloading&&<div className="inbox-container">
      <div className="headingh2">
        <h2>Inbox</h2>
      </div>
      <div className="chat-list">
        {chats&&chats.length>0&&chats.map((chat,index) => (
          <div key={index} className={`chat-item ${selelctedchat===chat._id ? 'selected-chat' : ''}`} onClick={(e)=>handleSeleted(chat._id)}>
            <div className="chat-info">
              <div className="chat-name">{chat.chatName}</div>
              <div className="chat-message">{chat.latestMessage?chat.latestMessage.content:"No Latest Message Till Now"}</div>
            </div>
            <div className="chat-time">{chat.updatedAt}</div>
          </div>
        ))}
      </div>
      {
        selelctedchat!==undefined&&<div className="message-container" ref={messageContainerRef}>
        {messages&&messages.length>0&&messages.map((message, index) => (
            <div key={index}  className={`message ${message.sender._id===user._id ? 'sent-by-current-user' : 'sent-by-other-user'}`}>
                {/* Render your message content here */}
                {message.content}
            </div>
        ))}
    </div>
      }
      <div className="chat-input-container">
        {socketId}
            <input
                type="text"
                placeholder="Type a message..."
                value={content}
                onChange={handleChange}
                className="message-input"
            />
            <button disabled={content.trim() === ''||selelctedchat===undefined} onClick={handleSendMessage} className="send-button">
                <FaLocationArrow lassName="send-icon"/>
            </button>
        </div>
    </div>}
    </>
  );
};

export default InboxUser;
