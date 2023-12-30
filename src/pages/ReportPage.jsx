import React from 'react';
import {AdminNavbar} from '../components/AdminNavbar';  // Asegúrate de proporcionar la ruta correcta al componente de autenticación
import {ReportForm} from '../components/ReportForm';

export function ReportPage() {
  return (
    <div>
      <AdminNavbar />
      <ReportForm />
    </div>
  );
};