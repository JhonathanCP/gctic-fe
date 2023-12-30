// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { PanelPage } from './pages/PanelPage';
import {GroupPage} from './pages/GroupPage';
import {ReportPage} from './pages/ReportPage';
import {DashboardPage} from './pages/DashboardPage';
import {EditGroupPage} from './pages/EditGroupPage';
import {EditReportPage} from './pages/EditReportPage';
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
          <Route path="/admin/reportes" element={<ReportPage />} />
          <Route path="/admin/grupos" element={<GroupPage />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/editar/grupo/:id" element={<EditGroupPage />} />
          <Route path="/admin/editar/reporte/:id" element={<EditReportPage />} />
          <Route path="/admin/usuarios" element={<UserList />} />
          <Route path="/admin/usuarios/permisos/:id" element={<UserPermissionsForm />} />
          
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
