import React from 'react';

const Loader = () => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 20px',
        gap: '24px',
        gridColumn: '1 / -1',
      }}
      role="status"
      aria-label="Loading"
    >
      {/* Minimal luxury loader */}
      <div 
        style={{
          width: '40px',
          height: '40px',
          border: '1px solid var(--border)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <span 
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          color: 'var(--foreground-subtle)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
        }}
      >
        Loading
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
