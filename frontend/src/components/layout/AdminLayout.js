 import React, { useState } from "react";
 import {
   Box,
   AppBar,
   Toolbar,
   Typography,
   IconButton,
   Menu,
   MenuItem,
   Button,
 } from "@mui/material";
 import AccountCircleIcon from "@mui/icons-material/AccountCircle";
 import { useNavigate } from "react-router-dom";
 import useAuth from "../../hooks/useAuth";

 const AdminLayout = ({ children }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const { user, logout } = useAuth();
   const navigate = useNavigate();

   const handleMenu = (event) => {
     setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
     setAnchorEl(null);
   };

   const handleLogout = () => {
     logout();
     navigate("/login");
   };

   const handleProfile = () => {
     navigate("/admin/profile");
     handleClose();
   };

   const handleHome = () => {
     navigate("/admin-home");
   };

   return (
     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
       <AppBar position="static">
         <Toolbar>
           <Typography
             variant="h6"
             component="div"
             sx={{ flexGrow: 1, cursor: "pointer" }}
             onClick={handleHome}
           >
             Job Portal Admin
           </Typography>
           <IconButton
             size="large"
             aria-label="account of current user"
             aria-controls="menu-appbar"
             aria-haspopup="true"
             onClick={handleMenu}
             color="inherit"
           >
             <AccountCircleIcon />
           </IconButton>
           <Menu
             id="menu-appbar"
             anchorEl={anchorEl}
             anchorOrigin={{
               vertical: "top",
               horizontal: "right",
             }}
             keepMounted
             transformOrigin={{
               vertical: "top",
               horizontal: "right",
             }}
             open={Boolean(anchorEl)}
             onClose={handleClose}
           >
             <MenuItem onClick={handleProfile}>Profile</MenuItem>
             <MenuItem onClick={handleLogout}>Logout</MenuItem>
           </Menu>
         </Toolbar>
       </AppBar>
       <Box component="main" sx={{ flexGrow: 1 }}>
         {children}
       </Box>
     </Box>
   );
 };

 export default AdminLayout;