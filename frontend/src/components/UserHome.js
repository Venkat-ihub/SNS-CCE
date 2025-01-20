import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardActions,
  Chip,
  Tooltip,
  TextField,
  InputAdornment,
  FormControl,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import axios from "../config/axios";

const PageContainer = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  padding: "2rem 0",
});

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 2rem",
  marginBottom: "2rem",
});

const JobGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "2rem",
  padding: "0 2rem",
});

const JobCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
});

const JobTitle = styled(Typography)({
  fontWeight: 600,
  marginBottom: "0.5rem",
  display: "-webkit-box",
  "-webkit-line-clamp": 2,
  "-webkit-box-orient": "vertical",
  overflow: "hidden",
});

const JobDescription = styled(Typography)({
  color: "#666",
  marginBottom: "1rem",
  display: "-webkit-box",
  "-webkit-line-clamp": 3,
  "-webkit-box-orient": "vertical",
  overflow: "hidden",
});

const SearchContainer = styled(Box)({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  marginBottom: "2rem",
  padding: "0 2rem",
});

const UserHome = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("live");
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(userInfo);
    if (parsedUser.user_type === "admin") {
      navigate("/admin-home");
      return;
    }
    setUser(parsedUser);
    fetchJobs();
    // Load saved jobs from localStorage
    const saved = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setSavedJobs(saved);

    // Set up periodic refresh of job data
    const refreshInterval = setInterval(fetchJobs, 30000); // Refresh every 30 seconds

    // Add event listener for job view completion
    const handleJobViewComplete = () => {
      fetchJobs();
    };

    window.addEventListener("jobViewComplete", handleJobViewComplete);

    return () => {
      clearInterval(refreshInterval);
      window.removeEventListener("jobViewComplete", handleJobViewComplete);
    };
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      console.log("Fetching jobs with status filter:", statusFilter);
      const response = await axios.get(
        `/api/admin/jobs-overview/?status=${statusFilter}`
      );
      console.log("API Response:", response);
      console.log("Fetched jobs:", response.data);
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Update useEffect to fetch saved jobs
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo || !userInfo._id) {
          console.error("No user info found");
          navigate("/login");
          return;
        }
        const response = await axios.get(
          `/api/admin/saved-jobs/${userInfo._id}/`
        );
        setSavedJobs(response.data.map((job) => job._id));
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    fetchSavedJobs();
  }, [navigate]);

  useEffect(() => {
    // Extract unique categories from jobs
    const uniqueCategories = [...new Set(jobs.map((job) => job.department))];
    setCategories(uniqueCategories);
  }, [jobs]);

  // Filter jobs based on search query and category
  useEffect(() => {
    let filtered = [...jobs];
    console.log("Filtering jobs:", jobs); // Debug log

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((job) => job.department === selectedCategory);
    }

    console.log("Filtered jobs:", filtered); // Debug log
    setFilteredJobs(filtered);
  }, [jobs, searchQuery, selectedCategory]);

  // Update the useEffect that calls fetchJobs
  useEffect(() => {
    if (user) {
      // Only fetch if user exists
      console.log("Calling fetchJobs with statusFilter:", statusFilter);
      fetchJobs();
    }
  }, [statusFilter, user]); // Add dependencies

  const handleSaveJob = async (jobId, e) => {
    e.stopPropagation(); // Stop event propagation
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo._id) {
        console.error("No user info found");
        navigate("/login");
        return;
      }
      const userId = userInfo._id;

      if (savedJobs.includes(jobId)) {
        await axios.post(`/api/admin/jobs/${jobId}/unsave/`, {
          user_id: userId,
        });
        setSavedJobs((prev) => prev.filter((id) => id !== jobId));
      } else {
        await axios.post(`/api/admin/jobs/${jobId}/save/`, { user_id: userId });
        setSavedJobs((prev) => [...prev, jobId]);
      }
    } catch (error) {
      console.error("Error saving/unsaving job:", error);
    }
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    handleClose();
    navigate(path);
  };

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (!user) return null;

  return (
    <PageContainer>
      <Header>
        <Box>
          <Typography variant="h4" sx={{ color: "#2c3e50", fontWeight: "600" }}>
            Job Listings
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Find your next opportunity
          </Typography>
        </Box>
        <IconButton onClick={handleProfileClick} size="large">
          <AccountCircleIcon sx={{ fontSize: 40, color: "#2c3e50" }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={() => handleMenuItemClick("/profile")}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile Info</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("/saved-jobs")}>
            <ListItemIcon>
              <BookmarkIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Saved Jobs</ListItemText>
          </MenuItem>
        </Menu>
      </Header>

      <Box sx={{ px: 2, mb: 4 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              variant="outlined"
            >
              <MenuItem value="live">Live Jobs</MenuItem>
              <MenuItem value="expired">Expired Jobs</MenuItem>
              <MenuItem value="all">All Jobs</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Show result count */}
        <Typography variant="body2" color="text.secondary">
          {filteredJobs.length} jobs found
        </Typography>
      </Box>

      <JobGrid>
        {filteredJobs.map((job) => (
          <JobCard
            key={job._id}
            elevation={2}
            onClick={() => handleJobClick(job._id)}
            sx={{
              cursor: "pointer",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s ease-in-out",
              opacity: job.status === "expired" ? 0.7 : 1,
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
                <JobTitle variant="h6">{job.title}</JobTitle>
                {job.status === "expired" && (
                  <Chip
                    label="Expired"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>

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

              <JobDescription variant="body2">{job.description}</JobDescription>
            </CardContent>

            <CardActions
              sx={{
                justifyContent: "space-between",
                px: 2,
                pb: 2,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tooltip title="View count">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <VisibilityIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {job.views || 0}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>

              <Box>
                <Tooltip
                  title={
                    savedJobs.includes(job._id)
                      ? "Remove from saved"
                      : "Save job"
                  }
                >
                  <IconButton
                    onClick={(e) => handleSaveJob(job._id, e)}
                    color={savedJobs.includes(job._id) ? "primary" : "default"}
                  >
                    {savedJobs.includes(job._id) ? (
                      <BookmarkIcon />
                    ) : (
                      <BookmarkBorderIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </CardActions>
          </JobCard>
        ))}
      </JobGrid>
    </PageContainer>
  );
};

export default UserHome;
