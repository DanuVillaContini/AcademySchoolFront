import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import ModalAlum from '../components/ModalAlum';
import ModalBtnAlum from "./modalABtnAlum";
import Styles from "../styles/StyleAlum.module.css"
import ButtonIconCustom from "./ButtonIconCustom";
import ButtonCustom from "./ButtonCustom";
import { API_URI } from '../common/constants';



function CrudALumnos() {

    const [showModalAlum, setShowModalAlum] = useState(false);
    const [showModalBtnAlum, setShowModalBtnAlum] = useState(false);

    const [allAlumnos, setAllAlumnos] = useState([])
    const [getId, setGetId] = useState("")

    const handleCloseModalAlum = () => setShowModalAlum(false);
    const handleShowModalAlum = () => setShowModalAlum(true);
    const handleCloseModalBtnAlum = () => setShowModalBtnAlum(false);
    const handleShowModalBtnAlum = () => setShowModalBtnAlum(true);

    //Esto reemplazar por la logica dle back, para traer las notas del alumno
    // const prueba = [
    //     { _id: 1, Nombre: 'JUANITO', Apellido: 'PEREZ', Curso: "1°", cuota_al_dia: true, Estado: true },
    //     { _id: 2, Nombre: 'JESICA', Apellido: 'ALONSO ', Curso: "2°", cuota_al_dia: true, Estado: true },
    //     { _id: 3, Nombre: 'HERNESTO', Apellido: 'ORTIZ', Curso: "4°", cuota_al_dia: false, Estado: true },
    //     { _id: 4, Nombre: 'JUANITO', Apellido: 'MORALES', Curso: "6°", cuota_al_dia: true, Estado: true },
    //     { _id: 5, Nombre: 'JUANA MARTINEZ', Apellido: 'PEREZ', Curso: "5°", cuota_al_dia: false, Estado: true },
    //     { _id: 6, Nombre: 'HERNESTO', Apellido: 'ORTIZ', Curso: "4°", cuota_al_dia: false, Estado: true },
    //     { _id: 7, Nombre: 'JUANITO', Apellido: 'MORALES', Curso: "6°", cuota_al_dia: true, Estado: true },
    //     { _id: 8, Nombre: 'JUANA MARTINEZ', Apellido: 'PEREZ', Curso: "5°", cuota_al_dia: false, Estado: true },
    //     { _id: 9, Nombre: 'HERNESTO', Apellido: 'ORTIZ', Curso: "4°", cuota_al_dia: false, Estado: true },
    //     { _id: 10, Nombre: 'JUANITO', Apellido: 'MORALES', Curso: "6°", cuota_al_dia: true, Estado: true },
    //     { _id: 11, Nombre: 'JUANA MARTINEZ', Apellido: 'PEREZ', Curso: "5°", cuota_al_dia: false, Estado: true }
    // ];

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


    useEffect(() => {
        getAlumnos()
    }, [])

    return (
        <>
            <ModalBtnAlum show={showModalBtnAlum} handleClose={handleCloseModalBtnAlum} />
            <ModalAlum show={showModalAlum} handleClose={handleCloseModalAlum} />
            <>
                <Container>
                    <Row className={`align-items-center flex-column ${Styles['custom-container-Alum']}`}>
                        <Col className="d-flex justify-content-center">
                            <h2>Detalle De Alumnos</h2>
                        </Col>
                        {/*-----------------QUE ABRE VENTANA MODAL PARA FORMULARIO-------*/}
                        <>
                            <Col className="d-flex justify-content-end mb-2">
                                <ButtonCustom onClick={handleShowModalAlum} nameBtt="New Student" />
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