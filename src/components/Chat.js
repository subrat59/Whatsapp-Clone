import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "./chat.css"
import 'primeicons/primeicons.css';
import { addDoc, collection, doc, getDocs,orderBy,query,serverTimestamp } from "firebase/firestore";
import { auth, database } from "../firebase/setup";
import { useEffect, useState } from "react";
import { Avatar, List, ListItem, ListItemText } from "@mui/material";
        

export default function Chat(){
    const [message,setmessage]=useState("")
    const [messagedata,setmessagedata]=useState([])
    const location=useLocation()    
    const sendmsg= async()=>{
        const userdoc=doc(database,"whatsapp",`${location.state.id}`)
        const messagedoc=doc(userdoc,"message",`${location.state.id}`)
        const userdoc2=doc(database,"whatsapp",`${auth.currentUser?.uid}`)
        const messagedoc2=doc(userdoc2,"message",`${auth.currentUser?.uid}`)
        const messageref1=collection(messagedoc,`message-${auth.currentUser?.uid}`)
        const messageref2=collection(messagedoc2,`message-${location.state.id}`)
        
        try {
            await addDoc(messageref1, {
                profile_image:auth.currentUser.photoURL,
                message: message,
                created: serverTimestamp()
            
            })
            await addDoc(messageref2, {
                profile_image:auth.currentUser.photoURL,
                message: message,
                created: serverTimestamp()
            
            })
        } catch (error) {
            console.log(error)
        }
    }
    const showmsg= async()=>{
        const userdoc=doc(database,"whatsapp",`${auth.currentUser?.uid}`)
        const messagedoc=doc(userdoc,"message",`${auth.currentUser?.uid}`)
        const messageref=collection(messagedoc,`message-${location.state.id}`)
        try {
            const querySnapshot = await getDocs(query(messageref, orderBy('created', 'asc')));
            const filtereddata=querySnapshot.docs.map((doc)=>({
                ...doc.data(),
                id:doc.id
            }))
            setmessagedata(filtereddata)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        showmsg();
        console.log("useEffect ran!");
    }, [messagedata]);  
    console.log(messagedata)
    return(
        <div>
            <div className="chatTop">
            <Navbar state={{receivername:location.state.username,receiverprofileimg:location.state.profile_img}}/>
            </div>
            <div className="chat-middle">
                {messagedata.map((data)=>{
                    console.log(data)
                    return<>
                    <paper>
                        <List>
                            <ListItem sx={{backgroundColor:"white",width:"max-content" }}>
                            <Avatar src={data.profile_image} sx={{marginRight:"10px"}}/>
                          <ListItemText primary={data.message}/>
                          </ListItem>
                        </List>
                    </paper>
                  </>
                })}
            </div>
            <div className="chatBottom">
            <div className="bottombox">
            <i className="pi pi-paperclip" style={{fontSize:"2rem",marginLeft:"5px",marginBottom:"5px" }}>
            </i>
                <input onChange={(e)=>setmessage(e.target.value)} className="chatText" placeholder="Type your message..." ></input>
                <i onClick={sendmsg} className="pi pi-send" style={{fontSize:"2rem",marginLeft:"5px",marginBottom:"5px" }}>
            </i>
            </div>
            </div>
        </div>
    );
}