import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Outlet />
    </div>
  );
};
