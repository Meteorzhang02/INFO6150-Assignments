// src/pages/Contact.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
} from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里可以添加表单提交逻辑
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          联系我们
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                发送消息
              </Typography>
              
              {submitted && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  感谢您的留言！我们会尽快回复您。
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="姓名"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                
                <TextField
                  fullWidth
                  label="邮箱"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                
                <TextField
                  fullWidth
                  label="消息"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mt: 3 }}
                >
                  发送消息
                </Button>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                联系信息
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  地址
                </Typography>
                <Typography variant="body1" paragraph>
                  工作门户大街123号<br/>
                  职业城市, CC 12345<br/>
                  美国
                </Typography>

                <Typography variant="h6" gutterBottom>
                  邮箱
                </Typography>
                <Typography variant="body1" paragraph>
                  info@jobportal.com
                </Typography>

                <Typography variant="h6" gutterBottom>
                  电话
                </Typography>
                <Typography variant="body1">
                  +1 (555) 123-4567
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Contact;