import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Card,CardContent } from '@mui/material';
import './Signin.css'
import {signInWithPopup} from 'firebase/auth'
import { auth, googleProvider,database } from '../firebase/setup';
import { doc,addDoc,userDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Signin() {

  const navigate=useNavigate()
  const addUser=async()=>{
    const userDoc=doc(database,"whatsapp",`${auth.currentUser?.uid}`)
      try{
          await setDoc(userDoc,{
            id:auth.currentUser?.uid,
            username:auth.currentUser?.displayName,
            profile_image:auth.currentUser?.photoURL
          });
      }catch(err){
        console.error(err)
      }
  }

const googleSignin = async()=>{
    try{
        await signInWithPopup(auth,googleProvider)
        addUser();
        navigate("/Main")
    }catch(err){
        console.log(err);
    }
}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className='appbar'> 
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <div className='nav-content'>
          <img id='logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT1jZPAptgUoad1mmAzIJ7i7btTi3T5D-tE8RXWzQ&s' height={"60px"}></img>
          <h3 id='nav-text'>WHATSAPP WEB</h3>
          </div>
          <Card className='box'>
            <CardContent className='sign'>
                <h2>Use Whatsapp On Your Computer</h2>
                <div className='qr-and-proc'>
                <div className='procedure'>
                    <li>Open Whatsapp On Your Phone.</li>
                    <li>Open Whatsapp On Your Phone.</li>
                    <li>Open Whatsapp On Your Phone.</li>
                    <li>Open Whatsapp On Your Phone.</li>
                </div>
                <div onClick={googleSignin} className='qr'>
                </div>
                </div>
            </CardContent>
          </Card>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Signin;