import React from 'react';

const DashboardP = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f4f4f9',
          padding: '20px',
        }}
        className="dashboard"
      >
        <div
          style={{
            width: '400px',
            backgroundColor: '#007bff',
            marginRight: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <h2>Left Panel</h2>
          <p>This is the blue panel with a fixed width of 400px.</p>
        </div>
        <div
          style={{
            width: '700px',
            backgroundColor: '#dc3545',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <h2>Right Panel</h2>
          <p>This is the red panel with a fixed width of 700px.</p>
        </div>
      </div>
    </>
  );
};

export default DashboardP;