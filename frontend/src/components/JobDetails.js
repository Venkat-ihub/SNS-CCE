import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Button,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkIcon from "@mui/icons-material/Work";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "../config/axios";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [user, setUser] = useState(null);

  const fetchJobDetails = useCallback(async () => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (!userInfo) {
        navigate("/login");
        return;
      }
      const parsedUser = JSON.parse(userInfo);

      const response = await axios.get(`/api/users/jobs/${id}/`, {
        params: { user_id: parsedUser._id },
      });
      setJob(response.data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchJobDetails();
  }, [fetchJobDetails]);

  const handleSaveToggle = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo._id) {
        console.error("No user info found");
        navigate("/login");
        return;
      }

      if (isSaved) {
        await axios.post(`/api/admin/jobs/${id}/unsave/`, {
          user_id: userInfo._id,
        });
      } else {
        await axios.post(`/api/admin/jobs/${id}/save/`, {
          user_id: userInfo._id,
        });
      }

      // Update local state
      setIsSaved(!isSaved);

      // Dispatch event to update other components
      window.dispatchEvent(new CustomEvent("jobViewComplete"));
    } catch (error) {
      console.error("Error toggling save status:", error);
    }
  };

  if (!job) return null;

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {job.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VisibilityIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {job.views || 0} views
              </Typography>
            </Box>
          </Box>
          <Tooltip title={isSaved ? "Remove from saved" : "Save job"}>
            <IconButton onClick={handleSaveToggle}>
              {isSaved ? (
                <BookmarkIcon color="primary" />
              ) : (
                <BookmarkBorderIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <Chip
            icon={<BusinessIcon />}
            label={job.department}
            variant="outlined"
          />
          <Chip
            icon={<LocationOnIcon />}
            label={job.location}
            variant="outlined"
          />
          <Chip icon={<WorkIcon />} label={job.job_type} variant="outlined" />
          <Chip
            icon={<CalendarTodayIcon />}
            label={`Apply by ${new Date(job.end_date).toLocaleDateString()}`}
            variant="outlined"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Job Description
        </Typography>
        <Typography paragraph>{job.description}</Typography>

        <Typography variant="h6" gutterBottom>
          Eligibility Criteria
        </Typography>
        <Typography paragraph>{job.eligibility}</Typography>

        <Typography variant="h6" gutterBottom>
          Selection Process
        </Typography>
        <Typography paragraph>{job.selection_process}</Typography>

        <Typography variant="h6" gutterBottom>
          Pay Scale
        </Typography>
        <Typography paragraph>{job.pay_scale}</Typography>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            href={job.application_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Now
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default JobDetails;
