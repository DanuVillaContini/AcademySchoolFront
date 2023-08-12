import { useEffect, useState } from "react";
import { Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import Styles from '../styles/StylesPersonal.module.css'
import ButtonIconCustom from "./ButtonIconCustom";
import ButtonCustom from "./ButtonCustom";
import { API_URI } from "../common/constants";
import ButtonCustomRedGreen from "./ButtonCustomRedGreen"


function CrudPersonal() {
    const [allPersonal, setAllPersonal] = useState([])
    const [namePersonal, setNamePersonal] = useState("")
    const [lastnamePersonal, setLastnamePersonal] = useState("")
    const [telefonoPersonal, setTelefonoPersonal] = useState("")
    const [correoPersonal, setCorreoPersonal] = useState("")
    const [dniPersonal, setDniPersonal] = useState("")
    const [deleteId, setDeleteId] = useState("");
    const [updateId, setUpdateId] = useState("")
    const [updateName, setUpdateName] = useState("")
    const [updateLastname, setUpdateLastname] = useState("")
    const [updateTelefono, setUpdateTelefono] = useState("")
    const [updateCorreo, setUpdateCorreo] = useState("")
    const [updateDni, setUpdateDni] = useState("")
    const [password, setPassword] = useState("")
    const [currentEmpleadoId, setCurrentEmpleadoId] = useState("");
    //Modales
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(true);
    const [showModalAscender, setShowModalAscender] = useState(false)
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
            telefono: telefonoPersonal,
            correo: correoPersonal,
            dniUser: dniPersonal
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
        };
        const response = await fetch(API_URI + "/personal/create", requestOptions)
        const result = await response.json()
        console.log(result)
        setNamePersonal("");
        setLastnamePersonal("");
        setTelefonoPersonal("");
        setCorreoPersonal("");
        setDniPersonal("");
        setShowSuccessModal(true);
        setShowCreateForm(false);
        getPersonal()
    }
    const deletePersonal = async (_id) => {
        let requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };
        const response = await fetch(API_URI + "/personal/delete/" + _id, requestOptions)
        const result = await response.json()
        console.log(result)
        setDeleteId("");
        setShowSuccessModal(true);
        setShowDeleteModal(false);
        await getPersonal();
    }
    const updatePersonal = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let raw = JSON.stringify({
            nameUser: updateName,
            lastnameUser: updateLastname,
            telefono: updateTelefono,
            correo: updateCorreo,
            dniUser: updateDni
        });
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch(API_URI + "/personal/update/" + updateId, requestOptions);
        const result = await response.json();
        console.log(result);
        setShowSuccessModal(true);
        setShowUpdateForm(false);
        await getPersonal()
    }
    const ascenderPersonal = async (_id) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let raw = JSON.stringify({
            pass: password
        });
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch(API_URI + "/auth/update-rol/" + _id, requestOptions)
        const result = await response.text();
        console.log(result);
        if (response.status === 200) {
            setShowModalAscender(false);
            setShowSuccessModal(true);
            setPassword("");
            await getPersonal();
        } else {
            console.error("Error en la operación de ascenso:", result);
        }
    }
    //--- HANDLERS ---
    const handleSubmit = async () => {
        await createPersonal()
        setShowCreateForm(false);
    }
    const handleDeletePersonal = async (_id) => {
        setDeleteId(_id)
        setShowDeleteModal(true)
    }
    const handleConfirmDelete = async () => {
        await deletePersonal(deleteId);
    }
    const handleUpdatePersonal = async (_id) => {
        await updatePersonal(_id)
    }
    const handleUpdateAscenderPersonal = async () => {
        await ascenderPersonal(currentEmpleadoId)
    }
    useEffect(() => {
        getPersonal()
    }, [])
    return (
        <>
            <>
                <Container>
                    {/* ---------- FORM CREATE NEW PERSONAL ---------- */}
                    <ButtonCustom onClick={() => setShowCreateForm(prevState => !prevState)} nameBtt="New Personal" />
                    <Form className={`mb-1 ${Styles["categories__create-form"]}`} style={{ height: showCreateForm ? "auto" : undefined }}>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text"
                                placeholder="Ingrese una categorial"
                                maxLength={25}
                                value={namePersonal}
                                onChange={(e) => setNamePersonal(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text"
                                placeholder="Ingrese la descripcion"
                                maxLength={25}
                                value={lastnamePersonal}
                                onChange={(e) => setLastnamePersonal(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control type="text"
                                placeholder="Ingrese n° de Telefono"
                                maxLength={11}
                                value={telefonoPersonal}
                                onChange={(e) => setTelefonoPersonal(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>Correo Electronico</Form.Label>
                            <Form.Control type="email"
                                placeholder="Ingrese correo electronico"
                                maxLength={60}
                                value={correoPersonal}
                                onChange={(e) => setCorreoPersonal(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="" controlId="formBasicEmail">
                            <Form.Label>N° DNI</Form.Label>
                            <Form.Control type="email"
                                placeholder="Ingrese N° de Legajo"
                                maxLength={8}
                                minLength={7}
                                value={dniPersonal}
                                onChange={(e) => setDniPersonal(e.target.value)} />
                        </Form.Group>

                        <ButtonCustomRedGreen color="green" nameBtt="Cargar Empleado" onClick={handleSubmit} disabled={!namePersonal || !lastnamePersonal || !telefonoPersonal || !correoPersonal || !dniPersonal} />
                    </Form>
                    {/* ------FORM UPDATE PERSONAL---- */}
                    {
                        updateId.length > 0 && showUpdateForm && (
                            <Form className='mb-5'>
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Ingrese una categorial"
                                        maxLength={25}
                                        required
                                        value={updateName}
                                        onChange={(e) => setUpdateName(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Ingrese la descripcion"
                                        maxLength={25}
                                        required
                                        value={updateLastname}
                                        onChange={(e) => setUpdateLastname(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control type="tel"
                                        placeholder="Ingrese n° de Telefono"
                                        maxLength={15}
                                        required
                                        value={updateTelefono}
                                        onChange={(e) => setUpdateTelefono(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>Correo Electronico</Form.Label>
                                    <Form.Control type="email"
                                        placeholder="Ingrese correo electronico"
                                        maxLength={60}
                                        required
                                        value={updateCorreo}
                                        onChange={(e) => setUpdateCorreo(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>N° DNI</Form.Label>
                                    <Form.Control type="email"
                                        placeholder="Ingrese correo electronico"
                                        maxLength={8}
                                        minLength={7}
                                        required
                                        value={updateDni}
                                        onChange={(e) => setUpdateDni(e.target.value)} />
                                </Form.Group>
                                <ButtonCustomRedGreen
                                    color="green"
                                    onClick={handleUpdatePersonal}
                                    nameBtt="Cargar Actualizacion"
                                    disabled={!updateName || !updateLastname || !updateTelefono || !updateCorreo || !updateDni}
                                />
                                <ButtonCustomRedGreen color="red" nameBtt="Cancelar" onClick={() => {
                                    setUpdateId("")
                                    setUpdateName("")
                                    setUpdateLastname("")
                                    setUpdateTelefono("")
                                    setUpdateCorreo("")
                                    setUpdateDni("")
                                }} />
                            </Form>
                        )
                    }
                    {/* Modal para actualizar Rol */}
                    <Modal show={showModalAscender} onHide={() => setShowModalAscender(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ascender empleado a rol Admin</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="" controlId="formBasicEmail">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"
                                        placeholder="Ingrese una constraseña para el nuevo admin"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <ButtonCustomRedGreen
                                color="red"
                                onClick={() => setShowModalAscender(false)}
                                nameBtt="Cancelar"
                            />
                            <ButtonCustomRedGreen
                                color="green"
                                onClick={handleUpdateAscenderPersonal}
                                nameBtt="Dar Rol Admin"
                                disabled={!password}
                            />
                        </Modal.Footer>
                    </Modal>
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
                                    <th>DNI</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Telefono</th>
                                    <th>Correo</th>
                                    <th>Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPersonal.map((empleado) => (
                                    <tr key={empleado._id}>
                                        <td data-titulo="DNI">{empleado.dniUser}</td>
                                        <td data-titulo="Nombre">{empleado.nameUser}</td>
                                        <td data-titulo="Apellido">{empleado.lastnameUser}</td>
                                        <td data-titulo="Telefono">{empleado.telefono}</td>
                                        <td data-titulo="Correo">{empleado.correo}</td>
                                        <td data-titulo="Opciones">
                                            <ButtonIconCustom variant='outline-danger' icon="bi bi-trash3-fill" tooltip="Eliminar" onClick={() => {
                                                handleDeletePersonal(empleado._id)
                                            }} />
                                            <ButtonIconCustom variant='outline-success' icon="bi bi-pencil-square" tooltip="Actualizar" onClick={() => {
                                                setUpdateId(empleado._id)
                                                setUpdateDni(empleado.dniUser)
                                                setUpdateName(empleado.nameUser)
                                                setUpdateLastname(empleado.lastnameUser)
                                                setUpdateTelefono(empleado.telefono)
                                                setUpdateCorreo(empleado.correo)
                                            }} />
                                            <ButtonIconCustom
                                                variant='outline-warning'
                                                icon="bi bi-star-half"
                                                tooltip="Ascender"
                                                onClick={() => {
                                                    setCurrentEmpleadoId(empleado._id)
                                                    setShowModalAscender(true)
                                                }} />
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
                    <ButtonCustomRedGreen color="red" onClick={handleConfirmDelete} nameBtt="Eliminar" />
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
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CrudPersonal