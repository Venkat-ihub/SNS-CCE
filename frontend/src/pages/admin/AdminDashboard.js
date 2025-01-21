import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import useAuth from "../../hooks/useAuth";
import axios from "../../utils/axios";
import AddStudyMaterialForm from "../../components/forms/AddStudyMaterialForm";
import StudyMaterialsTable from "./StudyMaterialsTable";

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    category: "",
    location: "",
    description: "",
    eligibility: "",
    selection_process: "",
    pay_scale: "",
    end_date: "",
    application_link: "",
    job_type: "Full-time",
    vacancies: "",
    notification_pdf: "",
  });
  const [openStudyMaterialForm, setOpenStudyMaterialForm] = useState(false);
  const [refreshMaterials, setRefreshMaterials] = useState(0);

  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchJobs = useCallback(async () => {
    try {
      const response = await axios.get("/api/admin/jobs-overview/?status=all");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }, []);

  useEffect(() => {
    if (!user || user.user_type !== "admin") {
      navigate("/login");
      return;
    }
    fetchJobs();
  }, [user, navigate, fetchJobs]);

  const handleOpenDialog = (job = null) => {
    if (job) {
      setSelectedJob(job);
      setFormData({
        title: job.title || "",
        department: job.department || "",
        category: job.category || "",
        location: job.location || "",
        description: job.description || "",
        eligibility: job.eligibility || "",
        selection_process: job.selection_process || "",
        pay_scale: job.pay_scale || "",
        end_date: job.end_date?.split("T")[0] || "",
        application_link: job.application_link || "",
        job_type: job.job_type || "Full-time",
        vacancies: job.vacancies || "",
        notification_pdf: job.notification_pdf || "",
      });
    } else {
      setSelectedJob(null);
      setFormData({
        title: "",
        department: "",
        category: "",
        location: "",
        description: "",
        eligibility: "",
        selection_process: "",
        pay_scale: "",
        end_date: "",
        application_link: "",
        job_type: "Full-time",
        vacancies: "",
        notification_pdf: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const submitData = {
        ...formData,
        status: "live",
      };

      if (selectedJob) {
        await axios.put(`/api/admin/jobs/${selectedJob._id}/`, submitData);
      } else {
        await axios.post("/api/admin/jobs/", submitData);
      }
      fetchJobs();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`/api/admin/jobs/${jobId}/`);
        fetchJobs();
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  const handleTogglePin = async (jobId) => {
    try {
      await axios.post(`/api/admin/jobs/${jobId}/toggle-pin/`);
      fetchJobs();
    } catch (error) {
      console.error("Error toggling pin status:", error);
    }
  };

  const handleEditMaterial = (material) => {
    setFormData({
      title: material.title,
      category: material.category,
      text_content: material.content.text || "",
      youtube_link: material.content.youtube || "",
      pdf_link: material.content.pdf || "",
    });
    setOpenStudyMaterialForm(true);
  };

  const handleDeleteMaterial = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this study material?")
    ) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.delete(`/api/users/study-materials/${id}/delete/`, config);
        setRefreshMaterials((prev) => prev + 1);
      } catch (error) {
        console.error("Error deleting study material:", error);
      }
    }
  };

  return (
    <AdminLayout>
      <Container>
        <Box sx={{ mt: 4 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Admin Dashboard
            </Typography>
            <Typography variant="h6" gutterBottom>
              Welcome, {user?.name}!
            </Typography>
          </Paper>

          {/* Jobs Management Section */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6">Manage Jobs</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
              >
                Add New Job
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<MenuBookIcon />}
                onClick={() => setOpenStudyMaterialForm(true)}
                sx={{ ml: 2 }}
              >
                Add Study Material
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Vacancies</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job._id}>
                      <TableCell>
                        <IconButton
                          onClick={() => handleTogglePin(job._id)}
                          color={job.pinned ? "primary" : "default"}
                        >
                          {job.pinned ? (
                            <PushPinIcon />
                          ) : (
                            <PushPinOutlinedIcon />
                          )}
                        </IconButton>
                        {job.title}
                      </TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.category}</TableCell>
                      <TableCell>{job.vacancies}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>
                        {new Date(job.end_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{job.status}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleOpenDialog(job)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteJob(job._id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Add/Edit Job Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {selectedJob ? "Edit Job" : "Add New Job"}
            </DialogTitle>
            <DialogContent>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
              >
                <TextField
                  name="title"
                  label="Job Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField
                  name="department"
                  label="Department"
                  value={formData.department}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField
                  name="category"
                  label="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  name="vacancies"
                  label="Number of Vacancies"
                  type="number"
                  value={formData.vacancies}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  name="location"
                  label="Location"
                  value={formData.location}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
                <TextField
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  fullWidth
                  required
                />
                <TextField
                  name="eligibility"
                  label="Eligibility"
                  value={formData.eligibility}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  fullWidth
                />
                <TextField
                  name="selection_process"
                  label="Selection Process"
                  value={formData.selection_process}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  fullWidth
                />
                <TextField
                  name="pay_scale"
                  label="Pay Scale"
                  value={formData.pay_scale}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  name="end_date"
                  label="End Date"
                  type="date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  name="application_link"
                  label="Application Link"
                  value={formData.application_link}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  name="notification_pdf"
                  label="Notification PDF Link"
                  value={formData.notification_pdf}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  name="job_type"
                  label="Job Type"
                  value={formData.job_type}
                  onChange={handleInputChange}
                  select
                  fullWidth
                  required
                >
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                  <MenuItem value="Permanent">Permanent</MenuItem>
                </TextField>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                {selectedJob ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </Dialog>

          <StudyMaterialsTable
            onEdit={handleEditMaterial}
            onDelete={handleDeleteMaterial}
            refreshTrigger={refreshMaterials}
          />
          <AddStudyMaterialForm
            open={openStudyMaterialForm}
            onClose={() => setOpenStudyMaterialForm(false)}
            onSuccess={() => {
              setRefreshMaterials((prev) => prev + 1);
            }}
          />
        </Box>
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
