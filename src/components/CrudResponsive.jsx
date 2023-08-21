import React from 'react';
import '../styles/crudResponsive.module.css'; // Asegúrate de importar tus estilos CSS

const Crud = () => {
  return (
    <div className="crud-container">
      <h1>CRUD</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Año actual</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>12345678</td>
            <td>3</td>
            <td>
              <button className="edit-button">Editar</button>
              <button className="delete-button">Eliminar</button>
            </td>
          </tr>
          {/* Agrega más filas aquí */}
        </tbody>
      </table>
    </div>
  );
};

export default Crud;
