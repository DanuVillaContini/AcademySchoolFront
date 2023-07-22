import { useState } from "react";
import { Button, Col, Container, Row, Table} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ModalAlum from '../components/ModalAlum';

function CrudALumnos() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //Esto reemplazar por la logica dle back, para traer las notas del alumno
    const prueba = [
        { _id: 1, Nombre_completo: 'JUANITO PEREZ', Curso: "1°", cuota_al_dia :true,Estado:true },
        { _id: 2, Nombre_completo: 'JESICA ALONSO ', Curso: "2°", cuota_al_dia :true,Estado:true },
        { _id: 3, Nombre_completo: 'HERNESTO ORTIZ', Curso: "4°", cuota_al_dia :false,Estado:true },
        { _id: 4, Nombre_completo: 'JUANITO MORALES', Curso: "6°", cuota_al_dia :true,Estado:true },
        { _id: 5, Nombre_completo: 'JUANA MARTINEZ PEREZ', Curso: "5°", cuota_al_dia:false,Estado:true }
        
    ];
    return (
        <>
         <>
            <Container>
                <Row className="align-items-center flex-column custom-container ">
                    <Col className="d-flex justify-content-center">
                        <h2>Detalle De Alumnos</h2>    
                    </Col>
                    {/*-----------------QUE ABRE VENTANA MODAL PARA FORMULARIO-------*/ }
                    <>
                    <Col className="d-flex justify-content-end mb-2">
                    <><Button className="ms" variant="info" onClick={handleShow}>NewStudent</Button></>
                      <ModalAlum show={show} handleClose={handleClose}/>
                    </Col>
                    </>
                   
                </Row>
                <Row><>
                <Table className="custom-table" striped bordered hover>
                       {/*-------TABLA INICIO----------------------------*/ } 
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre y Apellido</th>
                                <th>Curso</th>
                                <th>Cuota al dia</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prueba.map((prueba) => (
                                <tr key={prueba._id}>
                                    <td>{prueba._id}</td>
                                    <td>{prueba.Nombre_completo}</td>
                                    <td>{prueba.Curso}</td>
                                    <td>{prueba.cuota_al_dia ?  <Button variant='success' className="m-1"></Button>:<Button variant='success' className="m-1"></Button>}</td>
                                    <td className="d-flex justify-content-center"><Button variant='outline-danger' className="m-1">
                                    <i class="bi bi-trash3-fill"></i>
                                    </Button>
                                        <Button variant='outline-success' className="m-1">
                                        <i className="bi bi-pencil-square"></i>
                                        <span className=""></span>
                                        </Button>
                                        <Button variant='outline-warning' className="m-1">
                                        <i class="bi bi-journal-bookmark-fill"></i>
                                        <span className=""></span>
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
