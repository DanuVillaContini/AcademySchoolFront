import { useEffect, useState } from "react";
import { Col, Container, Form, Modal, Row, Table, InputGroup, Dropdown } from "react-bootstrap";
import Styles from '../styles/StylesPersonal.module.css'
import ButtonIconCustom from "./ButtonIconCustom";
import ButtonCustom from "./ButtonCustom";
import { API_URI } from "../common/constants";
import ButtonCustomRedGreen from "./ButtonCustomRedGreen"
import { object } from "prop-types";

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
    const [newPassword, setNewPassword] = useState("");
    const [showpassword, setShowpassword] = useState(false);
    const switchshowpassword = () => {
        setShowpassword((prevShowPassword) => !prevShowPassword);
    };

    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showModalAscender, setShowModalAscender] = useState(false)
    const [showConfirmRevokeModal, setShowConfirmRevokeModal] = useState(false)
    const [showPasswordModal, setShowPasswordModal] = useState(false)

    const [Errores, setErrores] = useState({});


    const getPersonal = async () => {
        try {
            let myHeaders = new Headers();
            const access_token = localStorage.getItem("access_token").replaceAll('"', "")
            myHeaders.append("Authorization", "Bearer " + access_token);
            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }
            const response = await fetch(API_URI + "/personal/find", requestOptions)
            if (response.status >= 400) return alert("No se pudieron obtener los empleados")
            const result = await response.json()
            setAllPersonal(result.data)
        } catch (error) {
            console.error(error);
        }

    }
    const createPersonal = async () => {
        try {
            let myHeaders = new Headers();
            const access_token = localStorage.getItem("access_token").replaceAll('"', "")
            myHeaders.append("Authorization", "Bearer " + access_token);
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
            if (!response.ok) throw new Error("no se pudo crear el personal")

            setNamePersonal("");
            setLastnamePersonal("");
            setTelefonoPersonal("");
            setCorreoPersonal("");
            setDniPersonal("");
            setShowSuccessModal(true);
            setShowCreateForm(false);
            getPersonal()
        } catch (error) {
            console.error(error);
        }
    }
    const deletePersonal = async (_id) => {
        try {
            let myHeaders = new Headers();
            const access_token = localStorage.getItem("access_token").replaceAll('"', "")
            myHeaders.append("Authorization", "Bearer " + access_token);
            let requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };
            const response = await fetch(API_URI + "/personal/delete/" + _id, requestOptions)
            if (!response.ok) throw new Error("no se pudo eliminar el personal")
            setDeleteId("");
            setShowSuccessModal(true);
            setShowDeleteModal(false);
            await getPersonal();
        } catch (error) {
            console.error(error);
        }

    }
    const updatePersonal = async () => {
        try {
            let myHeaders = new Headers();
            const access_token = localStorage.getItem("access_token").replaceAll('"', "")
            myHeaders.append("Authorization", "Bearer " + access_token);
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
            if (!response.ok) throw new Error("no se pudo actualizar el personal")
            setShowSuccessModal(true);
            setShowUpdateModal(false)
            await getPersonal()
        } catch (error) {
            console.error(error);
        }
    }
    const ascenderPersonal = async (_id) => {
        try {
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
            if (!response.ok) throw new Error("no se pudo ascender el personal")
            if (response.status === 200) {
                setShowModalAscender(false);
                setShowSuccessModal(true);
                setPassword("");
                await getPersonal();
            }
        } catch (error) {
            console.error(error);
        }
    }
    const revokeRolAdmin = async (_id) => {
        try {
            let raw = "";

            let requestOptions = {
                method: 'PUT',
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(API_URI + "/auth/revoke-rol/" + _id, requestOptions);
            if (!response.ok) throw new Error("no se pudo revocar el rol del personal");

            await getPersonal();
            setShowConfirmRevokeModal(true)
            setCurrentEmpleadoId(_id);
            setShowConfirmRevokeModal(true);
        } catch (error) {
            console.error(error);
        }
    }
    const changePass = async (newPassword) => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                nuevaPass: newPassword
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            const response = await fetch(API_URI + "/auth/change-password/" + currentEmpleadoId, requestOptions)
            if (!response.ok) throw new Error("no se pudo cambiar la contraseña del personal");
            if (response.status === 200) {
                setShowModalAscender(false);
                setShowSuccessModal(true);
                setPassword("");
                await getPersonal();
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit = async () => {
        const newErrores = {}
        if (!namePersonal) {
            newErrores.namePersonal = 'El nombre es obligatorio'
        } else if (namePersonal.length < 3) {
            newErrores.namePersonal = "El nombre debe contener al menos 3 caracteres"

        }
        if (!lastnamePersonal) {
            newErrores.lastnamePersonal = "El apellido es obligatorio"
        } else if (lastnamePersonal.length < 2) {
            newErrores.lastnamePersonal = "El apellido debe contener al menos 2 caracteres"
        }
        if (!telefonoPersonal) {
            newErrores.telefonoPersonal = "El telefono es obligatorio"
        } else if (telefonoPersonal.length < 7) {
            newErrores.telefonoPersonal = "El telefono debe contenr al menos 7 caracteres "
        }
        if (!correoPersonal) {
            newErrores.correoPersonal = "El correo es un campo obligatorio"
        } else if (!correoPersonal.includes("@") || !correoPersonal.includes(".com")) {
            newErrores.correoPersonal = "El correo debe poseer formato similar a example@example.com"
        } if (!dniPersonal) {
            newErrores.dniPersonal = "El Dni es obligatorio"
        }
        setErrores(newErrores)

        if (Object.keys(newErrores).length === 0) {

            await createPersonal()
            setShowCreateForm(false);
        }
    }
    const handleDeletePersonal = async (_id) => {
        setDeleteId(_id)
        setShowDeleteModal(true)
    }
    const handleConfirmDelete = async () => {
        await deletePersonal(deleteId);
    }
    const handleUpdatePersonal = async (_id) => {
        const newErrores={}

        if(!updateName){
            newErrores.updateName='El nombre es obligatorio'
        }else if(updateName.length < 3){
            newErrores.updateName="El nombre debe contener al menos 3 caracteres"
        }
        if(!updateLastname){
            newErrores.updateLastname="El apellido es obligatorio"
        }else if(updateLastname.length < 2){
            newErrores.updateLastname="El apellido debe contener al menos 2 caracteres"
        }
        if(!updateTelefono){
            newErrores.updateTelefono="El telefono es obligatorio"
        }else if(updateTelefono.length<7){
            newErrores.updateTelefono="El telefono debe contenr al menos 7 caracteres "
        }
        if(!updateCorreo){
            newErrores.updateCorreo="El correo es un campo obligatorio"
        }else if(!updateCorreo.includes("@")||!updateCorreo.includes(".com")){
            newErrores.updateCorreo="El correo es incorrecto"
        }if(!updateDni){
            newErrores.updateDni="El Dni es obligatorio"
        }
        setErrores(newErrores)
        if(Object.keys(newErrores).length===0){
        await updatePersonal(_id)
    }}
    const handleUpdateAscenderPersonal = async () => {
        await ascenderPersonal(currentEmpleadoId)
    }
    const handleConfirmRevoke = async () => {
        await revokeRolAdmin(currentEmpleadoId);
        setShowConfirmRevokeModal(false);
        await getPersonal();
    };
    const handleOpenPasswordModal = (_id) => {
        setCurrentEmpleadoId(_id);
        setShowPasswordModal(true);
    };
    useEffect(() => {
        getPersonal()
    }, [])

    const Clear = () => {
        setNamePersonal("")
        setLastnamePersonal("")
        setTelefonoPersonal("")
        setCorreoPersonal("")
        setDniPersonal("")
    }
    return (
        <>
            <Container className="container-fluid">
                <Row>
                    <ButtonCustom onClick={() => { setShowCreateForm(prevState => !prevState); if (!showCreateForm) { Clear(); } }} nameBtt={showCreateForm ? "Cancelar" : "Nuevo Personal"} />
                    <Form className={`mb-1 ${Styles["personal__create-form"]}`} style={{ height: showCreateForm ? "auto" : undefined }}>
                        <Form.Group className={`font-monospace`} controlId="formBasicNameP">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text"
                                placeholder="Ingrese una categorial"
                                maxLength={25}
                                value={namePersonal}
                                onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setNamePersonal(onlyLettersAndSpaces);
                                }}
                                style={{
                                    borderColor: Errores.namePersonal ? 'red' : ''
                                }}
                            />
                            {
                                Errores.namePersonal && (
                                    <span className="Errores text-white">{Errores.namePersonal}</span>
                                )
                            }
                        </Form.Group>
                        <Form.Group className={`font-monospace `} controlId="formBasicLastNameP">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text"
                                placeholder="Ingrese la descripcion"
                                maxLength={25}
                                value={lastnamePersonal}
                                onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                    setLastnamePersonal(onlyLettersAndSpaces);
                                }}
                                style={{
                                    borderColor: Errores.lastnamePersonal ? 'red' : ''
                                }}
                            />
                            {
                                Errores.lastnamePersonal && (
                                    <span className="Errores text-white">{Errores.lastnamePersonal}</span>
                                )
                            }
                        </Form.Group>
                        <Form.Group className={`font-monospace`} controlId="formBasicCellphoneP">
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
                                style={{
                                    borderColor: Errores.telefonoPersonal ? 'red' : ''
                                }}
                            />{
                                Errores.telefonoPersonal && (
                                    <span className="Errores text-white">{Errores.telefonoPersonal}</span>
                                )
                            }
                        </Form.Group>
                        <Form.Group className={`font-monospace`} controlId="formBasicEmailP">
                            <Form.Label>Correo Electronico</Form.Label>
                            <Form.Control type="email"
                                placeholder="Ingrese correo electronico"
                                maxLength={60}
                                value={correoPersonal}
                                onChange={(e) => setCorreoPersonal(e.target.value)}
                                style={{
                                    borderColor: Errores.correoPersonal ? 'red' : ''
                                }}
                            />

                            {
                                Errores.correoPersonal && (
                                    <span className="Errores text-white">{Errores.correoPersonal}</span>
                                )
                            }

                        </Form.Group>
                        <Form.Group className={`font-monospace `} controlId="formBasicDniP">
                            <Form.Label>N° DNI</Form.Label>
                            <Form.Control type="email"
                                placeholder="Ingrese N° de Legajo"
                                maxLength={8}
                                minLength={7}
                                value={dniPersonal}
                                onChange={(e) => {
                                    const input = e.target.value
                                    const onlyNumbers = input.replace(/[^0-9]/g, "");
                                    setDniPersonal(onlyNumbers)
                                }}
                                style={{
                                    borderColor: Errores.dniPersonal ? 'red' : ''
                                }}
                            />{
                                Errores.dniPersonal && (
                                    <span className="Errores text-white">{Errores.dniPersonal}</span>
                                )
                            }
                        </Form.Group>
                        <ButtonCustomRedGreen color="green" nameBtt="Cargar Empleado" onClick={handleSubmit} disabled={!namePersonal || !lastnamePersonal || !telefonoPersonal || !correoPersonal || !dniPersonal} />
                    </Form>
                </Row>
                <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title className="font-monospace ">Actualizar Información</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className='mb-5'>
                            <Form.Group className="font-monospace" controlId="formChangeNameP">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Ingrese una categorial"
                                    maxLength={25}
                                    required
                                    value={updateName}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setUpdateName(onlyLettersAndSpaces);
                                    }}
                                    style={{
                                        borderColor: Errores.updateName ? 'red' : ''
                                    }}
                                />
                                {
                                Errores.updateName && (
                                    <span className="Errores">{Errores.updateName}</span>
                                )
                            }
                            </Form.Group>
                            <Form.Group className="font-monospace" controlId="formChangeLastNameP">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Ingrese la descripcion"
                                    maxLength={25}
                                    required
                                    value={updateLastname}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-zñÑ\s]/g, "");
                                        setUpdateLastname(onlyLettersAndSpaces);
                                    }}
                                    style={{
                                        borderColor: Errores.updateLastname ? 'red' : ''
                                    }}
                                />
                                {
                                Errores.updateLastname && (
                                    <span className="Errores">{Errores.updateLastname}</span>
                                )
                            }
                            </Form.Group>
                            <Form.Group className="font-monospace" controlId="formChangeCellphoneP">
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
                                    style={{
                                        borderColor: Errores.updateTelefono ? 'red' : ''
                                    }}
                                />
                                {
                                Errores.updateTelefono && (
                                    <span className="Errores">{Errores.updateTelefono}</span>
                                )
                            }
                            </Form.Group>
                            <Form.Group className="font-monospace " controlId="formChangeEmailP">
                                <Form.Label>Correo Electronico</Form.Label>
                                <Form.Control type="email"
                                    placeholder="Ingrese correo electronico"
                                    maxLength={60}
                                    required
                                    value={updateCorreo}
                                    onChange={(e) => setUpdateCorreo(e.target.value)}
                                    style={{
                                        borderColor: Errores.updateCorreo ? 'red' : ''
                                    }}
                            />
                            {
                                Errores.updateCorreo && (
                                    <span className="Errores">{Errores.updateCorreo}</span>
                                )
                            }
                            </Form.Group>
                            <Form.Group className="font-monospace" controlId="formChangeDniP">
                                <Form.Label>N° DNI</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Ingrese el N° de DNI"
                                    maxLength={8}
                                    minLength={7}
                                    required
                                    value={updateDni}
                                    onChange={(e) => {
                                        const input = e.target.value
                                        const onlyNumbers = input.replace(/[^0-9]/g, "");
                                        setUpdateDni(onlyNumbers);
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
                            <Row>
                                <Col>
                                    <ButtonCustomRedGreen color="red" nameBtt="Cancelar" onClick={() => setShowUpdateModal(false)} />
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
                    </Modal.Body>
                </Modal>
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
                            <Form.Group className="font-monospace" controlId="formBasicPassword">
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
                        <h2 className={`font-monospace text-decoration-none ${Styles['fs-h2']}`}>Personal Institucion</h2>
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
                            {allPersonal.map((empleado, index) => (
                                <tr key={empleado._id}>
                                    <td data-titulo="DNI">{empleado.dniUser}</td>
                                    <td data-titulo="Nombre">{empleado.nameUser}</td>
                                    <td data-titulo="Apellido">{empleado.lastnameUser}</td>
                                    <td data-titulo="Telefono">{empleado.telefono}</td>
                                    <td data-titulo="Correo">{empleado.correo}</td>
                                    <td data-titulo="Opciones">
                                        {index === 0 ? (
                                            <>
                                                <td className="font-monospace ">Operaciones no disponibles</td>
                                            </>
                                        ) : (
                                            <>
                                                <ButtonIconCustom variant='outline-danger' icon="bi bi-trash3-fill" tooltip="Eliminar" onClick={() => {
                                                    handleDeletePersonal(empleado._id)
                                                }} />
                                                <ButtonIconCustom
                                                    variant='outline-success'
                                                    icon="bi bi-pencil-square"
                                                    tooltip="Actualizar"
                                                    onClick={() => {
                                                        setShowUpdateModal(true);
                                                        setUpdateId(empleado._id)
                                                        setUpdateDni(empleado.dniUser)
                                                        setUpdateName(empleado.nameUser)
                                                        setUpdateLastname(empleado.lastnameUser)
                                                        setUpdateTelefono(empleado.telefono)
                                                        setUpdateCorreo(empleado.correo)
                                                    }}
                                                />
                                                {empleado.isAdmin ? (
                                                    <>
                                                        <ButtonIconCustom
                                                            variant='outline-warning'
                                                            icon="bi bi-key"
                                                            tooltip="Cambiar Contraseña"
                                                            onClick={() => handleOpenPasswordModal(empleado._id)}
                                                        />
                                                        <ButtonIconCustom
                                                            variant='outline-secondary'
                                                            icon="bi bi-person-dash"
                                                            tooltip="Revocar Rol de Admin"
                                                            onClick={() => {
                                                                setCurrentEmpleadoId(empleado._id);
                                                                setShowConfirmRevokeModal(true);
                                                            }}
                                                        />
                                                    </>
                                                ) : (
                                                    <ButtonIconCustom variant='outline-warning' icon="bi bi-star-half" tooltip="Ascender" onClick={() => {
                                                        setCurrentEmpleadoId(empleado._id)
                                                        setShowModalAscender(true)
                                                    }} />
                                                )}
                                            </>
                                        )}
                                    </td>
                                    <Dropdown className={Styles['dropdown-custom']}>
                                        <Dropdown.Toggle variant="dark" id="dropdown-basic" className={Styles['btt-custom']}>
                                            Opciones
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className={Styles['menu-drop-custom']}>
                                            {index === 0 ? (
                                                <>
                                                    <td className="font-monospace ">Operaciones no disponibles</td>
                                                </>
                                            ) : (
                                                <>
                                                    <Dropdown.Item className={Styles['item-drop-custom']} href="#/action-1">
                                                        <ButtonIconCustom variant='outline-danger' icon="bi bi-trash3-fill" tooltip="Eliminar" onClick={() => {
                                                            handleDeletePersonal(empleado._id)
                                                        }} />
                                                    </Dropdown.Item>
                                                    <Dropdown.Item className={Styles['item-drop-custom']} href="#/action-2">
                                                        <ButtonIconCustom
                                                            variant='outline-success'
                                                            icon="bi bi-pencil-square"
                                                            tooltip="Actualizar"
                                                            onClick={() => {
                                                                setShowUpdateModal(true);
                                                                setUpdateId(empleado._id)
                                                                setUpdateDni(empleado.dniUser)
                                                                setUpdateName(empleado.nameUser)
                                                                setUpdateLastname(empleado.lastnameUser)
                                                                setUpdateTelefono(empleado.telefono)
                                                                setUpdateCorreo(empleado.correo)
                                                            }}
                                                        />
                                                    </Dropdown.Item>
                                                    <Dropdown.Item className={Styles['item-drop-custom']} href="#/action-3">
                                                        {empleado.isAdmin ? (
                                                            <>
                                                                <ButtonIconCustom
                                                                    variant='outline-warning'
                                                                    icon="bi bi-key"
                                                                    tooltip="Cambiar Contraseña"
                                                                    onClick={() => handleOpenPasswordModal(empleado._id)}
                                                                />
                                                                <ButtonIconCustom
                                                                    variant='outline-secondary'
                                                                    icon="bi bi-person-dash"
                                                                    tooltip="Revocar Rol de Admin"
                                                                    onClick={() => {
                                                                        setCurrentEmpleadoId(empleado._id);
                                                                        setShowConfirmRevokeModal(true);
                                                                    }}
                                                                />
                                                            </>
                                                        ) : (
                                                            <ButtonIconCustom variant='outline-warning' icon="bi bi-star-half" tooltip="Ascender" onClick={() => {
                                                                setCurrentEmpleadoId(empleado._id)
                                                                setShowModalAscender(true)
                                                            }} />
                                                        )}
                                                    </Dropdown.Item>
                                                </>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>
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

            <Modal show={showConfirmRevokeModal} onHide={() => setShowConfirmRevokeModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="font-monospace">Confirmar revocación de rol</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-monospace">
                    ¿Estás seguro de que deseas revocar el rol de este empleado?
                </Modal.Body>
                <Modal.Footer>
                    <ButtonCustomRedGreen color="green" onClick={() => setShowConfirmRevokeModal(false)} nameBtt="Cancelar" />
                    <ButtonCustomRedGreen color="red" onClick={handleConfirmRevoke} nameBtt="Revocar" />
                </Modal.Footer>
            </Modal>
            <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="font-monospace">Cambiar Contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type={showpassword ? 'text' : "password"}
                        placeholder="Nueva contraseña"
                        value={newPassword}
                        maxLength={20}
                        minLength={9}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                </Modal.Body>
                <Modal.Footer>
                    <ButtonCustomRedGreen color="green" onClick={() => setShowPasswordModal(false)} nameBtt="Cancelar" />
                    <ButtonCustomRedGreen
                        color="red"
                        onClick={() => {
                            changePass(newPassword);
                            setShowPasswordModal(false);
                        }}
                        nameBtt="Cambiar"
                    />

                </Modal.Footer>
            </Modal>


        </>
    )
}

export default CrudPersonal