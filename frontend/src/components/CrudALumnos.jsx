import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import ModalBtnAlum from "./modalABtnAlum";
import Styles from "../styles/StyleAlum.module.css"
import ButtonIconCustom from "./ButtonIconCustom";
import ButtonCustom from "./ButtonCustom";
import { API_URI } from '../common/constants';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ButtonCustomRedGreen from "./ButtonCustomRedGreen"
import { Link} from "react-router-dom";



function CrudALumnos() {

    const [showModalBtnAlum, setShowModalBtnAlum] = useState(false);

    const [allAlumnos, setAllAlumnos] = useState([])

    const [NombreAlumno, setNombreAlumno] = useState("")
    const [ApellidoAlumno, setApellidoAlumno] = useState("")
    const [DNIAlumno, setDNIAlumno] = useState("")
    const [AnioAlumno, setAnioAlumno] = useState("")

    const [deleteId, setDeleteId] = useState("");

    const [updateId, setupdateId] = useState("")
    const [updateNombre, setupdateNombre] = useState("")
    const [updateApellido, setupdateApellido] = useState("")
    const [updateDni, setupdateDni] = useState("")
    const [updateAnio, setupdateAnio] = useState("")


    //modalCuota
    const handleCloseModalBtnAlum = () => setShowModalBtnAlum(false);
    const handleShowModalBtnAlum = () => setShowModalBtnAlum(true);

    //Modales
    const [showCreateForm, setShowCreateForm] = useState("")
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(true);






    //OBTENER LOS DATOS DE LA BASE DE DATOS:
    const getAlumnos = async () => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        }

        const response = await fetch(API_URI + "/alumno/find", requestOptions)
        if (response.status >= 400) return alert("No se pudieron obtener los Alumnos")
        const result = await response.json()
        setAllAlumnos(result.data)
    }

    const createAlumnos = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            nameAlumno: NombreAlumno,
            lastnameAlumno: ApellidoAlumno,
            dniAlumno: DNIAlumno,
            anio: AnioAlumno
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = await fetch(API_URI + "/alumno/create", requestOptions)
        const result = await response.json()
        console.log(result)

        setNombreAlumno("")
        setApellidoAlumno("")
        setDNIAlumno("")
        setAnioAlumno("")

        setShowSuccessModal(true);
        getAlumnos()
    }

    const DeleteStudent = async (_id) => {
        let requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };
        const response = await fetch(API_URI + "/alumno/delete/" + _id, requestOptions)
        const result = await response.json()
        console.log(result)
        setDeleteId("");
        setShowDeleteModal(false);
        await getAlumnos();
    }

    const UpdateAlumnos = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let raw = JSON.stringify({
            nameAlumno: updateNombre,
            lastnameAlumno: updateApellido,
            dniAlumno: updateDni,
            anio: updateAnio
        });
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch(API_URI + "/alumno/update/" + updateId, requestOptions);
        const result = await response.json();
        console.log(result);
        setShowSuccessModal(true);
        setShowUpdateForm(false);
        getAlumnos();

    }


    // --- HANDLERS ---
    const handleSubmit = async () => {
        await createAlumnos()
    }
    const handleDeleteStudent = async (_id) => {
        setDeleteId(_id)
        setShowDeleteModal(true)
    }
    const handleConfirmDelete = async () => {
        await DeleteStudent(deleteId);
    }
    const handleUpdateAlumnos = async (_id) => {
        await UpdateAlumnos(_id)
    }
    useEffect(() => {
        getAlumnos()
    }, [])

    return (
        <>
            <ModalBtnAlum show={showModalBtnAlum} handleClose={handleCloseModalBtnAlum} />
            {/* <ModalAlum show={showModalAlum} handleClose={handleCloseModalAlum} /> */}
            <>
                <Container>
                    {/* ---------- FORM CREATE NEW STUDENT ---------- */}
                    <ButtonCustom onClick={() => setShowCreateForm(state => !state)} nameBtt="New Student" />
                    <Form className={`mb-5 ${Styles["categories__create-form"]}`} style={{ height: showCreateForm ? "auto" : undefined }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text"
                                placeholder="Nombre"
                                value={NombreAlumno}
                                onChange={(e) => setNombreAlumno(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text"
                                placeholder="Apellido"
                                value={ApellidoAlumno}
                                onChange={(e) => setApellidoAlumno(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>N° DNI</Form.Label>
                            <Form.Control type="text"
                                placeholder="N° DNI"
                                value={DNIAlumno}
                                onChange={(e) => setDNIAlumno(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Año</Form.Label>
                            <Form.Control type="number"
                                placeholder="Año"
                                value={AnioAlumno}
                                onChange={(e) => setAnioAlumno(e.target.value)} />
                        </Form.Group>
                        <ButtonCustomRedGreen color="green" nameBtt="Cargar Estudiante" onClick={handleSubmit} disabled={!NombreAlumno || !ApellidoAlumno || !DNIAlumno || !AnioAlumno} />
                    </Form>

                    {/* ------FORM UPDATE sTUDENTS---- */}
                    {
                        updateId.length > 0 && showUpdateForm && (
                            <Form className='mb-5'>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Nombre"
                                        required
                                        maxLength={25}
                                        value={updateNombre}
                                        onChange={(e) => setupdateNombre(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Apellido"
                                        required
                                        maxLength={25}
                                        value={updateApellido}
                                        onChange={(e) => setupdateApellido(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>N° DNI</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="N° DNI"
                                        required
                                        maxLength={8}
                                        minLength={7}
                                        value={updateDni}
                                        onChange={(e) => setupdateDni(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Año</Form.Label>
                                    <Form.Control type="number"
                                        placeholder="Año"
                                        required
                                        maxLength={1}
                                        value={updateAnio}
                                        onChange={(e) => setupdateAnio(e.target.value)} />
                                </Form.Group>
                                <ButtonCustomRedGreen
                                    color="green"
                                    onClick={handleUpdateAlumnos}
                                    nameBtt="Cargar Actualizacion"
                                    disabled={!updateNombre || !updateApellido || !updateAnio || !updateDni}
                                />
                                <ButtonCustomRedGreen color="red" nameBtt="Cancelar" onClick={() => {
                                    setupdateId("")
                                    setupdateNombre("")
                                    setupdateDni("")
                                    setupdateAnio("")
                                }} />

                            </Form>
                        )
                    }

                    <Row className={`align-items-center flex-column ${Styles['custom-container-Alum']}`}>
                        <Col className="d-flex justify-content-center">
                            <h2>Detalle De Alumnos</h2>
                        </Col>
                    </Row>
                    <Row><>
                        <Table className={Styles["custom-table-Alum"]} striped bordered hover>
                            {/*-------TABLA INICIO----------------------------*/}
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>N° DNI</th>
                                    <th>Cuota al dia</th>
                                    <th>Año actual</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allAlumnos.map((alumno) => (
                                    <tr key={alumno._id}>
                                        {/* <td data-titulo="Legajo">{alumno._id}</td> */}
                                        <td data-titulo="Nombre">{alumno.nameAlumno}</td>
                                        <td data-titulo="Apellido">{alumno.lastnameAlumno}</td>
                                        <td data-titulo="N° DNI">{alumno.dniAlumno}</td>
                                        <td data-titulo="Cuota al dia">{alumno.cuotaAlumno ? <Button variant='success' className="m-1"> </Button> : <Button variant='danger' className="m-1"></Button>}</td>
                                        <td data-titulo="Año">{alumno.anio}</td>
                                        <td data-titulo="Opciones">
                                            <ButtonIconCustom variant='outline-danger' icon="bi bi-trash3-fill" tooltip="Eliminar" onClick={() => { handleDeleteStudent(alumno._id) }} />
                                            <ButtonIconCustom variant='outline-success' icon="bi bi-pencil-square" tooltip="Actualizar" onClick={() => {
                                                setupdateId(alumno._id)
                                                setupdateNombre(alumno.nameAlumno)
                                                setupdateDni(alumno.dniAlumno)
                                                setupdateApellido(alumno.lastnameAlumno)
                                                setupdateAnio(alumno.anio)
                                            }} />
                                            <Link to={`/menu/detalle-cursado/${alumno.libreta._id}`}>
                                                <ButtonIconCustom variant='outline-warning' icon="bi bi-journal-bookmark-fill" tooltip="Ver Notas" />
                                            </Link>
                                            <ButtonIconCustom variant='outline-dark' icon="bi bi-wallet" tooltip="Ver Cuotas?" onClick={handleShowModalBtnAlum} />
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
            {/* Modal de confirmación de eliminación */}
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

export default CrudALumnos