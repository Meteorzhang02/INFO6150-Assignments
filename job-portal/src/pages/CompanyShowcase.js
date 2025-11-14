    // src/pages/CompanyShowcase.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';

// 模拟公司数据 - 在实际应用中应从后端API获取
const mockCompanies = [
  {
    id: 1,
    name: "科技创新有限公司",
    image: "https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=科技创新",
    description: "专注于AI解决方案的领先科技公司"
  },
  {
    id: 2,
    name: "数字解决方案公司",
    image: "https://via.placeholder.com/300x200/2196F3/FFFFFF?text=数字解决方案",
    description: "您数字化转型的合作伙伴"
  },
  {
    id: 3,
    name: "全球金融集团",
    image: "https://via.placeholder.com/300x200/FF9800/FFFFFF?text=全球金融",
    description: "国际金融服务提供商"
  },
  {
    id: 4,
    name: "创意设计工作室",
    image: "https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=创意设计",
    description: "屡获殊荣的设计和品牌代理机构"
  },
  {
    id: 5,
    name: "健康科技解决方案",
    image: "https://via.placeholder.com/300x200/00BCD4/FFFFFF?text=健康科技",
    description: "通过技术创新医疗保健"
  },
  {
    id: 6,
    name: "生态能源系统",
    image: "https://via.placeholder.com/300x200/8BC34A/FFFFFF?text=生态能源",
    description: "为更美好未来提供可持续能源解决方案"
  }
];

const CompanyShowcase = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // 模拟API调用
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        // 在实际应用中，这里应该调用 companyAPI.getCompanies()
        await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟延迟
        setCompanies(mockCompanies);
      } catch (err) {
        setError('加载公司数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ my: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          公司展示
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          发现正在招聘的优秀公司
        </Typography>

        <Grid container spacing={3}>
          {companies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company.id}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={company.image}
                  alt={company.name}
                />
                <CardContent>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {company.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CompanyShowcase;