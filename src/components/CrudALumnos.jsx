import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Styles from "../styles/StyleAlum.module.css"
import ButtonIconCustom from "./ButtonIconCustom";
import ButtonCustom from "./ButtonCustom";
import { API_URI } from '../common/constants';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ButtonCustomRedGreen from "./ButtonCustomRedGreen"
import { Link } from "react-router-dom";

function CrudALumnos() {
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

    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(true);

    const getAlumnos = async () => {
        try {
            let requestOptions = {
                method: 'GET',
                redirect: 'follow'
            }
            const response = await fetch(API_URI + "/alumno/find", requestOptions)
            if (!response.ok) throw new Error("no se pudo obtener el alumno")
            setAllAlumnos(result.data)
        } catch {
            alert("no se pudo obtener el alumno")
        }
    }
    const createAlumnos = async () => {
        try {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            let raw = JSON.stringify({
                nameAlumno: NombreAlumno,
                lastnameAlumno: ApellidoAlumno,
                dniAlumno: DNIAlumno,
                anio: AnioAlumno
            });
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
            };
            const response = await fetch(API_URI + "/alumno/create", requestOptions)
            if (!response.ok) throw new Error("no se pudo crear el alumno")
            setNombreAlumno("")
            setApellidoAlumno("")
            setDNIAlumno("")
            setAnioAlumno("")
            setShowSuccessModal(true);
            setShowCreateForm(false)
            getAlumnos()
        } catch {
            alert("no se pudo crear el alumno")
        }
    }
    const DeleteStudent = async (_id) => {
        try {
            let requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };
            const response = await fetch(API_URI + "/alumno/delete/" + _id, requestOptions)
            if (!response.ok) throw new Error("no se pudo eliminar el alumno")
            setDeleteId("");
            setShowDeleteModal(false);
            await getAlumnos();
        } catch {
            alert("no se pudo crear el alumno")
        }

    }
    const UpdateAlumnos = async () => {
        try {
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
            if (!response.ok)throw new Error("no se pudo actualizar el alumno")           
            setShowSuccessModal(true);
            setShowUpdateForm(false);
            getAlumnos()
        } catch {
            alert("no se pudo actualizar el alumno")
        }
        ;
    }

    const handleSubmit = async () => {
        await createAlumnos()
        setShowCreateForm(false)
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
            <Container>
                <Row>
                    <ButtonCustom onClick={() => setShowCreateForm(prevState => !prevState)} nameBtt={showCreateForm ? "Cancelar" : "Nuevo Estudiante"} />
                    <Form className={` ${Styles["categories__create-form"]}`} style={{ height: showCreateForm ? "auto" : undefined }}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="font-monospace text-decoration-none">Nombre</Form.Label>
                            <Form.Control type="text"
                                placeholder="Nombre"
                                value={NombreAlumno}
                                onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                    setNombreAlumno(onlyLettersAndSpaces);
                                }}
                                maxLength={25}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="font-monospace text-decoration-none">Apellido</Form.Label>
                            <Form.Control type="text"
                                placeholder="Apellido"
                                value={ApellidoAlumno}
                                onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                    setApellidoAlumno(onlyLettersAndSpaces);
                                }}
                                maxLength={25}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="font-monospace text-decoration-none">N° DNI</Form.Label>
                            <Form.Control type="text"
                                placeholder="N° DNI"
                                value={DNIAlumno}
                                onChange={(e) => {
                                    const input = e.target.value
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    setDNIAlumno(onlyNumbers);
                                }}
                                maxLength={8}
                                minLength={7} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="font-monospace text-decoration-none">Año</Form.Label>
                            <Form.Control type="number"
                                placeholder="Año"
                                value={AnioAlumno}
                                onChange={(e) => {
                                    const newValue = parseInt(e.target.value);
                                    if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
                                        setAnioAlumno(newValue);
                                    }
                                }}
                            />
                        </Form.Group>
                        <ButtonCustomRedGreen color="green" nameBtt="Cargar Estudiante" onClick={handleSubmit} disabled={!NombreAlumno || !ApellidoAlumno || !DNIAlumno || !AnioAlumno} />
                    </Form>
                </Row>
                {
                    updateId.length > 0 && showUpdateForm && (
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="font-monospace text-decoration-none">Nombre</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Nombre"
                                    required
                                    maxLength={25}
                                    value={updateNombre}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                        setupdateNombre(onlyLettersAndSpaces);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="font-monospace text-decoration-none">Apellido</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Apellido"
                                    required
                                    maxLength={25}
                                    value={updateApellido}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                        setupdateApellido(onlyLettersAndSpaces);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="font-monospace text-decoration-none">N° DNI</Form.Label>
                                <Form.Control type="text"
                                    placeholder="N° DNI"
                                    required
                                    maxLength={8}
                                    minLength={7}
                                    value={updateDni}
                                    onChange={(e) => {
                                        const input = e.target.value
                                        const onlyNumbers = input.replace(/[^0-9]/g, "");
                                        setupdateDni(onlyNumbers);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="font-monospace text-decoration-none">Año</Form.Label>
                                <Form.Control type="number"
                                    placeholder="Año"
                                    required
                                    maxLength={1}
                                    value={updateAnio}
                                    onChange={(e) => {
                                        const newValue = parseInt(e.target.value);
                                        if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
                                            setupdateAnio(newValue);
                                        }
                                    }}
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <ButtonCustomRedGreen color="red" nameBtt="Cancelar" onClick={() => {
                                        setupdateId("")
                                        setupdateNombre("")
                                        setupdateDni("")
                                        setupdateAnio("")
                                    }} />

                                </Col>
                                <Col>
                                    <ButtonCustomRedGreen
                                        color="green"
                                        onClick={handleUpdateAlumnos}
                                        nameBtt="Cargar Actualizacion"
                                        disabled={!updateNombre || !updateApellido || !updateAnio || !updateDni}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    )
                }
                <Row>
                    <Col className={`d-flex justify-content-center ${Styles['custom-container-Alum']}`}>
                        <h2 className="font-monospace text-decoration-none">Detalle De Alumnos</h2>
                    </Col>
                    <Table className={Styles["custom-table-Alum"]} striped bordered hover>
                        <thead>
                            <tr>
                                <th className="font-monospace">Nombre</th>
                                <th className="font-monospace">Apellido</th>
                                <th className="font-monospace">N° DNI</th>
                                <th className="font-monospace">Año actual</th>
                                <th className="font-monospace">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allAlumnos.map((alumno) => (
                                <tr key={alumno._id}>
                                    <td data-titulo="Nombre">{alumno.nameAlumno}</td>
                                    <td data-titulo="Apellido">{alumno.lastnameAlumno}</td>
                                    <td data-titulo="N° DNI">{alumno.dniAlumno}</td>
                                    <td data-titulo="Año">{alumno.anio}</td>
                                    <td data-titulo="Opciones">
                                        <ButtonIconCustom variant='outline-danger' icon="bi bi-trash3-fill" tooltip="Eliminar" onClick={() => { handleDeleteStudent(alumno._id) }} />
                                        <ButtonIconCustom variant='outline-success' icon="bi bi-pencil-square" tooltip="Actualizar Datos" onClick={() => {
                                            setupdateId(alumno._id)
                                            setupdateNombre(alumno.nameAlumno)
                                            setupdateDni(alumno.dniAlumno)
                                            setupdateApellido(alumno.lastnameAlumno)
                                            setupdateAnio(alumno.anio)
                                        }} />
                                        <Link to={`/auth/detalle-cursado/${alumno.libreta._id}`}>
                                            <ButtonIconCustom variant='outline-warning' icon="bi bi-journal-bookmark-fill" tooltip="Libreta Escolar" />
                                        </Link>
                                        <Link to={`/auth/cuotas/${alumno.idAnio._id}`}>
                                            <ButtonIconCustom variant='outline-dark' icon="bi bi-wallet" tooltip="Estado de Cuotas" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="font-monospace">Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-monospace">
                    ¿Estás seguro de que deseas eliminar este elemento?
                </Modal.Body>
                <Modal.Footer>
                    <ButtonCustomRedGreen color="green" onClick={() => setShowDeleteModal(false)} nameBtt="Cancelar" />
                    <ButtonCustomRedGreen color="red" onClick={handleConfirmDelete} nameBtt="Eliminar" />
                </Modal.Footer>
            </Modal>
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="font-monospace">Operación exitosa</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-monospace">
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
