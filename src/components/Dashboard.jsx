// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import { getGroups } from '../api/group';
import { getReports } from '../api/report';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [groups, setGroups] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupsResponse = await getGroups();
        const reportsResponse = await getReports();

        setGroups(groupsResponse.data);
        setReports(reportsResponse.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Listado de Grupos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th> {/* Agrega una columna para las acciones */}
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{group.id}</td>
              <td>{group.nombre}</td>
              <td>{group.descripcion}</td>
              <td>
                <Link to={`/admin/editar/grupo/${group.id}`} className="btn btn-primary">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Listado de Reportes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Grupo</th>
            <th>Acciones</th> {/* Agrega una columna para las acciones */}
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.nombre}</td>
              <td>{report.descripcion}</td>
              <td>{report.grupo.nombre}</td>
              <td>
                <Link to={`/admin/editar/reporte/${report.id}`} className="btn btn-primary">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
