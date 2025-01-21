 import React from "react";
 import {
   Card,
   CardContent,
   CardActions,
   Typography,
   Box,
   IconButton,
   Chip,
   Tooltip,
 } from "@mui/material";
 import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
 import BookmarkIcon from "@mui/icons-material/Bookmark";
 import VisibilityIcon from "@mui/icons-material/Visibility";
 import LocationOnIcon from "@mui/icons-material/LocationOn";
 import BusinessIcon from "@mui/icons-material/Business";
 import PushPinIcon from "@mui/icons-material/PushPin";
 import { useNavigate } from "react-router-dom";
 import { styled } from "@mui/material/styles";

 const JobTitle = styled(Typography)(({ theme }) => ({
   fontWeight: 600,
   display: "-webkit-box",
   WebkitLineClamp: 2,
   WebkitBoxOrient: "vertical",
   overflow: "hidden",
   lineHeight: 1.3,
 }));

 const JobCard = ({ job, onSaveToggle }) => {
   const navigate = useNavigate();

   const handleClick = () => {
     navigate(`/jobs/${job._id}`);
   };

   return (
     <Card
       elevation={2}
       onClick={handleClick}
       sx={{
         cursor: "pointer",
         height: "100%",
         display: "flex",
         flexDirection: "column",
         transition: "transform 0.2s ease-in-out",
         opacity: job.status === "expired" ? 0.7 : 1,
         borderTop: job.pinned ? "3px solid #1976d2" : "none",
         "&:hover": {
           transform: "translateY(-5px)",
         },
       }}
     >
       <CardContent sx={{ flexGrow: 1 }}>
         <Box
           sx={{
             display: "flex",
             justifyContent: "space-between",
             alignItems: "flex-start",
           }}
         >
           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
             {job.pinned && <PushPinIcon color="primary" fontSize="small" />}
             <JobTitle variant="h6">{job.title}</JobTitle>
           </Box>
           {job.status === "expired" && (
             <Chip label="Expired" color="error" size="small" sx={{ ml: 1 }} />
           )}
         </Box>

         <Box sx={{ display: "flex", alignItems: "center", mt: 2, gap: 1 }}>
           <BusinessIcon fontSize="small" color="action" />
           <Typography variant="body2" color="text.secondary">
             {job.department}
           </Typography>
         </Box>

         <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
           <LocationOnIcon fontSize="small" color="action" />
           <Typography variant="body2" color="text.secondary">
             {job.location}
           </Typography>
         </Box>

         <Typography
           variant="body2"
           color="text.secondary"
           sx={{
             mt: 2,
             display: "-webkit-box",
             WebkitLineClamp: 3,
             WebkitBoxOrient: "vertical",
             overflow: "hidden",
           }}
         >
           {job.description}
         </Typography>
       </CardContent>

       <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
           <VisibilityIcon fontSize="small" color="action" />
           <Typography variant="body2" color="text.secondary">
             {job.views || 0}
           </Typography>
         </Box>

         {onSaveToggle && (
           <IconButton
             onClick={(e) => {
               e.stopPropagation();
               onSaveToggle(job._id);
             }}
             color="primary"
           >
             {job.isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
           </IconButton>
         )}
       </CardActions>
     </Card>
   );
 };

 export default JobCard;