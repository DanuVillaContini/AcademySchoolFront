import { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import ModalPersonal from "./ModalPersonal";
import Styles from '../styles/StylesPersonal.module.css'
import ButtonIconCustom from "./ButtonIconCustom";
import ButtonCustom from "./ButtonCustom";

function CrudPersonal() {

    const [showModalPersonal, setModalPersonal] = useState(false);
    const handleCloseModalPersonal = () => setModalPersonal(false);
    const handleShowModalPersonal = () => setModalPersonal(true);


    const prueba = [
        { _id: 1, Nombre: 'JUANITO', Apellido: 'PEREZ', FechadeIngreso: "15/01/2002", Contacto: 3816645764, NombreInstitucion: "AcademySchool", ContactoInstitucion: "3815674425 @gmail.com" },
        { _id: 1, Nombre: 'JUANITO', Apellido: 'PEREZ', FechadeIngreso: "15/01/2002", Contacto: 3816645764, NombreInstitucion: "AcademySchool", ContactoInstitucion: "3815674425 @gmail.com" },
        { _id: 1, Nombre: 'JUANITO', Apellido: 'PEREZ', FechadeIngreso: "15/01/2002", Contacto: 3816645764, NombreInstitucion: "AcademySchool", ContactoInstitucion: "3815674425 @gmail.com" },
        { _id: 1, Nombre: 'JUANITO', Apellido: 'PEREZ', FechadeIngreso: "15/01/2002", Contacto: 3816645764, NombreInstitucion: "AcademySchool", ContactoInstitucion: "3815674425 @gmail.com" },
        { _id: 1, Nombre: 'JUANITO', Apellido: 'PEREZ', FechadeIngreso: "15/01/2002", Contacto: 3816645764, NombreInstitucion: "AcademySchool", ContactoInstitucion: "3815674425 @gmail.com" },



    ];
    return (
        <>
            <ModalPersonal show={showModalPersonal} handleClose={handleCloseModalPersonal} />
            <>
                <Container>
                    <Row className={`align-items-center flex-column ${Styles['custom-container-Perso']}`}>
                        <Col className="d-flex justify-content-center">
                            <h2>Personal Institucion</h2>
                        </Col>
                        {/*-----------------QUE ABRE VENTANA MODAL PARA FORMULARIO-------*/}
                        <>
                            <Col className="d-flex justify-content-end mb-2">
                                <ButtonCustom onClick={handleShowModalPersonal} nameBtt="New Personal"/>
                                {/* <><Button className="ms" variant="info" onClick={handleShowModalPersonal}>NewStudent</Button></> */}
                            </Col>
                        </>

                    </Row>
                    <Row><>
                        <Table className={Styles["custom-table-Perso"]} striped bordered hover>
                            {/*-------TABLA INICIO----------------------------*/}
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Fecha de Ingreso</th>
                                    <th>Contacto</th>
                                    <th>Correo</th>
                                    <th>Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prueba.map((prueba) => (
                                    <tr key={prueba._id}>
                                        <td data-titulo="Legajo">{prueba._id}</td>
                                        <td data-titulo="Nombre">{prueba.Nombre}</td>
                                        <td data-titulo="Apellido">{prueba.Apellido}</td>
                                        <td data-titulo="Curso">{prueba.FechadeIngreso}</td>
                                        <td>{prueba.Contacto}</td>
                                        <td data-titulo="Opciones">{prueba.ContactoInstitucion}</td>
                                        <td data-titulo="Opciones">
                                            <ButtonIconCustom variant='outline-danger' icon="bi bi-trash3-fill" tooltip="Eliminar" />
                                            <ButtonIconCustom variant='outline-success' icon="bi bi-pencil-square" tooltip="Actualizar" />
                                            <ButtonIconCustom variant='outline-warning' icon="bi bi-star-half" tooltip="Ascender" />
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </Table>
                        {/*----------------TABLA FIN----------------------------*/}
                    </>

                    </Row>

                </Container>
            </>

        </>
    )
}

export default CrudPersonal