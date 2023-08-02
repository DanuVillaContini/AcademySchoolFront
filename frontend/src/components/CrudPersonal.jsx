import { useState } from "react";
import { Button, Col, Container, Row, Table} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ModalPersonal from "./ModalPersonal";
import Styles from '../styles/StylesPersonal.module.css'

function CrudPersonal() {

    const [showModalPersonal,setModalPersonal] =useState(false);
    const handleCloseModalPersonal =() => setModalPersonal(false);
    const handleShowModalPersonal=()=> setModalPersonal(true);


    const prueba = [
        { _id: 1, Nombre: 'JUANITO', Apellido: 'PEREZ' ,FechadeIngreso: "15/01/2002", Contacto :3816645764, NombreInstitucion:"AcademySchool", ContactoInstitucion:"3815674425 @gmail.com"},
        { _id: 1, Nombre: 'JUANITO', Apellido: 'PEREZ' ,FechadeIngreso: "15/01/2002", Contacto :3816645764, NombreInstitucion:"AcademySchool", ContactoInstitucion:"3815674425 @gmail.com"},
        { _id: 1, Nombre: 'JUANITO', Apellido: 'PEREZ' ,FechadeIngreso: "15/01/2002", Contacto :3816645764, NombreInstitucion:"AcademySchool", ContactoInstitucion:"3815674425 @gmail.com"},
        { _id: 1, Nombre: 'JUANITO', Apellido: 'PEREZ' ,FechadeIngreso: "15/01/2002", Contacto :3816645764, NombreInstitucion:"AcademySchool", ContactoInstitucion:"3815674425 @gmail.com"},
        { _id: 1, Nombre: 'JUANITO', Apellido: 'PEREZ' ,FechadeIngreso: "15/01/2002", Contacto :3816645764, NombreInstitucion:"AcademySchool", ContactoInstitucion:"3815674425 @gmail.com"},

       
        
    ];
    return (
        <>
        <ModalPersonal show={showModalPersonal} handleClose={handleCloseModalPersonal}/>
        <>
        <Container>
                <Row className={`align-items-center flex-column ${Styles[custom-container]}`}>
                    <Col className="d-flex justify-content-center">
                        <h2>Detalle De Alumnos</h2>    
                    </Col>
                    {/*-----------------QUE ABRE VENTANA MODAL PARA FORMULARIO-------*/ }
                    <>
                    <Col className="d-flex justify-content-end mb-2">
                    <><Button className="ms" variant="info" onClick={handleShowModalPersonal}>NewStudent</Button></>
                    </Col>
                    </>
                   
                </Row>
                <Row><>
                <Table className={Styles["custom-table-Perso"]} striped bordered hover>
                       {/*-------TABLA INICIO----------------------------*/ } 
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Fecha de Ingreso</th>
                                <th>Contacto</th>
                                <th>Institucion</th>
                                <th>ContactosInti</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prueba.map((prueba) => (
                                <tr key={prueba._id}>
                                    <td data-titulo="Legasjo">{prueba._id}</td>
                                    <td data-titulo="Nombre">{prueba.Nombre}</td>
                                    <td data-titulo="Apellido">{prueba.Apellido}</td>
                                    <td data-titulo="Curso">{prueba.FechadeIngreso}</td>
                                    <td>{prueba.Contacto}</td>
                                    <td data-titulo="Cuota al dia">{prueba.NombreInstitucion}</td>
                                    <td data-titulo="Opciones">{prueba.ContactoInstitucion}</td>
                                        
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

export default CrudPersonal
