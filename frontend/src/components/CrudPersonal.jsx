import { useEffect, useState } from "react";
import { Col, Container, Form, Modal, Row, Table, InputGroup, Button } from "react-bootstrap";
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

    const [showpassword, setShowpassword] = useState(false);

    const switchshowpassword = () => {
        setShowpassword((prevShowPassword) => !prevShowPassword);
    };


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
            <Container className="container-fluid">
                <Row>
                    <ButtonCustom onClick={() => setShowCreateForm(prevState => !prevState)} nameBtt={showCreateForm ? "Cancelar" : "Nuevo Estudiante"} />
                    <Form className={`mb-1 ${Styles["categories__create-form"]}`} style={{ height: showCreateForm ? "auto" : undefined }}>
                        <Form.Group className="font-monospace" controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text"
                                placeholder="Ingrese una categorial"
                                maxLength={25}
                                value={namePersonal}
                                onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                    setNamePersonal(onlyLettersAndSpaces);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="font-monospace" controlId="formBasicEmail">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text"
                                placeholder="Ingrese la descripcion"
                                maxLength={25}
                                value={lastnamePersonal}
                                onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                    setLastnamePersonal(onlyLettersAndSpaces);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="font-monospace" controlId="formBasicEmail">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control type="text"
                                placeholder="Ingrese n° de Telefono"
                                maxLength={11}
                                value={telefonoPersonal}
                                onChange={(e) => {
                                    const input = e.target.value
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    setTelefonoPersonal(onlyNumbers);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="font-monospace" controlId="formBasicEmail">
                            <Form.Label>Correo Electronico</Form.Label>
                            <Form.Control type="email"
                                placeholder="Ingrese correo electronico"
                                maxLength={60}
                                value={correoPersonal}
                                onChange={(e) => setCorreoPersonal(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="font-monospace" controlId="formBasicEmail">
                            <Form.Label>N° DNI</Form.Label>
                            <Form.Control type="email"
                                placeholder="Ingrese N° de Legajo"
                                maxLength={8}
                                minLength={7}
                                value={dniPersonal}
                                onChange={(e) => {
                                    const input = e.target.value
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    setDniPersonal(onlyNumbers);
                                }}
                            />
                        </Form.Group>
                        <ButtonCustomRedGreen color="green" nameBtt="Cargar Empleado" onClick={handleSubmit} disabled={!namePersonal || !lastnamePersonal || !telefonoPersonal || !correoPersonal || !dniPersonal} />
                    </Form>
                </Row>
                {
                    updateId.length > 0 && showUpdateForm && (
                        <Form className='mb-5'>
                            <Form.Group className="font-monospace" controlId="formBasicEmail">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Ingrese una categorial"
                                    maxLength={25}
                                    required
                                    value={updateName}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                        setUpdateName(onlyLettersAndSpaces);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="font-monospace" controlId="formBasicEmail">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Ingrese la descripcion"
                                    maxLength={25}
                                    required
                                    value={updateLastname}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                        setUpdateLastname(onlyLettersAndSpaces);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="font-monospace" controlId="formBasicEmail">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control type="tel"
                                    placeholder="Ingrese n° de Telefono"
                                    maxLength={15}
                                    required
                                    value={updateTelefono}
                                    onChange={(e) => {
                                        const input = e.target.value
                                        const onlyNumbers = input.replace(/[^0-9]/g, "");
                                        setUpdateTelefono(onlyNumbers);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="font-monospace " controlId="formBasicEmail">
                                <Form.Label>Correo Electronico</Form.Label>
                                <Form.Control type="email"
                                    placeholder="Ingrese correo electronico"
                                    maxLength={60}
                                    required
                                    value={updateCorreo}
                                    onChange={(e) => setUpdateCorreo(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="font-monospace" controlId="formBasicEmail">
                                <Form.Label>N° DNI</Form.Label>
                                <Form.Control type="email"
                                    placeholder="Ingrese correo electronico"
                                    maxLength={8}
                                    minLength={7}
                                    required
                                    value={updateDni}
                                    onChange={(e) => {
                                        const input = e.target.value
                                        const onlyNumbers = input.replace(/[^0-9]/g, "");
                                        setUpdateDni(onlyNumbers);
                                    }}
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <ButtonCustomRedGreen color="red" nameBtt="Cancelar" onClick={() => {
                                        setUpdateId("")
                                        setUpdateName("")
                                        setUpdateLastname("")
                                        setUpdateTelefono("")
                                        setUpdateCorreo("")
                                        setUpdateDni("")
                                    }} />
                                </Col>
                                <Col>
                                    <ButtonCustomRedGreen
                                        color="green"
                                        onClick={handleUpdatePersonal}
                                        nameBtt="Cargar Actualizacion"
                                        disabled={!updateName || !updateLastname || !updateTelefono || !updateCorreo || !updateDni}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    )
                }

                <Modal show={showModalAscender} onHide={() => {
                    setShowModalAscender(false);
                    setPassword("");
                    setShowpassword(false);
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title className="font-monospace ">Ascender empleado a rol Admin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="font-monospace" controlId="formBasicEmail">
                                <Form.Label className="font-monospace ">Constraseña</Form.Label>
                                <Form.Control
                                    type={showpassword ? 'text' : "password"}
                                    placeholder="Ingrese una constraseña"
                                    value={password}
                                    maxLength={20}
                                    minLength={9}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputGroup.Text>
                                    <input
                                        type="checkbox"
                                        checked={showpassword}
                                        name="remember"
                                        onChange={switchshowpassword}
                                    />
                                    Mostrar
                                </InputGroup.Text>
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
                            maxLength={15}
                            minLength={8}
                            disabled={!password}
                        />
                    </Modal.Footer>
                </Modal>
                <Row>
                    <Col className={`d-flex justify-content-center ${Styles['custom-container-Perso']}`}>
                        <h2 className="font-monospace text-decoration-none">Personal Institucion</h2>
                    </Col>
                    <Table className={Styles["custom-table-Perso"]} striped bordered hover>
                        <thead >
                            <tr className="font-monospace text-decoration-none">
                                <th className="font-monospace ">DNI</th>
                                <th className="font-monospace ">Nombre</th>
                                <th className="font-monospace ">Apellido</th>
                                <th className="font-monospace ">Telefono</th>
                                <th className="font-monospace ">Correo</th>
                                <th className="font-monospace ">Operaciones</th>
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

                </Row>
            </Container>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="font-monospace ">Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-monospace ">
                    ¿Estás seguro de que deseas eliminar este elemento?
                </Modal.Body>
                <Modal.Footer>
                    <ButtonCustomRedGreen color="green" onClick={() => setShowDeleteModal(false)} nameBtt="Cancelar" />
                    <ButtonCustomRedGreen color="red" onClick={handleConfirmDelete} nameBtt="Eliminar" />
                </Modal.Footer>
            </Modal>
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="font-monospace ">Operación exitosa</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-monospace ">
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