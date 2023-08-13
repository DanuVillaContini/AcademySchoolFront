import { useState } from 'react';
import styles from '../styles/InstitutionForm.module.css'; 
import ButtonCustom from '../components/ButtonCustom';
import { API_URI } from '../common/constants';
import { Modal } from 'react-bootstrap';
import ButtonCustomRedGreen from '../components/ButtonCustomRedGreen';
import { useNavigate } from 'react-router-dom'; 

const InstitutionForm = () => {
  const [UpdateName, setUpdateName] = useState("")
  const [UpdateTel, setUpdateTel] = useState("")
  const [UpdateCorreo, setUpdateCorreo] = useState("")
  const [UpdateDireccion, setUpdateDireccion] = useState("")

  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const navigate = useNavigate() 



  const updateInstitucion = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      nombreInstituto: UpdateName,
      telefonoInstituto: UpdateTel,
      correoInstituto: UpdateCorreo,
      direccionInstituto: UpdateDireccion
    });

    let requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const response = await fetch(API_URI + "/instituto/update", requestOptions)
    const result = await response.text();
    console.log(result);
    setShowSuccessModal(true);
    navigate('/mensaje')  
  }

  const handleUpdateInstitucion = async (_id) => {
    await updateInstitucion(_id)
  }


  return (
    <>
      <div className={styles["background-image"]}>
        <div className={styles["form-container"]}>
          <h2>Registro de Institución</h2>
          <form>
            <label htmlFor="name">Nombre de la institución</label>
            <input
              type="text"
              id="name"
              name="name"
              maxLength={30}
              value={UpdateName}
              // onChange={(e) => setUpdateName(e.target.value)}
              onChange={(e) => {
                const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-z0-9\sáéíóúÁÉÍÓÚñÑ]/g, ""); // Solo permite letras, números, espacios y acentos
                setUpdateName(onlyLettersAndSpaces);
                
            }}
              required
            />

            <label htmlFor="contactPhone">Contacto (teléfono)</label>
            <input
              type="text"
              id="contactPhone"
              name="contactPhone"
              maxLength={30}
              value={UpdateTel}
              // onChange={(e) => setUpdateTel(e.target.value)}
              onChange={(e) => {
                const input = e.target.value
                const onlyNumbers = input.replace(/[^0-9]/g, ""); // Elimina todos los caracteres no numéricos
                setUpdateTel(onlyNumbers);
            }}
              required
            />

            <label htmlFor="contactEmail">Contacto (correo)</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              maxLength={30}
              value={UpdateCorreo}
              onChange={(e) => setUpdateCorreo(e.target.value)}
              required
            />

            <label htmlFor="address">Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              maxLength={50}
              value={UpdateDireccion}
              // onChange={(e) => setUpdateDireccion(e.target.value)}
              onChange={(e) => {
                const validInput = e.target.value.replace(/[^A-Za-z0-9\sáéíóúÁÉÍÓÚñÑ]/g, ""); // Solo permite letras, números, espacios y acentos
                setUpdateDireccion(validInput);
            }}
              required
            />
            <ButtonCustom nameBtt="Guardar Institución"
              onClick={handleUpdateInstitucion}
              disabled={!UpdateName || !UpdateTel || !UpdateCorreo || !UpdateDireccion} />
          </form>
        </div>
      </div>
      {/* -----Modal de Institucion guardada con exito------ */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Institucion Guardada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Los datos de la Institucion han sido guardados con exito.
        </Modal.Body>
        <Modal.Footer>
          <ButtonCustomRedGreen color="red" onClick={() => setShowSuccessModal(false)} nameBtt="Cerrar" />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InstitutionForm;