// src/pages/JobListings.js
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
} from '@mui/material';

const jobPosts = [
  {
    id: 1,
    title: "Full-stack development engineer",
    description: "Join our dynamic team and be dedicated to cutting-edge technologies. Develop and maintain complex Web applications for our diverse customer base。",
    lastUpdated: "Updated one day ago",
    applyLink: "https://example.com/apply/full-stack-developer",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    salary: "¥90,000 - ¥120,000"
  },
  {
    id: 2,
    title: "digital marketing specialist",
    description: "Enhance our digital marketing strategies and promote innovative products. Those proficient in SEO, SEM and social media marketing are preferred.",
    lastUpdated: "Updated one day ago",
    applyLink: "https://example.com/apply/digital-marketing-specialist",
    skills: ["SEO", "SEM", "Social media "," Data analysis"],
    salary: "¥60,000 - ¥80,000"
  },
  {
    id: 3,
    title: "UX/UI Designer",
    description: "Create captivating user experiences and visually appealing designs. Work with cross-functional teams to turn ideas into reality.",
    lastUpdated: "Updated one day ago",
    applyLink: "https://example.com/apply/ux-ui-designer",
    skills: ["Figma", "Adobe XD", "User research "," Prototyping"],
    salary: "¥70,000 - ¥95,000"
  },
  {
    id: 4,
    title: "Data scientist",
    description: "Discover insights from massive datasets by leveraging advanced analytics and machine learning. One must be proficient in Python and R.",
    lastUpdated: "Updated one day ago",
    applyLink: "https://example.com/apply/data-scientist",
    skills: ["Python", "R", "Machine learning", "SQL"],
    salary: "¥100,000 - ¥140,000"
  },
  {
    id: 5,
    title: "Customer Support Representative",
    description: "Provide outstanding customer service and support. Excellent communication skills and problem-solving abilities are key",
    lastUpdated: "Updated one day ago",
    applyLink: "https://example.com/apply/customer-support-representative",
    skills: ["Communication skills "," problem-solving ", "CRM", "customer service"],
    salary: "¥45,000 - ¥60,000"
  },
  {
    id: 6,
    title: "project manager",
    description: "Guide and coordinate the project team to ensure the successful delivery of the project. Strong organizational and leadership skills are required.",
    lastUpdated: "Updated one day ago",
    applyLink: "https://example.com/apply/project-manager",
    skills: ["Agile Development ", "Scrum"," Leadership ", "JIRA"],
    salary: "¥85,000 - ¥110,000"
  },
];

const JobListings = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
         job list
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Find your next career opportunity
        </Typography>

        <Grid container spacing={3}>
          {jobPosts.map((job) => (
            <Grid item xs={12} key={job.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {job.title}
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {job.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Required skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {job.skills.map((skill, index) => (
                        <Chip key={index} label={skill} variant="outlined" />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      {job.salary}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {job.lastUpdated}
                    </Typography>
                  </Box>
                </CardContent>
                
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary"
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default JobListings;