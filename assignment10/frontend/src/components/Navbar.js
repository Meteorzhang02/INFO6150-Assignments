import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Assignment 10
        </Typography>
        <Box>
          {user && (
            <>
              <Typography variant="body1" component="span" sx={{ mr: 2 }}>
                Welcome, {user.name} ({user.type})
              </Typography>
              {user.type === 'admin' && (
                <>
                  <Button color="inherit" onClick={() => navigate('/employees')}>
                    Employees
                  </Button>
                  <Button color="inherit" onClick={() => navigate('/add-job')}>
                    Add Job
                  </Button>
                </>
              )}
              {user.type === 'employee' && (
                <Button color="inherit" onClick={() => navigate('/jobs')}>
                  Jobs
                </Button>
              )}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;