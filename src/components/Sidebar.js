import { Avatar, List, ListItem, ListItemText, Paper } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase/setup";
import { useEffect, useState } from "react";
import "./sidebar.css"
import { Link } from "react-router-dom";

export default function Sidebar(){
    const [users,setUsers]=useState([])
    const getUser=async()=>{
        const userRef=collection(database,"whatsapp")

        try{
          const data=await getDocs(userRef)
          const filteredDAta=data.docs.map((doc)=>({
            ...doc.data(),
            id:doc.id
          }))
          setUsers(filteredDAta)
          
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getUser()
    },[users])
     console.log(users)
    return(
        <div>
            <div className="search">
            <div id="search-bar">
            <i className="pi pi-search" style={{ fontSize: '2rem',color:'grey',cursor:'pointer' }}></i>
                <input id="search-box" placeholder="Search or start a new chat" ></input>
            </div>
            </div>
            {users.map((user)=>{
                return <>
            <Link to="/chat" state={{username:user.username,id:user.id,profile_img:user.profile_image }}>
            <Paper sx={{display:"flex",flexDirection:"column"}} >
            <List sx={{border:"1px solid grey",marginTop:"3px",borderRadius:"10px",color:"black"}}>
                <ListItem sx={{height:"60px"}}>
                    <Avatar src={user.profile_image}/>
                    <ListItemText sx={{marginLeft:"10px"}} primary={user.username}/>
                </ListItem>
                
            </List>
        </Paper>
            </Link>
                </>
            })}
        </div>
    );
}