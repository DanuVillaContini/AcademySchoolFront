import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import ModalAlum from '../components/ModalAlum';
import ModalBtnAlum from "./modalABtnAlum";
import Styles from "../styles/StyleAlum.module.css"
import ButtonIconCustom from "./ButtonIconCustom";
import ButtonCustom from "./ButtonCustom";
import { API_URI } from '../common/constants';
import Form from 'react-bootstrap/Form';



function CrudALumnos() {

    const [showCreateForm, setShowCreateForm] = useState("")

    // const [showModalAlum, setShowModalAlum] = useState(false);
    const [showModalBtnAlum, setShowModalBtnAlum] = useState(false);

    const [allAlumnos, setAllAlumnos] = useState([])
    const [NombreAlumno,setNombreAlumno]= useState("")
    const [ApellidoAlumno,setApellidoAlumno]= useState("")
    const [CodigoAlumno,setCodigoAlumno]= useState("")
    const [AnioAlumno,setAnioAlumno]= useState("")





    // const [getId, setGetId] = useState("")

    // const handleCloseModalAlum = () => setShowModalAlum(false);
    // const handleShowModalAlum = () => setShowModalAlum(true);
    const handleCloseModalBtnAlum = () => setShowModalBtnAlum(false);
    const handleShowModalBtnAlum = () => setShowModalBtnAlum(true);

    

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

    // const createNewStudent = async () => {
    //     let myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     let raw = JSON.stringify({
    //         "nameAlumno": "Martin",
    //         "lastnameAlumno": "Fierro",
    //         "legajoAlumno": 1115
    //     });

    //     let requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     const response = await fetch(API_URI + "/alumno/create", requestOptions)
    //     const result = await response.json()
    //     console.log(result)
    // }

    // --- HANDLERS ---
    const handleSubmit = async () => {
        // await createCategory()
        await getAlumnos()
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
                    {/**Formulario*/}


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
                        <Form.Label>Legajo</Form.Label>
                        <Form.Control type="text"
                            placeholder="Apellido"
                            value={CodigoAlumno}
                            onChange={(e) => setCodigoAlumno(e.target.value)} />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>año</Form.Label>
                        <Form.Control type="text"
                            placeholder="Año"
                            value={AnioAlumno}
                            onChange={(e) => setAnioAlumno(e.target.value)} />
                    </Form.Group>
                    <Button variant='outline-primary' className="mb-2" onClick={handleSubmit}>Cargar Category</Button>
                </Form>

                    <Row className={`align-items-center flex-column ${Styles['custom-container-Alum']}`}>
                        <Col className="d-flex justify-content-center">
                            <h2>Detalle De Alumnos</h2>
                        </Col>
                        {/*----------QUE ABRE VENTANA MODAL PARA FORMULARIO-------*/}
                        <>
                            <Col className="d-flex justify-content-end mb-2">
                                {/* <ButtonCustom onClick={handleShowModalAlum} nameBtt="New Student" /> */}
                            </Col>
                        </>

                    </Row>
                    <Row><>
                        <Table className={Styles["custom-table-Alum"]} striped bordered hover>
                            {/*-------TABLA INICIO----------------------------*/}
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Legajo</th>
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
                                        <td data-titulo="Legajo">{alumno.legajoAlumno}</td>
                                        <td data-titulo="Cuota al dia">{alumno.cuotaAlumno ? <Button variant='success' className="m-1"> </Button> : <Button variant='danger' className="m-1"></Button>}</td>
                                        <td data-titulo="Año">{alumno.anio}</td>
                                        <td data-titulo="Opciones">
                                            <ButtonIconCustom variant='outline-danger' icon="bi bi-trash3-fill" tooltip="Eliminar" />
                                            <ButtonIconCustom variant='outline-success' icon="bi bi-pencil-square" tooltip="Actualizar" />
                                            <ButtonIconCustom to="/menu/detalle-cursado" variant='outline-warning' icon="bi bi-journal-bookmark-fill" tooltip="Ver Notas" />
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


        </>






    )
}

export default CrudALumnos