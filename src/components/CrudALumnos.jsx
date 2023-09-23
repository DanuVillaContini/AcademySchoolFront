import { useEffect, useState } from "react";
import { Col, Container, Dropdown, Row, Table } from "react-bootstrap";
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


    const [IdAlumno, setIdAlumno] = useState("");

    const [updateId, setupdateId] = useState("")
    const [updateNombre, setupdateNombre] = useState("")
    const [updateApellido, setupdateApellido] = useState("")
    const [updateDni, setupdateDni] = useState("")
    const [updateAnio, setupdateAnio] = useState("")

    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showChangeSatusModal, setChangeStatusModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)


    const [Errores, setErrores] = useState({})

    const getAlumnos = async () => {
        try {
            let myHeaders = new Headers();
            const access_token = localStorage.getItem("access_token").replaceAll('"', "")
            myHeaders.append("Authorization", "Bearer " + access_token);
            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }
            const response = await fetch(API_URI + "/alumno/find", requestOptions)
            if (response.status >= 400) return alert("No se pudieron obtener los alumnos")
            const result = await response.json()
            setAllAlumnos(result.data)
        } catch (error) {
            console.error(error);
        }
    }
    const createAlumnos = async () => {
        try {
            let myHeaders = new Headers();
            const access_token = localStorage.getItem("access_token").replaceAll('"', "")
            myHeaders.append("Authorization", "Bearer " + access_token)
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
            setShowSuccessModal(true)
            setShowCreateForm(false)
            getAlumnos()
        } catch (error) {
            console.error(error);
        }
    }
    const ChangeStatusStudent = async (_id) => {
        try {
            let myHeaders = new Headers();
            const access_token = localStorage.getItem("access_token").replaceAll('"', "")
            myHeaders.append("Authorization", "Bearer " + access_token)
            myHeaders.append("Content-Type", "application/json");

            let raw = "";

            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            }
            const response = await fetch(API_URI + "/alumno/update-status/" + _id, requestOptions);
            if (!response.ok) throw new Error("no se pudo cambiar el estado del alumno")
            if (response.status === 200) {
                setChangeStatusModal(false)
                setShowSuccessModal(true)
                await getAlumnos()
            }
        } catch (error) {
            console.error(error);
        }
    }
    const UpdateAlumnos = async () => {
        try {
            let myHeaders = new Headers();
            const access_token = localStorage.getItem("access_token").replaceAll('"', "")
            myHeaders.append("Authorization", "Bearer " + access_token)
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
            if (!response.ok) throw new Error("no se pudo actualizar el alumno")
            if (!response.ok) throw new Error("no se pudo actualizar el alumno")
            setShowSuccessModal(true);
            setShowUpdateModal(false)
            getAlumnos()
        } catch (error) {
            console.error(error);
            setformError(true)
            setErrormessage2("No se pudo Actualizar el alumno. Por favor, verifica los datos y vuelve a intentarlo.")
        }
    }

    const handleSubmit = async () => {
        const newErrores = []
        if (!NombreAlumno) {
            newErrores.NombreAlumno = 'El nombre es obligatorio'
        } else if (NombreAlumno.length < 3) {
            newErrores.NombreAlumno = "El nombre debe contener al menos 3 caracteres"

        }
        if (!ApellidoAlumno) {
            newErrores.ApellidoAlumno = "El apellido es obligatorio"
        } else if (ApellidoAlumno.length < 2) {
            newErrores.ApellidoAlumno = "El apellido debe contener al menos 2 caracteres"
        }
        if (!DNIAlumno) {
            newErrores.DNIAlumno = "El Dni es obligatorio"
        } else if (DNIAlumno.length < 7) {
            newErrores.DNIAlumno = "El dni debe contener al menos 7 caracteres"

        }
        setErrores(newErrores)

        if (Object.keys(newErrores).length === 0) {

            await createAlumnos()
            setShowCreateForm(false)
        }
    }
    const handleChangeStudent = async (_id) => {
        setIdAlumno(_id)
        setChangeStatusModal(true)
    }
    const handleConfirmDelete = async () => {
        await ChangeStatusStudent(IdAlumno);
    }
    const handleUpdateAlumnos = async (_id) => {
        const newErrores = []
        if (!updateNombre) {
            newErrores.updateNombre = 'El nombre es obligatorio'
        } else if (updateNombre.length < 3) {
            newErrores.updateNombre = "El nombre debe contener al menos 3 caracteres"

        }
        if (!updateApellido) {
            newErrores.updateApellido = "El apellido es obligatorio"
        } else if (updateApellido.length < 2) {
            newErrores.updateApellido = "El apellido debe contener al menos 2 caracteres"
        }
        if (!updateDni) {
            newErrores.updateDni = "El Dni es obligatorio"
        } else if (updateDni.length < 7) {
            newErrores.updateDni = "El Dni debe contener al menos 7 caracteres"
        }
        setErrores(newErrores)
        if (Object.keys(newErrores).length === 0) {
            await UpdateAlumnos(_id)
        }
    }
    useEffect(() => {
        getAlumnos()
    }, [])

    const Clear = () => {
        setNombreAlumno("")
        setApellidoAlumno("")
        setDNIAlumno("")
        setAnioAlumno("")



    }
    return (
        <>
            <Container>
                <Row>
                    <ButtonCustom onClick={() => { setShowCreateForm(prevState => !prevState); if (!showCreateForm) { Clear(); setErrores({}) } }} nameBtt={showCreateForm ? "Cancelar" : "Nuevo Estudiante"} />
                    <Form className={` ${Styles["alumnos__create-form"]}`} style={{ height: showCreateForm ? "auto" : undefined }}>
                        <Form.Group className="mb-3" controlId="formBasicNameAlum" >
                            <Form.Label className="font-monospace text-decoration-none">Nombre</Form.Label>
                            <Form.Control type="text"
                                placeholder="Nombre"
                                value={NombreAlumno}
                                onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setNombreAlumno(onlyLettersAndSpaces);
                                }}
                                maxLength={25}
                                style={{
                                    borderColor: Errores.NombreAlumno ? 'red' : ''
                                }}
                            />
                            {
                                Errores.NombreAlumno && (
                                    <span className="Errores text-white">{Errores.NombreAlumno}</span>
                                )
                            }

                        </Form.Group>
                        <Form.Group className="mb-3 " controlId="formBasicLasNameAlum">
                            <Form.Label className="font-monospace text-decoration-none">Apellido</Form.Label>
                            <Form.Control type="text"
                                placeholder="Apellido"
                                value={ApellidoAlumno}
                                onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setApellidoAlumno(onlyLettersAndSpaces);

                                }}
                                maxLength={25}
                                style={{
                                    borderColor: Errores.ApellidoAlumno ? 'red' : ''
                                }}
                            />    {
                                Errores.ApellidoAlumno && (
                                    <span className="Errores text-white">{Errores.ApellidoAlumno}</span>
                                )
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDniAlum">
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
                                minLength={7}
                                style={{
                                    borderColor: Errores.DNIAlumno ? 'red' : ''
                                }}
                            />
                            {
                                Errores.DNIAlumno && (
                                    <span className="Errores text-white">{Errores.DNIAlumno}</span>
                                )
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicYearAlum">
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
                <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className="font-monospace ">Actualizar Información</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className='mb-5'>
                            <Form.Group className="mb-3" controlId="formChangeNameAlum">
                                <Form.Label className="font-monospace text-decoration-none">Nombre</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Nombre"
                                    required
                                    maxLength={25}
                                    value={updateNombre}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setupdateNombre(onlyLettersAndSpaces);
                                    }}
                                    style={{
                                        borderColor: Errores.updateNombre ? 'red' : ''
                                    }}
                                />
                                {
                                    Errores.updateNombre && (
                                        <span className="Errores">{Errores.updateNombre}</span>
                                    )
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formChangeLastNameAlum">
                                <Form.Label className="font-monospace text-decoration-none">Apellido</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Apellido"
                                    required
                                    maxLength={25}
                                    value={updateApellido}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setupdateApellido(onlyLettersAndSpaces);
                                    }}
                                    style={{
                                        borderColor: Errores.updateApellido ? 'red' : ''
                                    }}
                                />
                                {
                                    Errores.updateApellido && (
                                        <span className="Errores">{Errores.updateApellido}</span>
                                    )
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formChangeDniAlum">
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
                                    style={{
                                        borderColor: Errores.updateDni ? 'red' : ''
                                    }}
                                />
                                {
                                    Errores.updateDni && (
                                        <span className="Errores">{Errores.updateDni}</span>
                                    )
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formChangeYearAlum">
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
                                        setShowUpdateModal(false)
                                        setErrores({})
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
                    </Modal.Body>
                </Modal>
                <Row>
                    <Col className={`d-flex justify-content-center ${Styles['custom-container-Alum']}`}>
                        <h2 className={`font-monospace text-decoration-none ${Styles['fs-h2']}`}>Detalle De Alumnos</h2>
                    </Col>
                    <Table className={Styles["custom-table-Alum"]} striped bordered hover>
                        <thead>
                            <tr>
                                <th className="font-monospace">Nombre</th>
                                <th className="font-monospace">Apellido</th>
                                <th className="font-monospace">N° DNI</th>
                                <th className="font-monospace">Año actual</th>
                                <th className="font-monospace">Estado actual</th>
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
                                    <td data-titulo="Estado">{alumno.isActive ? 'ACTIVO' : 'INACTIVO'}</td>
                                    <td data-titulo="Opciones">
                                        <ButtonIconCustom variant='outline-primary' icon="bi bi-activity" tooltip="Cambiar Estado" onClick={() => { handleChangeStudent(alumno._id) }} />
                                        <ButtonIconCustom variant='outline-success' icon="bi bi-pencil-square" tooltip="Actualizar Datos" onClick={() => {
                                            setShowUpdateModal(true);
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

                                    <Dropdown className={Styles['dropdown-custom']}>
                                        <Dropdown.Toggle variant="dark" id="dropdown-basic" className={Styles['btt-custom']}>
                                            Opciones
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className={Styles['menu-drop-custom']}>
                                            <Dropdown.Item className={Styles['item-drop-custom']} href="#/action-1">
                                                <ButtonIconCustom variant='outline-primary' icon="bi bi-activity" tooltip="Cambiar Estado" onClick={() => { handleChangeStudent(alumno._id) }} />

                                            </Dropdown.Item>
                                            <Dropdown.Item className={Styles['item-drop-custom']} href="#/action-2"><ButtonIconCustom variant='outline-success' icon="bi bi-pencil-square" tooltip="Actualizar Datos" onClick={() => {
                                                setShowUpdateModal(true);
                                                setupdateId(alumno._id)
                                                setupdateNombre(alumno.nameAlumno)
                                                setupdateDni(alumno.dniAlumno)
                                                setupdateApellido(alumno.lastnameAlumno)
                                                setupdateAnio(alumno.anio)
                                            }} /></Dropdown.Item>
                                            <Dropdown.Item className={Styles['item-drop-custom']} href="#/action-3"><Link to={`/auth/detalle-cursado/${alumno.libreta._id}`}>
                                                <ButtonIconCustom variant='outline-warning' icon="bi bi-journal-bookmark-fill" tooltip="Libreta Escolar" />
                                            </Link></Dropdown.Item>
                                            <Dropdown.Item className={Styles['item-drop-custom']} href="#/action-3"><Link to={`/auth/cuotas/${alumno.idAnio._id}`}>
                                                <ButtonIconCustom variant='outline-light' icon="bi bi-wallet" tooltip="Estado de Cuotas" />
                                            </Link></Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>

            <Modal show={showChangeSatusModal} onHide={() => setChangeStatusModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="font-monospace">Confirmar el cambio de estado del alumno</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-monospace">
                    ¿Estás seguro de que deseas cambiar el estado del alumno de Activo a Inactivo?
                </Modal.Body>
                <Modal.Footer>
                    <ButtonCustomRedGreen color="green" onClick={() => setChangeStatusModal(false)} nameBtt="Cancelar" />
                    <ButtonCustomRedGreen color="red" onClick={handleConfirmDelete} nameBtt="Cambiar" />
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
