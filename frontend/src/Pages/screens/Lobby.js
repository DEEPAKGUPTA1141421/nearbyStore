import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../../context/SocketProvider'
;
import { useNavigate } from 'react-router-dom';

const Lobby = () => {
    const socket=useSocket();
    const navigate=useNavigate();
    const[email,setEmail]=useState("");
    const[room,setRoom]=useState();
    const handlevideocall=useCallback((e)=>{
        e.preventDefault();
        console.log(socket);
        socket.emit("room:join",{email,room})
        console.log(email,room,"roomId");
        
    },[email,room,socket]);
    const handlejoinroom=useCallback((data)=>{
        const{email,room}=data;
        navigate(`/room/${room}`);
    },[]);
   useEffect(()=>{
    socket.on("room:join",handlejoinroom);
    return ()=>{
        socket.off("room:join",handlejoinroom);
    }
   }); 
  return (
    <>
    <div>Lobby</div>
    <form onSubmit={handlevideocall}>
        <label htmlFor='email'>Email Id</label>
        <input onChange={(e)=>setEmail(e.target.value)}type="email" id="email"/>
        <label htmlFor='room'>Room  Id</label>
        <input onChange={(e)=>setRoom(e.target.value)} type="text" id="room"/>
        <button type="submit">Join Call</button>
    </form>
    </>
  )
}

export default Lobby;