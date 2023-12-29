// UserPermissionsForm.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPermissions, addReport, addGroup, removeReport, removeGroup, addAllPermissions } from '../api/permissions';
import { getReports } from '../api/report';
import { getGroups } from '../api/group';

const UserPermissionsForm = () => {
  const { id } = useParams();
  const [permissions, setPermissions] = useState({
    permisos_grupos: [],
    permisos_reportes: [],
  });
  const [reports, setReports] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedReport, setSelectedReport] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permissionsResponse = await getPermissions(id);
        const reportsResponse = await getReports();
        const groupsResponse = await getGroups();

        setPermissions(permissionsResponse.data);
        setReports(reportsResponse.data);
        setGroups(groupsResponse.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddReport = async () => {
    try {
      const data = {
        usuario_id: parseInt(id),
        reporte_id: parseInt(selectedReport),
      };
      await addReport(data);
      const updatedPermissions = await getPermissions(id);
      setPermissions(updatedPermissions.data);
    } catch (error) {
      console.error('Error al agregar permisos de reporte:', error);
    }
  };

  const handleAddGroup = async () => {
    try {
      const data = {
        usuario_id: parseInt(id),
        grupo_id: parseInt(selectedGroup),
      };
      await addGroup(data);
      const updatedPermissions = await getPermissions(id);
      setPermissions(updatedPermissions.data);
    } catch (error) {
      console.error('Error al agregar permisos de grupo:', error);
    }
  };

  const handleRemoveReport = async (reportId) => {
    try {
      const data = {
        usuario_id: parseInt(id),
        reporte_id: parseInt(reportId),
      };
      await removeReport(data);
      const updatedPermissions = await getPermissions(id);
      setPermissions(updatedPermissions.data);
    } catch (error) {
      console.error('Error al eliminar permisos de reporte:', error);
    }
  };

  const handleRemoveGroup = async (groupId) => {
    try {
      const data = {
        usuario_id: parseInt(id),
        grupo_id: parseInt(groupId),
      };
      await removeGroup(data);
      const updatedPermissions = await getPermissions(id);
      setPermissions(updatedPermissions.data);
    } catch (error) {
      console.error('Error al eliminar permisos de grupo:', error);
    }
  };

  const handleAddAllPermissions = async () => {
    try {
      await addAllPermissions(id);
      const updatedPermissions = await getPermissions(id);
      setPermissions(updatedPermissions.data);
    } catch (error) {
      console.error('Error al agregar todos los permisos:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Permisos del Usuario</h2>
      <div className="mb-3">
        <label className="form-label">Agregar Permiso de Reporte:</label>
        <div className="d-flex">
          <select className="form-select me-2" value={selectedReport} onChange={(e) => setSelectedReport(e.target.value)}>
            <option value="" disabled>
              Seleccione un reporte
            </option>
            {reports.map((report) => (
              <option key={report.id} value={report.id}>
                {report.nombre}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={handleAddReport}>Agregar Permiso</button>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Agregar Permiso de Grupo:</label>
        <div className="d-flex">
          <select className="form-select me-2" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
            <option value="" disabled>
              Seleccione un grupo
            </option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.nombre}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={handleAddGroup}>Agregar Permiso</button>
        </div>
      </div>

      <h3>Permisos de Reporte:</h3>
      <ul>
        {permissions.permisos_reportes.map((permiso) => (
          <li key={permiso.id}>
            {`Reporte ID: ${permiso.reporte}`}
            <button className="btn btn-danger ms-2" onClick={() => handleRemoveReport(permiso.id)}>Eliminar Permiso</button>
          </li>
        ))}
      </ul>

      <h3>Permisos de Grupo:</h3>
      <ul>
        {permissions.permisos_grupos.map((permiso) => (
          <li key={permiso.id}>
            {`Grupo ID: ${permiso.grupo}`}
            <button className="btn btn-danger ms-2" onClick={() => handleRemoveGroup(permiso.id)}>Eliminar Permiso</button>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <button className="btn btn-success" onClick={handleAddAllPermissions}>Agregar Todos los Permisos</button>
      </div>
    </div>
  );
};

export default UserPermissionsForm;
