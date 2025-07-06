// Button.tsx
import React, { useState, MouseEventHandler, FC } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  const [pressed, setPressed] = useState(false);

  const handleMouseDown: MouseEventHandler<HTMLButtonElement> = () => setPressed(true);
  const handleMouseUp:   MouseEventHandler<HTMLButtonElement> = () => setPressed(false);

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={onClick}
      style={{
        backgroundColor: '#6ba3e0',
        border: '1px solid #334',
        borderRadius: '4px',
        color: '#000',
        padding: '6px 12px',
        fontSize: '14px',
        cursor: 'pointer',
        outline: 'none',
        userSelect: 'none',
        boxShadow: pressed ? 'none'                    : '4px 4px 0px #000',
        transform: pressed ? 'translate(4px, 4px)' : 'none',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
