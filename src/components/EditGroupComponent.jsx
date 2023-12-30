// EditGroupComponent.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGroup, updateGroup, deleteGroup } from '../api/group';

export function EditGroupComponent () {
  const navigate = useNavigate();
  const { id } = useParams();
  const [group, setGroup] = useState({
    nombre: '',
    descripcion: '',
    // Agrega más campos según sea necesario
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGroup(id);
        setGroup(response.data);
      } catch (error) {
        console.error('Error al obtener el grupo:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    setGroup({
      ...group,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateGroup(id, group);
      // Redirige a la página de administración de grupos después de la actualización
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error al actualizar el grupo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteGroup(id);
      // Redirige a la página de administración de grupos después de eliminar
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error al eliminar el grupo:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Grupo</h2>
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
            value={group.nombre}
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
            value={group.descripcion}
            onChange={handleInputChange}
          />
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