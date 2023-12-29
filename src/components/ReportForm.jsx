// ReportForm.jsx
import React, { useState, useEffect } from 'react';
import { createReport } from '../api/report';
import { getGroups } from '../api/group';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportForm = () => {
  const [reportName, setReportName] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [reportLink, setReportLink] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getGroups();
        setGroups(response.data);
      } catch (error) {
        console.error('Error al obtener los grupos:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reportData = {
        nombre: reportName,
        descripcion: reportDescription,
        grupo: selectedGroup,
        link: reportLink
        // Puedes agregar más campos según necesites
      };

      // Llamamos a la función createReport con los datos del reporte
      const response = await createReport(reportData);

      // Aquí puedes manejar la respuesta del servidor, si es necesario
      console.log('Reporte creado:', response.data);

      // Restablecer el formulario u realizar otras acciones necesarias
      setReportName('');
      setReportDescription('');
      setSelectedGroup('');
      setReportLink('')
    } catch (error) {
      console.error('Error al crear el reporte:', error);
      // Manejar el error según sea necesario
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Nuevo Reporte</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="reportName" className="form-label">Nombre del reporte:</label>
          <input
            type="text"
            className="form-control"
            id="reportName"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reportDescription" className="form-label">Descripción del reporte:</label>
          <input
            type="text"
            className="form-control"
            id="reportDescription"
            value={reportDescription}
            onChange={(e) => setReportDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="selectedGroup" className="form-label">Seleccionar Grupo:</label>
          <select
            className="form-select"
            id="selectedGroup"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">Seleccione un grupo</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>{group.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="reportLink" className="form-label">Link de BI:</label>
          <input
            type="text"
            className="form-control"
            id="reportLink"
            value={reportLink}
            onChange={(e) => setReportLink(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">Crear Reporte</button>
      </form>
    </div>
  );
};

export default ReportForm;
