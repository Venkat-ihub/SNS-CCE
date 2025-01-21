import { useState, useCallback } from "react";
import axios from "../utils/axios";

const useJobs = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await axios.get("/api/admin/jobs-overview/?status=all");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, []);

  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`/api/admin/jobs/${jobId}/`);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const togglePinJob = async (jobId) => {
    try {
      await axios.post(`/api/admin/jobs/${jobId}/toggle-pin/`);
      fetchJobs();
    } catch (error) {
      console.error("Error toggling pin status:", error);
    }
  };

  return { jobs, fetchJobs, deleteJob, togglePinJob };
};

export default useJobs;
