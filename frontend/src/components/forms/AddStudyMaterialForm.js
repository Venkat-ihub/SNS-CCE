import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";

const AddStudyMaterialForm = ({ open, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    category: "mnc",
    text_content: "",
    youtube_link: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("category", formData.category);
      formDataToSend.append(
        "content",
        JSON.stringify({
          text: formData.text_content || null,
          youtube: formData.youtube_link || null,
        })
      );
      if (file) {
        formDataToSend.append("file", file);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(
        "/api/users/study-materials/add/",
        formDataToSend,
        config
      );
      onSuccess?.();
      onClose();
      setFormData({
        title: "",
        category: "mnc",
        text_content: "",
        youtube_link: "",
      });
      setFile(null);
    } catch (error) {
      console.error("Error adding study material:", error);
      setError(error.response?.data?.error || "Failed to add study material");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Update valid file types to include video
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/jpg",
        "video/mp4",
        "video/webm",
        "video/ogg",
      ];
      if (!validTypes.includes(selectedFile.type)) {
        setError(
          "Please upload only PDF, image (JPEG, PNG) or video (MP4, WebM, OGG) files"
        );
        return;
      }
      // Increase size limit for videos (50MB)
      const maxSize = selectedFile.type.startsWith("video/")
        ? 50 * 1024 * 1024
        : 5 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        setError(
          `File size should be less than ${
            maxSize === 50 * 1024 * 1024 ? "50MB" : "5MB"
          }`
        );
        return;
      }
      setFile(selectedFile);
      setError("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Study Material</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <MenuItem value="mnc">MNC</MenuItem>
              <MenuItem value="state">State Government</MenuItem>
              <MenuItem value="central">Central Government</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Content (Add one or more)
          </Typography>

          <TextField
            fullWidth
            label="Text Content"
            name="text_content"
            value={formData.text_content}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />

          <TextField
            fullWidth
            label="YouTube Link"
            name="youtube_link"
            value={formData.youtube_link}
            onChange={handleChange}
            margin="normal"
          />

          <Box sx={{ mt: 2 }}>
            <input
              accept="application/pdf,image/*,video/mp4,video/webm,video/ogg"
              style={{ display: "none" }}
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload PDF, Image or Video
              </Button>
            </label>
            {file && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {file.name} (
                {(file.size / (1024 * 1024)).toFixed(2)} MB)
              </Typography>
            )}
          </Box>

          {!formData.text_content && !formData.youtube_link && !file && (
            <Typography color="error" variant="caption" sx={{ mt: 1 }}>
              Please provide at least one type of content
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!formData.text_content && !formData.youtube_link && !file}
          >
            Add Material
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddStudyMaterialForm;
