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
  Grid,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkIcon from "@mui/icons-material/Work";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UserLayout from "../../components/layout/UserLayout";
import useAuth from "../../hooks/useAuth";
import axios from "../../utils/axios";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();

  const fetchJobDetails = useCallback(async () => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`/api/users/jobs/${id}/`, {
        params: { user_id: user._id },
      });
      setJob(response.data);

      // Check if job is saved
      const savedResponse = await axios.get(
        `/api/users/saved-jobs/${user._id}/`
      );
      setIsSaved(savedResponse.data.some((savedJob) => savedJob._id === id));
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  }, [id, navigate, user]);

  useEffect(() => {
    fetchJobDetails();
  }, [fetchJobDetails]);

  const handleSaveToggle = async () => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }

      if (isSaved) {
        await axios.post(`/api/users/unsave-job/${id}/`, {
          user_id: user._id,
        });
      } else {
        await axios.post(`/api/users/save-job/${id}/`, {
          user_id: user._id,
        });
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error toggling save status:", error);
    }
  };

  if (!job) return null;

  return (
    <UserLayout>
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

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Chip
                icon={<BusinessIcon />}
                label={job.department}
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Chip
                icon={<LocationOnIcon />}
                label={job.location}
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Chip
                icon={<WorkIcon />}
                label={job.job_type}
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Chip
                icon={<CalendarTodayIcon />}
                label={`Apply by ${new Date(
                  job.end_date
                ).toLocaleDateString()}`}
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>

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

          {job.notification_pdf && (
            <>
              <Typography variant="h6" gutterBottom>
                Official Notification
              </Typography>
              <Button
                variant="outlined"
                href={job.notification_pdf}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mb: 3 }}
              >
                Download PDF
              </Button>
            </>
          )}

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              href={job.application_link}
              target="_blank"
              rel="noopener noreferrer"
              size="large"
            >
              Apply Now
            </Button>
          </Box>
        </Paper>
      </Box>
    </UserLayout>
  );
};

export default JobDetails;
