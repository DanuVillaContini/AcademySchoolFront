import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
// import ModalPersonal from "./ModalPersonal";
import Styles from '../styles/StylesPersonal.module.css'
import ButtonIconCustom from "./ButtonIconCustom";
import ButtonCustom from "./ButtonCustom";
import { API_URI } from "../common/constants";

function CrudPersonal() {

    const [allPersonal, setAllPersonal] = useState([])
    const [namePersonal, setNamePersonal] = useState("")
    const [lastnamePersonal, setLastnamePersonal] = useState("")
    const [fechaIngreso, setFechaIngreso] = useState("")
    const [telefonoPersonal, setTelefonoPersonal] = useState("")
    const [correoPersonal, setCorreoPersonal] = useState("")

    const [showCreateForm, setShowCreateForm] = useState("")



    const getPersonal = async () => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        }
        const response = await fetch(API_URI + "/personal/find", requestOptions)
        if (response.status >= 400) return alert("No se pudieron obtener los empleados")
        const result = await response.json()
        setAllPersonal(result.data)
    }

    //--- HANDLERS ---
    const handleSubmit = async () => {
        // await createStudents()
        await getPersonal()
    }

    useEffect(() => {
        getPersonal()
    }, [])

    return (
        <>
            <>
                <Container>

                    {/* ---------- FORM CREATE NEW PERSONAL ---------- */}
                    <ButtonCustom onClick={() => setShowCreateForm(state => !state)} nameBtt="New Personal" />
                    <Form className={`mb-1 ${Styles["categories__create-form"]}`} style={{ height: showCreateForm ? "auto" : undefined }}>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text"
                                placeholder="Ingrese una categorial"
                                value={namePersonal}
                                onChange={(e) => setNamePersonal(e.target.value)} />
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text"
                                placeholder="Ingrese la descripcion"
                                value={lastnamePersonal}
                                onChange={(e) => setLastnamePersonal(e.target.value)} />
                            <Form.Label>Fecha de Admision</Form.Label>
                            <Form.Control type="date"
                                placeholder="Indique Fecha de admision"
                                value={fechaIngreso}
                                onChange={(e) => setFechaIngreso(e.target.value)} />
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control type="tel"
                                placeholder="Ingrese n° de Telefono"
                                value={telefonoPersonal}
                                onChange={(e) => setTelefonoPersonal(e.target.value)} />
                            <Form.Label>Correo Electronico</Form.Label>
                            <Form.Control type="email"
                                placeholder="Ingrese correo electronico"
                                value={correoPersonal}
                                onChange={(e) => setCorreoPersonal(e.target.value)} />

                        </Form.Group>
                        {/* <Form.Group className="" controlId="formBasicEmail">

                        </Form.Group>
                        <Form.Group className="" controlId="formBasicEmail">

                        </Form.Group>
                        <Form.Group className="" controlId="formBasicEmail">

                        </Form.Group>
                        <Form.Group className="" controlId="formBasicEmail">

                        </Form.Group> */}
                        <ButtonCustom onClick={handleSubmit}  nameBtt="Cargar Empleado" />
                    </Form>



                    {/* ---------- TABLA SHOW PERSONAL ---------- */}
                    <Row className={`align-items-center flex-column ${Styles['custom-container-Perso']}`}>
                        <Col className="d-flex justify-content-center">
                            <h2>Personal Institucion</h2>
                        </Col>
                    </Row>

                    <Row><>
                        <Table className={Styles["custom-table-Perso"]} striped bordered hover>
                            {/*-------TABLA INICIO----------------------------*/}
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Fecha de Ingreso</th>
                                    <th>Telefono</th>
                                    <th>Correo</th>
                                    <th>Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPersonal.map((empleado) => (
                                    <tr key={empleado._id}>
                                        <td data-titulo="Nombre">{empleado.nameUser}</td>
                                        <td data-titulo="Apellido">{empleado.lastnameUser}</td>
                                        <td data-titulo="Curso">{empleado.dateAdmission}</td>
                                        <td>{empleado.telefono}</td>
                                        <td data-titulo="Opciones">{empleado.correo}</td>
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