// src/pages/About.js
import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const About = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Us
        </Typography>
        
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            our mission
          </Typography>
          <Typography variant="body1" paragraph>
            We connect talented job seekers with outstanding companies. Our platform makes the job search process more efficient and effective for both candidates and employers.
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            The services we provide
          </Typography>
          <Typography variant="body1" paragraph>
            • A comprehensive job list from the certification company<br/>
            • Detailed company profiles and insights<br/>
            • A simple application process<br/>
            • Career resources and guidance
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;