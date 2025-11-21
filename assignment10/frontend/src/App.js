import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './utils/PrivateRoute';

// Pages
import Login from './pages/Login';
import Employees from './pages/Employees';
import AddJob from './pages/AddJob';
import Jobs from './pages/Jobs';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/employees"
                element={
                  <PrivateRoute requiredType="admin">
                    <Employees />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-job"
                element={
                  <PrivateRoute requiredType="admin">
                    <AddJob />
                  </PrivateRoute>
                }
              />
              <Route
                path="/jobs"
                element={
                  <PrivateRoute requiredType="employee">
                    <Jobs />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;