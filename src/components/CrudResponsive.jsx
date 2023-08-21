import React, { useState } from 'react';
import './CrudStyles.css'; // Importa tus estilos CSS aquí

const Crud = () => {
  const [data, setData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  const categories = [
    'Nombre',
    'Apellido',
    'DNI',
    'Año actual',
    'Opciones'
  ];

  const handleExpandRow = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  const renderExpandedRow = (item, index) => {
    return (
      <tr key={`expanded-${index}`}>
        <td colSpan={categories.length}>
          <div className="expanded-content">
            DNI: {item.DNI}<br />
            Año actual: {item['Año actual']}<br />
            Opciones: Botones aquí
          </div>
        </td>
      </tr>
    );
  };


  return (
    <div className="crud-container">
      <table className="crud-table">
        <thead>
          <tr>
            {categories.map((category, index) => (
              <th key={index}>{category}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => handleExpandRow(index)}>
                <td>{item.Nombre}</td>
                <td>{item.Apellido}</td>
                {expandedRow === index ? (
                  <td colSpan={categories.length - 2}></td>
                ) : null}
              </tr>
              {expandedRow === index ? renderExpandedRow(item, index) : null}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Crud;
