import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PublicIcon from "@mui/icons-material/Public";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import UserLayout from "../../components/layout/UserLayout";

const categories = [
  {
    title: "MNC",
    description: "Study materials for Multinational Companies",
    icon: BusinessIcon,
    path: "/study-materials/mnc",
  },
  {
    title: "State Government Jobs",
    description: "Preparation materials for state government exams",
    icon: AccountBalanceIcon,
    path: "/study-materials/state",
  },
  {
    title: "Central Government Jobs",
    description: "Resources for central government job preparation",
    icon: PublicIcon,
    path: "/study-materials/central",
  },
  {
    title: "Others",
    description: "Additional study materials and resources",
    icon: MenuBookIcon,
    path: "/study-materials/others",
  },
];

const StudyMaterial = () => {
  const navigate = useNavigate();

  return (
    <UserLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Study Materials
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={category.title}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(category.path)}
                    sx={{ height: "100%" }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        height: "100%",
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 48,
                          mb: 2,
                          color: "primary.main",
                        }}
                      />
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        {category.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {category.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </UserLayout>
  );
};

export default StudyMaterial;
