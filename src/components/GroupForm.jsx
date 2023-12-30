// GroupForm.jsx
import React, { useState } from 'react';
import { createGroup } from '../api/group';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el archivo CSS de Bootstrap

export function GroupForm () {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const groupData = {
        nombre: groupName,
        descripcion: groupDescription,
        // Puedes agregar más campos según necesites
      };

      // Llamamos a la función createGroup con los datos del grupo
      const response = await createGroup(groupData);

      // Aquí puedes manejar la respuesta del servidor, si es necesario
      console.log('Grupo creado:', response.data);

      // Restablecer el formulario u realizar otras acciones necesarias
      setGroupName('');
      setGroupDescription('');
    } catch (error) {
      console.error('Error al crear el grupo:', error);
      // Manejar el error según sea necesario
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Nuevo Grupo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="groupName" className="form-label">Nombre del grupo:</label>
          <input
            type="text"
            className="form-control"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="groupDescription" className="form-label">Descripción del grupo:</label>
          <input
            type="text"
            className="form-control"
            id="groupDescription"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">Crear Grupo</button>
      </form>
    </div>
  );
};