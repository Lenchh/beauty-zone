import type { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoutes(): JSX.Element {
  const userId = localStorage.getItem('userId');
  return userId ? <Outlet /> : <Navigate to="/login" replace />;
}
