// src/pages/Home.js
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to the Work Portal
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Find your dream job from thousands of companies
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/job-listings"
          sx={{ mt: 2 }}
        >
          Browse positions
        </Button>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                job list
              </Typography>
              <Typography color="text.secondary">
               Explore hundreds of job opportunities from top companies
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Company archives
              </Typography>
              <Typography color="text.secondary">
                Discover the company and its culture
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
               Apply easily
              </Typography>
              <Typography color="text.secondary">
                You can apply for a job with just a few clicks
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;