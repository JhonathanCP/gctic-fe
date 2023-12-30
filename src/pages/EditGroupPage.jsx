import React from 'react';
import {AdminNavbar} from '../components/AdminNavbar';  // Asegúrate de proporcionar la ruta correcta al componente de autenticación
import {EditGroupComponent} from '../components/EditGroupComponent';

export function EditGroupPage() {
  return (
    <div>
      <AdminNavbar />
      <EditGroupComponent />
    </div>
  );
};