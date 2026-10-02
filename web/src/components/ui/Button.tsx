import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyle = {
    borderRadius: 'var(--btn-radius)',
    padding: 'var(--btn-padding-y) var(--btn-padding-x)',
    fontSize: 'var(--btn-font-size)',
    fontWeight: 'var(--btn-font-weight)',
    transition: 'all 0.2s ease-in-out',
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--primary-color)',
      color: '#ffffff',
      border: 'none',
    },
    secondary: {
      backgroundColor: 'var(--secondary-color)',
      color: '#ffffff',
      border: 'none',
    },
    accent: {
      backgroundColor: 'var(--accent-color)',
      color: '#ffffff',
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--primary-color)',
      border: '2px solid var(--primary-color)',
    }
  };

  const style = {
    ...baseStyle,
    ...variantStyles[variant],
    width: fullWidth ? '100%' : 'auto',
  };

  return (
    <button 
      className={`btn border-none hover:opacity-90 ${className}`} 
      style={style} 
      {...props}
    >
      {children}
    </button>
  );
};
