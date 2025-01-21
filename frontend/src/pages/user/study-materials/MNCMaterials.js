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

const MNCMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get(
          "/api/users/study-materials/?category=mnc",
          config
        );
        setMaterials(response.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchMaterials();
  }, [user.token]);

  const renderFileContent = (file) => {
    if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return (
        <img
          src={file}
          alt="Study Material"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      );
    } else if (file.match(/\.(mp4|webm|ogg)$/i)) {
      return (
        <video controls style={{ width: "100%", maxHeight: "400px" }}>
          <source src={file} type={`video/${file.split(".").pop()}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <Button
          variant="contained"
          href={file}
          target="_blank"
          rel="noopener noreferrer"
        >
          View PDF
        </Button>
      );
    }
  };

  return (
    <UserLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          MNC Study Materials
        </Typography>
        <Grid container spacing={3}>
          {materials.map((material) => (
            <Grid item xs={12} md={6} key={material._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {material.title}
                  </Typography>
                  {material.content.text && (
                    <Typography variant="body1" paragraph>
                      {material.content.text}
                    </Typography>
                  )}
                  {material.content.youtube && (
                    <Box sx={{ mt: 2 }}>
                      <iframe
                        width="100%"
                        height="315"
                        src={material.content.youtube}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </Box>
                  )}
                  {material.content.file && (
                    <Box sx={{ mt: 2 }}>
                      {renderFileContent(material.content.file)}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </UserLayout>
  );
};

export default MNCMaterials;
