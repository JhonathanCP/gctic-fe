import React from 'react';
import {AdminNavbar} from '../components/AdminNavbar';  // Asegúrate de proporcionar la ruta correcta al componente de autenticación
import {EditReportComponent} from '../components/EditReportComponent';

export function EditReportPage() {
  return (
    <div>
      <AdminNavbar />
      <EditReportComponent />
    </div>
  );
};