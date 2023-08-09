import { useEffect, useState } from "react";
import {  Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import Styles from '../styles/StylesPersonal.module.css'
import ButtonIconCustom from "./ButtonIconCustom";
import ButtonCustom from "./ButtonCustom";
import { API_URI } from "../common/constants";
import ButtonCustomRedGreen from "./ButtonCustomRedGreen";


function CrudPersonal() {

    const [allPersonal, setAllPersonal] = useState([])
    const [namePersonal, setNamePersonal] = useState("")
    const [lastnamePersonal, setLastnamePersonal] = useState("")
    const [fechaIngreso, setFechaIngreso] = useState("")
    const [telefonoPersonal, setTelefonoPersonal] = useState("")
    const [correoPersonal, setCorreoPersonal] = useState("")
    const [legajo, setLegajo] = useState("")
    const [deleteId, setDeleteId] = useState("");

    const [updateId, setUpdateId] = useState("")
    const [updateName, setUpdateName] = useState("")
    const [updateLastname, setUpdateLastname] = useState("")
    // const [updateFechaIngreso, setUpdateFechaIngreso] = useState("")
    const [updateTelefono, setUpdateTelefono] = useState("")
    const [updateCorreo, setUpdateCorreo] = useState("")




    //Modales
    const [showCreateForm, setShowCreateForm] = useState("")
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(true);




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

    const createPersonal = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            nameUser: namePersonal,
            lastnameUser: lastnamePersonal,
            dateAdmission: fechaIngreso,
            telefono: telefonoPersonal,
            correo: correoPersonal,
            legajoUser: legajo
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };

        const response = await fetch(API_URI + "/personal/create", requestOptions)
        const result = await response.json()
        console.log(result)
        setShowSuccessModal(true);
    }

    const deletePersonal = async (_id) => {
        let requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        const response = await fetch(API_URI + "/personal/delete/" + _id, requestOptions)
        const result = await response.json()
        console.log(result)
    }

    const updatePersonal = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            nameUser: updateName,
            lastnameUser: updateLastname,
            // dateAdmission: updateFechaIngreso,
            telefono: updateTelefono,
            correo: updateCorreo
        });

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        console.log("Actualizando empleado con ID:", updateId);
        console.log("Carga útil de actualización:", raw);

        const response = await fetch(API_URI + "/personal/update/" + updateId, requestOptions);
        const result = await response.json();
        console.log("Resultado de actualización:", result);

        setShowSuccessModal(true);
        setShowUpdateForm(false);
    }


    //--- HANDLERS ---
    const handleSubmit = async () => {
        await createPersonal()
        await getPersonal()
    }
    const handleDeletePersonal = async (_id) => {
        setDeleteId(_id)
        setShowDeleteModal(true)
    }
    const handleConfirmDelete = async () => {
        await deletePersonal(deleteId);
        setDeleteId("");
        setShowDeleteModal(false);
        await getPersonal();
    }
    const handleUpdatePersonal = async (_id) => {
        await updatePersonal(_id)
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
                        </Form.Group>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text"
                                placeholder="Ingrese la descripcion"
                                value={lastnamePersonal}
                                onChange={(e) => setLastnamePersonal(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>Fecha de Admision</Form.Label>
                            <Form.Control type="date"
                                placeholder="Indique Fecha de admision"
                                value={fechaIngreso}
                                onChange={(e) => setFechaIngreso(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control type="tel"
                                placeholder="Ingrese n° de Telefono"
                                value={telefonoPersonal}
                                onChange={(e) => setTelefonoPersonal(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>Correo Electronico</Form.Label>
                            <Form.Control type="email"
                                placeholder="Ingrese correo electronico"
                                value={correoPersonal}
                                onChange={(e) => setCorreoPersonal(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>N° Legajo</Form.Label>
                            <Form.Control type="email"
                                placeholder="Ingrese N° de Legajo"
                                value={legajo}
                                onChange={(e) => setLegajo(e.target.value)} />
                        </Form.Group>

                        {/* <ButtonCustom onClick={handleSubmit} nameBtt="Cargar Empleado" /> */}
                        <ButtonCustomRedGreen color="green" nameBtt="Cargar Empleado" onClick={handleSubmit} disabled={!namePersonal || !lastnamePersonal || !fechaIngreso || !telefonoPersonal || !correoPersonal || !legajo}/> 
                    </Form>

                    {/* ------FORM UPDATE PERSONAL---- */}
                    {
                        updateId.length > 0 && showUpdateForm && (
                            <Form className='mb-5'>
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Ingrese una categorial"
                                        value={updateName}
                                        onChange={(e) => setUpdateName(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Ingrese la descripcion"
                                        value={updateLastname}
                                        onChange={(e) => setUpdateLastname(e.target.value)} />
                                </Form.Group>
                                {/* <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>Fecha de Admision</Form.Label>
                            <Form.Control type="date"
                                placeholder="Indique Fecha de admision"
                                value={updateFechaIngreso}
                                onChange={(e) => setUpdateFechaIngreso(e.target.value)} />
                        </Form.Group> */}
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control type="tel"
                                        placeholder="Ingrese n° de Telefono"
                                        value={updateTelefono}
                                        onChange={(e) => setUpdateTelefono(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>Correo Electronico</Form.Label>
                                    <Form.Control type="email"
                                        placeholder="Ingrese correo electronico"
                                        value={updateCorreo}
                                        onChange={(e) => setUpdateCorreo(e.target.value)} />
                                </Form.Group>
                                {/* CAMBIAR BUTTONS POR LOS CUSTOMISADOS */}
                                {/* <ButtonCustom
                                    onClick={handleUpdatePersonal}
                                    nameBtt="Cargar Actualizacion"
                                    disabled={!updateName || !updateLastname || !updateTelefono || !updateCorreo}
                                /> */}
                                <ButtonCustomRedGreen
                                    color="green"
                                    onClick={handleUpdatePersonal}
                                    nameBtt="Cargar Actualizacion"
                                    disabled={!updateName || !updateLastname || !updateTelefono || !updateCorreo}
                                />

                                {/* <Button variant='outline-danger' className="mb-2 mx-1" onClick={() => {
                                    setUpdateId("")
                                    setUpdateName("")
                                    setUpdateLastname("")
                                    // setUpdateFechaIngreso("")
                                    setUpdateTelefono("")
                                    setUpdateCorreo("")
                                }}>Cancelar</Button> */}

                                <ButtonCustomRedGreen color="red" nameBtt="Cancelar" onClick={() => {
                                    setUpdateId("")
                                    setUpdateName("")
                                    setUpdateLastname("")
                                    // setUpdateFechaIngreso("")
                                    setUpdateTelefono("")
                                    setUpdateCorreo("")
                                }} />
                            </Form>
                        )
                    }

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
                                    <th>Legajo</th>
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
                                        <td data-titulo="Legajo">{empleado.legajoUser}</td>
                                        <td data-titulo="Nombre">{empleado.nameUser}</td>
                                        <td data-titulo="Apellido">{empleado.lastnameUser}</td>
                                        <td data-titulo="Curso">{empleado.dateAdmission}</td>
                                        <td>{empleado.telefono}</td>
                                        <td data-titulo="Opciones">{empleado.correo}</td>
                                        <td data-titulo="Opciones">
                                            <ButtonIconCustom variant='outline-danger' icon="bi bi-trash3-fill" tooltip="Eliminar" onClick={() => {
                                                handleDeletePersonal(empleado._id)
                                            }} />
                                            <ButtonIconCustom variant='outline-success' icon="bi bi-pencil-square" tooltip="Actualizar" onClick={() => {
                                                setUpdateId(empleado._id)
                                                setUpdateName(empleado.nameUser)
                                                setUpdateLastname(empleado.lastnameUser)
                                                // setUpdateFechaIngreso(empleado.dateAdmission)
                                                setUpdateTelefono(empleado.telefono)
                                                setUpdateCorreo(empleado.correo)
                                            }} />
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

            {/* CAMBIAR BUTTONS POR LOS CUSTOMISADOS */}
            {/*----------- Modal de confirmación de eliminación ---------*/}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar este elemento?
                </Modal.Body>
                <Modal.Footer>

                    <ButtonCustomRedGreen color="green" onClick={() => setShowDeleteModal(false)} nameBtt="Cancelar" />
                    {/* <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button> */}

                    <ButtonCustomRedGreen color="red" onClick={handleConfirmDelete} nameBtt="Eliminar" />
                    {/* <Button variant="danger" onClick={handleConfirmDelete}>
                        Eliminar
                    </Button> */}
                </Modal.Footer>
            </Modal>
            {/* -----------Modal de éxito ---------*/}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Operación exitosa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    La operación se ha realizado exitosamente.
                </Modal.Body>
                <Modal.Footer>

                    <ButtonCustomRedGreen color="red" onClick={() => setShowSuccessModal(false)} nameBtt="Cerrar" />
                    {/* <Button variant="success" onClick={() => setShowSuccessModal(false)}>
                        Cerrar
                    </Button> */}
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default CrudPersonal