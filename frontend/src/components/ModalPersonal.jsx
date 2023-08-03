import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import styles from "../styles/modalStyles.module.css"



const ModalPersonal =({show,handleClose}) =>{
    
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

      <Form.Select aria-label="Default select example" className='mb-3'>
      <option>Año que cursa</option>
      <option value="1">Primero</option>
      <option value="2">Segundo</option>
      <option value="3">Tercero</option>
      <option value="4">Cuarto</option>
      <option value="5">Quinto</option>
      <option value="6">Sexto</option>
    </Form.Select>
        <Modal.Footer>
        <Button className={`${styles["custom-btt"]} ${styles["custom-btt-close"]}`} onClick={handleClose}>Cerrar</Button>
            <Button className={`${styles["custom-btt"]} ${styles["custom-btt-add"]}`} type='summit'>Agregar</Button>
        </Modal.Footer>
    </Form>
        </Modal.Body>
      </Modal>

)
}; 
export default ModalPersonal;