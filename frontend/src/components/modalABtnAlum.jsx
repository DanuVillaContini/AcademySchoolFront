import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import styles from "../styles/modalStyles.module.css"
import ButtonCustomRedGreen from './ButtonCustomRedGreen';


const ModalBtnAlum = ({ show, handleClose }) => {


  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Formulario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicNickName">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control type="text" placeholder="Nombre Completo" maxLength={45} />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Modal.Footer>

            <ButtonCustomRedGreen color="red" onClick={handleClose} nameBtt="Cerrar" />
            {/* <Button className={`${styles["custom-btt"]} ${styles["custom-btt-close"]}`} onClick={handleClose}>Cerrar</Button> */}

            <ButtonCustomRedGreen color="green"  nameBtt="Agregar" />
            {/* <Button className={`${styles["custom-btt"]} ${styles["custom-btt-add"]}`} type='summit'>Agregar</Button> */}
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>

  )
};
export default ModalBtnAlum;