import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Simple test components
const TestHome = () => (
  <div style={{ padding: '20px' }}>
    <h1>Assignment 10 - Test Page</h1>
    <p>If you can see this, React basics are working!</p>
    <div>
      <h2>Test Links:</h2>
      <a href="/login">Login Page</a>
    </div>
  </div>
);

const TestLogin = () => (
  <div style={{ padding: '20px' }}>
    <h1>Login Page</h1>
    <p>This page should display normally</p>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <nav style={{ padding: '10px', background: '#f0f0f0' }}>
            <strong>Assignment 10 - Navigation</strong>
          </nav>
          <Routes>
            <Route path="/" element={<TestHome />} />
            <Route path="/login" element={<TestLogin />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;