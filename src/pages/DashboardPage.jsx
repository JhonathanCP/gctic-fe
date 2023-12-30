import React from 'react';
import {AdminNavbar} from '../components/AdminNavbar';  // Asegúrate de proporcionar la ruta correcta al componente de autenticación
import {Dashboard} from '../components/Dashboard';

export function DashboardPage() {
  return (
    <div>
      <AdminNavbar />
      <Dashboard />
    </div>
  );
};