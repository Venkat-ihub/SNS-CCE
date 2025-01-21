import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../utils/axios";
import useAuth from "../../hooks/useAuth";

const StudyMaterialsTable = ({ onEdit, onDelete, refreshTrigger }) => {
  const [materials, setMaterials] = useState([]);
  const { user } = useAuth();

  const fetchMaterials = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(
        "/api/users/admin/study-materials/",
        config
      );
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching study materials:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [refreshTrigger]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Study Materials
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Content Types</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material._id}>
                <TableCell>{material.title}</TableCell>
                <TableCell>{material.category}</TableCell>
                <TableCell>
                  {Object.entries(material.content)
                    .filter(([_, value]) => value !== null)
                    .map(([type]) => type)
                    .join(", ")}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(material)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(material._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudyMaterialsTable;
