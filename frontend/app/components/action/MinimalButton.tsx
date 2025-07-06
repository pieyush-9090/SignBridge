import React from 'react';

interface MinimalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const MinimalButton: React.FC<MinimalButtonProps> = ({ children = 'Click here', ...props }) => (
  <button
    className="px-5 py-2 rounded-lg border"
    style={{
      borderColor: 'var(--foreground)',
      color: 'var(--foreground)',
      background: 'transparent',
      fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
      fontWeight: 500,
      transition: 'background 0.2s',
    }}
    onMouseOver={e => (e.currentTarget.style.background = 'rgba(23,23,23,0.07)')}
    onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
    {...props}
  >
    {children}
  </button>
);

export default MinimalButton; 