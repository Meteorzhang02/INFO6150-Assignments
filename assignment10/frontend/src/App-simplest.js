// Absolute simplest version, no routing or state management
function App() {
  return (
    <div style={{ 
      padding: '50px', 
      textAlign: 'center',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333' }}>🎉 React Test Page</h1>
      <p style={{ fontSize: '18px', color: '#666' }}>
        If you can see this page, React is working properly!
      </p>
      <button 
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => alert('React is working properly!')}
      >
        Test Button
      </button>
    </div>
  );
}

export default App;