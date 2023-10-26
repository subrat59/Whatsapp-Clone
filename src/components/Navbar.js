import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '@mui/material';
import { auth } from '../firebase/setup';

export default function Navbar(props) {
  console.log(props)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} sx={{backgroundColor:"#f0f2f5",height:"70px",display:"flex",justifyContent:"center" }}  position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            
          </IconButton>
          <Avatar src={props.state.receiverprofileimg || (auth.currentUser ? auth.currentUser.photoURL : null)} />
          <h3 style={{marginLeft:"10px",color:"black"}} >{props.state.receivername??""}</h3>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
