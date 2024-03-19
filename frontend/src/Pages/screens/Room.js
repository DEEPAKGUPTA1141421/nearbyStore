import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../../context/SocketProvider'
import ReactPlayer from "react-player";
import peer from "./peer";
const Room = () => {
    const socket=useSocket();
    const[remoteSocketId,setRemoteSocketId]=useState();
    const[myStream,setMyStream]=useState("");
    const handleUserJoined=useCallback(({email,id})=>{
      console.log("email",email,"joined room no",id);
      setRemoteSocketId(id);
    },[]);
    const handleCallUser=useCallback(async()=>{
      const stream=await navigator.mediaDevices.getUserMedia({audio:true,video:true});
      const offer=await peer.getoffer();
       console.log("socketId",remoteSocketId);
      socket.emit("user:call",{to:remoteSocketId,offer});
      setMyStream(stream);
    },[remoteSocketId, socket]);
    const handleIncomingCall=useCallback(async({from,offer})=>{
      setRemoteSocketId(from);
      const stream=await navigator.mediaDevices.getUserMedia({audio:true,video:true});
      setMyStream(stream);
      console.log("incoming Call",from,offer);
      const ans=peer.getAnswer(offer);
      socket.emit("call:accepted",{to:from,ans});
    },[socket]);
    const handleCallAccepted=useCallback(({from,ans})=>{
      peer.setLocalDescription(ans);
      console.log("call accepted");
    },[]);
    useEffect(()=>{
      socket.on("user:joined",handleUserJoined);
      socket.on("incoming:call",handleIncomingCall);
      socket.on("call:accepted",handleCallAccepted);
      return ()=>{
        socket.off("user:joined",handleUserJoined);
        socket.off("handleIncominCall",handleIncomingCall);
        socket.off("call:accepted",handleCallAccepted);
      }
    },[remoteSocketId,socket,handleUserJoined,handleIncomingCall,handleCallAccepted]);
  return (
    <>
    <h1>Room</h1>
    <p>{remoteSocketId?"connected":"no one in the room"}</p>
    {
      remoteSocketId?<button onClick={handleCallUser} style={{backgroundColor:"green",color:"blanchedalmond"}}>Call Now</button>:null
    }
    <h1>MY Stream</h1>
    {
      myStream&&<ReactPlayer playing muted width={"600px"} height={"300px"} url={myStream}/>
    }
    </>
  )
}

export default Room;