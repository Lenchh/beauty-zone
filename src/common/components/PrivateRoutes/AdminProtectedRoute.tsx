import type { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function AdminProtectedRoute(): JSX.Element {
  const token = localStorage.getItem('role');
  return token === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
}
