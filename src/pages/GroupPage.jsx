import React from 'react';
import {AdminNavbar} from '../components/AdminNavbar';  // Asegúrate de proporcionar la ruta correcta al componente de autenticación
import {GroupForm} from '../components/GroupForm';

export function GroupPage() {
  return (
    <div>
      <AdminNavbar />
      <GroupForm />
    </div>
  );
};