import React, { useState } from 'react';
import './InstitutionForm.css'; // Agrega los estilos para el formulario aquí (puedes usar la clase "background-image" para el fondo)

const InstitutionForm = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    contactPhone: '',
    contactEmail: '',
    address: '',
  });

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para enviar los datos al servidor
    console.log(formData); // Imprime los datos en la consola solo para comprobar que se están capturando correctamente
    // ... Código para enviar los datos al servidor
  };

  return (
    <div className="background-image">
      <div className="form-container">
        <h2>Registro de Institución</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre de la institución</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="contactPhone">Contacto (teléfono)</label>
          <input
            type="text"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
          />

          <label htmlFor="contactEmail">Contacto (correo)</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <button type="submit">Registrar Institución</button>
        </form>
      </div>
    </div>
  );
};

export default InstitutionForm;
