// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { PanelPage } from './pages/PanelPage';
import GroupForm from './components/GroupFrorm';
import ReportForm from './components/ReportForm';
import Dashboard from './components/Dashboard';
import EditGroupComponent from './components/EditGroupComponent';
import EditReportComponent from './components/EditReportComponent';
import UserList from './components/UserList';
import UserPermissionsForm from './components/UserPermissionsForm';
import { Toaster } from 'react-hot-toast';
import PrivateRoutes from './components/PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        {/* Usa PrivateRoute para proteger la ruta */}
        <Route element={<PrivateRoutes />}>
          <Route path="/panel" element={<PanelPage />} />
          <Route path="/admin/reportes" element={<ReportForm />} />
          <Route path="/admin/grupos" element={<GroupForm />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/editar/grupo/:id" element={<EditGroupComponent />} />
          <Route path="/admin/editar/reporte/:id" element={<EditReportComponent />} />
          <Route path="/admin/usuarios" element={<UserList />} />
          <Route path="/admin/usuarios/permisos/:id" element={<UserPermissionsForm />} />          
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
