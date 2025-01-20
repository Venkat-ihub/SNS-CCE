import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import axios from "../config/axios";

const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo || !userInfo._id) {
          navigate("/login");
          return;
        }
        const response = await axios.get(
          `/api/admin/saved-jobs/${userInfo._id}/`
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchSavedJobs();
  }, [navigate]);

  const handleRemoveSaved = async (jobId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo._id) {
        console.error("No user info found");
        navigate("/login");
        return;
      }
      await axios.post(`/api/admin/jobs/${jobId}/unsave/`, {
        user_id: userInfo._id,
      });
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error removing saved job:", error);
    }
  };

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Saved Jobs
      </Typography>

      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <Card sx={{ height: "100%" }}>
              <CardContent
                sx={{ cursor: "pointer" }}
                onClick={() => handleJobClick(job._id)}
              >
                <Typography variant="h6" gutterBottom>
                  {job.title}
                </Typography>

                <Box
                  sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}
                >
                  <BusinessIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {job.department}
                  </Typography>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}
                >
                  <LocationOnIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {job.location}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
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

                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveSaved(job._id);
                  }}
                >
                  <BookmarkIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {jobs.length === 0 && (
          <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No saved jobs yet
            </Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default SavedJobs;
