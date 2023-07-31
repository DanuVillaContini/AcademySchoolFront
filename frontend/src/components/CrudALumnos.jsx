import { useState } from "react";
import { Button, Col, Container, Row, Table} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ModalAlum from '../components/ModalAlum';
import '../styles/StyleAlum.css';
import ModalBtnAlum from "./modalABtnAlum";


function CrudALumnos() {

    const [showModalAlum, setShowModalAlum] = useState(false);
    const [showModalBtnAlum, setShowModalBtnAlum] = useState(false);
  
    const handleCloseModalAlum = () => setShowModalAlum(false);
    const handleShowModalAlum = () => setShowModalAlum(true);
  
    const handleCloseModalBtnAlum = () => setShowModalBtnAlum(false);
    const handleShowModalBtnAlum = () => setShowModalBtnAlum(true);

    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    //Esto reemplazar por la logica dle back, para traer las notas del alumno
    const prueba = [
        { _id: 1, Nombre: 'JUANITO', Apellido: 'PEREZ' ,Curso: "1°", cuota_al_dia :true,Estado:true },
        { _id: 2, Nombre: 'JESICA', Apellido: 'ALONSO ', Curso: "2°", cuota_al_dia :true,Estado:true },
        { _id: 3, Nombre:'HERNESTO',Apellido: 'ORTIZ', Curso: "4°", cuota_al_dia :false,Estado:true },
        { _id: 4, Nombre: 'JUANITO',Apellido: 'MORALES', Curso: "6°", cuota_al_dia :true,Estado:true },
        { _id: 5, Nombre: 'JUANA MARTINEZ', Apellido:'PEREZ', Curso: "5°", cuota_al_dia:false,Estado:true }
        
    ];
    return (
        <>
          <ModalBtnAlum show={showModalBtnAlum} handleClose={handleCloseModalBtnAlum} />
      <ModalAlum show={showModalAlum} handleClose={handleCloseModalAlum} />
         <>
            <Container>
                <Row className="align-items-center flex-column custom-container">
                    <Col className="d-flex justify-content-center">
                        <h2>Detalle De Alumnos</h2>    
                    </Col>
                    {/*-----------------QUE ABRE VENTANA MODAL PARA FORMULARIO-------*/ }
                    <>
                    <Col className="d-flex justify-content-end mb-2">
                    <><Button className="ms" variant="info" onClick={handleShowModalAlum}>NewStudent</Button></>
                    </Col>
                    </>
                   
                </Row>
                <Row><>
                <Table className="custom-table" striped bordered hover>
                       {/*-------TABLA INICIO----------------------------*/ } 
                        <thead>
                            <tr>
                                <th>Legasjo</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Curso</th>
                                <th>Cuota al dia</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prueba.map((prueba) => (
                                <tr key={prueba._id}>
                                    <td data-titulo="Legasjo">{prueba._id}</td>
                                    <td data-titulo="Nombre">{prueba.Nombre}</td>
                                    <td data-titulo="Apellido">{prueba.Apellido}</td>
                                    <td data-titulo="Curso">{prueba.Curso}</td>
                                    <td data-titulo="Cuota al dia">{prueba.cuota_al_dia ?  <Button variant='success' className="m-1"> </Button>:<Button variant='danger' className="m-1"></Button>}</td>
                                    <td data-titulo="Opciones"><Button variant='outline-danger'>
                                    <i class="bi bi-trash3-fill"></i>
                                    </Button>
                                        <Button variant='outline-success' className="m-1">
                                        <i className="bi bi-pencil-square"></i>
                                        </Button>
                                        <Button variant='outline-warning' className="m-1">
                                        <i class="bi bi-journal-bookmark-fill"></i>
                                        </Button>
                                        <Button variant='outline-dark' className="m-1" onClick={handleShowModalBtnAlum}>
                                        <i class="bi bi-wallet"></i>
                                        </Button>
                                        </td>
                                        
                                </tr>
                            ))}
                        </tbody>
                       
                    </Table>
                    {/*----------------TABLA FIN----------------------------*/ } 
                        </>
                    
                </Row>
                
            </Container>
           
        </>
        
        
        </>
       
    


       
        
    )
}

export default CrudALumnos
