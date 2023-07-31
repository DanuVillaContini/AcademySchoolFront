import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'


const ModalBtnAlum =({show, handleClose}) =>{
    
 
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
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" type='summit'>Agregar</Button>
        </Modal.Footer>
    </Form>
        </Modal.Body>
      </Modal>

)
}; 
export default ModalBtnAlum;