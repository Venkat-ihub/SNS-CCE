import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Divider,
} from "@mui/material";
import UserLayout from "../../components/layout/UserLayout";
import useAuth from "../../hooks/useAuth";
import axios from "../../utils/axios";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile_number: user?.mobile_number || "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");

      const response = await axios.put(`/api/users/update-profile/`, {
        user_id: user._id,
        name: formData.name,
        mobile_number: formData.mobile_number,
      });

      // Update local storage and state
      const updatedUser = { ...user, ...response.data };
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccess("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to update profile");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_password) {
      setError("New passwords do not match");
      return;
    }

    try {
      setError("");
      setSuccess("");

      await axios.put(`/api/users/update-profile/`, {
        user_id: user._id,
        current_password: formData.current_password,
        new_password: formData.new_password,
      });

      setSuccess("Password changed successfully");
      setFormData((prev) => ({
        ...prev,
        current_password: "",
        new_password: "",
        confirm_password: "",
      }));
    } catch (error) {
      setError(error.response?.data?.error || "Failed to change password");
    }
  };

  return (
    <UserLayout>
      <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Profile Settings
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleUpdateProfile}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.email}
                  disabled
                  helperText="Email cannot be changed"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                {isEditing ? (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button variant="contained" type="submit" sx={{ flex: 1 }}>
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setIsEditing(false)}
                      sx={{ flex: 1 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => setIsEditing(true)}
                    fullWidth
                  >
                    Edit Profile
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom>
            Change Password
          </Typography>

          <form onSubmit={handleChangePassword}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Current Password"
                  name="current_password"
                  value={formData.current_password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={
                    !formData.current_password ||
                    !formData.new_password ||
                    !formData.confirm_password
                  }
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </UserLayout>
  );
};

export default UserProfile;
