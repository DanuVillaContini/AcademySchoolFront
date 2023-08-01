import { Button, Col, Container, Row, Table } from "react-bootstrap"
import styles from "../styles/detailStyle.module.css"


function CrudDetail() {

    //Esto reemplazar por la logica dle back, para traer las notas del alumno
    const prueba = [
        { _id: 1, materia: 'Historia', nota: 7.2 },
        { _id: 2, materia: 'Matemáticas', nota: 8.5 },
        { _id: 3, materia: 'Ciencias', nota: 9.0 },
        { _id: 4, materia: 'Lenguaje', nota: 6.8 },
        { _id: 5, materia: 'Artes', nota: 8.0 },
        { _id: 6, materia: 'Geografía', nota: 7.5 },
        { _id: 7, materia: 'Física', nota: 8.9 },
        { _id: 8, materia: 'Química', nota: 9.2 },
        { _id: 9, materia: 'Biología', nota: 8.7 }
    ];



    return (
        <>
            <Container >
                <Row className={`align-items-center flex-column ${styles['custom-container']}`}>
                    <Col className="d-flex justify-content-center">
                        <h2>Detalle Notas Finales</h2>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <div className={styles["custom-container-span"]}>
                            <i className="bi bi-person-bounding-box m-2">
                                <span className="m-2">Alumno: Fulano Juarez</span>
                            </i></div>
                    </Col>
                </Row>


                <Row>
                    <Table className={styles["custom-table"]} striped bordered hover>
                        <thead className="text-center" >
                            <tr>
                                <th>Materia</th>
                                <th>Nota Final</th>
                                <th>Modificar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prueba.map((prueba) => (
                                <tr key={prueba._id}>
                                    <td>{prueba.materia}</td>
                                    <td>{prueba.nota}</td>
                                    <td className="d-flex justify-content-center">
                                        <Button variant='outline-success' className={`m-1 ${styles['custom-tooltip']}`}>
                                            <i className="bi bi-pencil-square"></i>
                                            <span className={styles["tooltiptext"]}>Modificar</span>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>

            </Container>
        </>
    )
}

export default CrudDetail