
import React from 'react';

interface IconProps {
  icon: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon, className }) => {
  return <i className={`${icon} ${className || ''}`} aria-hidden="true"></i>;
};
