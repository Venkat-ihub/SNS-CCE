import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import UserLayout from "../../components/layout/UserLayout";
import JobCard from "../../components/common/JobCard";
import useAuth from "../../hooks/useAuth";
import axios from "../../utils/axios";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchSavedJobs = useCallback(async () => {
    try {
      const response = await axios.get(`/api/users/saved-jobs/${user._id}/`);
      setSavedJobs(response.data);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  }, [user?._id]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchSavedJobs();
  }, [user, navigate, fetchSavedJobs]);

  const handleUnsaveJob = async (jobId) => {
    try {
      await axios.post(`/api/users/unsave-job/${jobId}/`, {
        user_id: user._id,
      });
      setSavedJobs(savedJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error unsaving job:", error);
    }
  };

  return (
    <UserLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Saved Jobs
        </Typography>

        <Grid container spacing={3}>
          {savedJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <JobCard
                job={{ ...job, isSaved: true }}
                onSaveToggle={handleUnsaveJob}
              />
            </Grid>
          ))}
          {savedJobs.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary" align="center">
                No saved jobs yet
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </UserLayout>
  );
};

export default SavedJobs;
