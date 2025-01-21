import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import UserLayout from "../../../components/layout/UserLayout";
import axios from "../../../utils/axios";
import useAuth from "../../../hooks/useAuth";

const CentralMaterials = () => {
  return (
    <UserLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Central Government Study Materials
        </Typography>
        {/* Add content here */}
      </Box>
    </UserLayout>
  );
};

export default CentralMaterials;
