// EditReportComponent.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getReport, updateReport, deleteReport } from '../api/report';
import { getGroups } from '../api/group';

export function EditReportComponent () {
  const navigate = useNavigate();
  const { id } = useParams();
  const [report, setReport] = useState({
    nombre: '',
    descripcion: '',
    link: '',
    grupo: {
      id: '',
      nombre: '',
    },
    // Agrega más campos según sea necesario
  });
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseReport = await getReport(id);
        const responseGroups = await getGroups();

        setReport(responseReport.data);
        setGroups(responseGroups.data);
      } catch (error) {
        console.error('Error al obtener el reporte:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateReport(id, report);
      // Redirige a la página de administración de reportes después de la actualización
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error al actualizar el reporte:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReport(id);
      // Redirige a la página de administración de reportes después de eliminar
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error al eliminar el reporte:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Reporte</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={report.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción:
          </label>
          <input
            type="text"
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={report.descripcion}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="link" className="form-label">
            Link:
          </label>
          <input
            type="text"
            className="form-control"
            id="link"
            name="link"
            value={report.link}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="grupo" className="form-label">
            Grupo:
          </label>
          <select
            className="form-control"
            id="grupo"
            name="grupo-id"
            value={report['grupo-id']}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar grupo</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.nombre}
              </option>
            ))}
          </select>
        </div>
        {/* Agrega más campos según sea necesario */}
        <button type="submit" className="btn btn-primary">
          Guardar cambios
        </button>
        <button type="button" onClick={handleDelete} className="btn btn-danger" style={{ marginLeft: '10px' }}>
          Eliminar
        </button>
      </form>
    </div>
  );
};