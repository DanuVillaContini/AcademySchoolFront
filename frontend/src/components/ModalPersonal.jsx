import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { FormLabel } from 'react-bootstrap';
import { useState } from 'react';


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
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" placeholder="Nombre" maxLength={25} required />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className='mb-3' controlId='frormBasicLastName'>
        <FormLabel>Apellido</FormLabel>
        <Form.Control type='text' placeholder='Apellido' maxLength={25} required/>
        <Form.Text className='text-muted'>
        </Form.Text>  
      </Form.Group>
      <Form.Group className='mb-3' controlId='frormBasicDate'>
        <FormLabel>Fecha de Ingreso</FormLabel>
        <Form.Control className='d-flex justify-content-center' type='date' placeholder='Apellido'required/>
        <Form.Text className='text-muted'>
        </Form.Text>  
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicContact'>
        <FormLabel>Contacto</FormLabel>
        <Form.Control type='tel'  placeholder='Contacto' maxLength={25} required/>
        <Form.Text className='text-muted'>
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
export default ModalPersonal;