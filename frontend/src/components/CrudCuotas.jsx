import { Col, Container, Form, Modal, Row, Table } from "react-bootstrap"
import styles from "../styles/detailStyle.module.css"
import ButtonCustomRedGreen from "./ButtonCustomRedGreen";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URI } from "../common/constants";
import ButtonIconCustom from "./ButtonIconCustom";


function CrudCuotas() {
    const { id } = useParams();

    const [allCuotas, setAllCuotas] = useState([])
    // const [changeCuota, setChangeCuota] = useState([])

    const [showModal, setShowModal] = useState(false);
    const [toggleState, setToggleState] = useState(false);
    const [currentCuota, setCurrentCuota] = useState("");

    const getCuotas = async () => {
        try {
            const response = await fetch(API_URI + "/year/show/" + id);
            if (!response.ok) throw new Error("No se pudieron obtener las notas");
            const result = await response.json();
            console.log("Notas recibidas:", result);

            // Filtrar propiedades no deseadas (_id y __v) antes de establecer el estado
            const filteredNotas = Object.entries(result).reduce(
                (filtered, [key, value]) => {
                    if (key !== "_id" && key !== "__v") {
                        filtered[key] = value;
                    }
                    return filtered;
                },
                {}
            );
            if (Object.keys(filteredNotas).length > 0) {
                setAllCuotas(filteredNotas);
            } else {
                console.log("No hay notas disponibles.");
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };
    const updateEstadoCuota = async () => {
        try {
            let requestOptions = {
                method: 'PUT',
                redirect: 'follow'
            };

            const response = await fetch(
                API_URI +
                "/year/update/" + id + "/" +
                currentCuota,
                requestOptions
            );
            const result = await response.text();
            console.log(result);

            getCuotas();
            setShowModal(false);
        } catch (error) {
            console.error(error);
            alert("Error al actualizar la nota.");
        }
    }
    const handleUpdateEstadoCuota = async () => {
        await updateEstadoCuota()
    }
    useEffect(() => {
        getCuotas()
    }, [])

    return (
        <>
            <Container>
                <Row className={`align-items-center flex-column ${styles['custom-container']}`}>
                    <Col className="d-flex justify-content-center">
                        <h2>Detalle Cuotas</h2>
                    </Col>
                </Row>
                <Row>
                    {Object.keys(allCuotas).length > 0 ? (
                        <>
                            <Table className={styles["custom-table"]} striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Cuota</th>
                                        <th>Estado</th>
                                        <th>Actualizar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(allCuotas).map(([cuotaNombre, estado]) => (
                                        <tr key={cuotaNombre}>
                                            <td>{cuotaNombre}</td>
                                            {/* Cambia el valor del estado a "pagado" o "no pagado" según su valor */}
                                            <td>{estado ? "Pagado" : "No pagado"}</td>
                                            <td>
                                                <ButtonIconCustom
                                                    variant="outline-success"
                                                    icon="bi bi-pencil-square"
                                                    tooltip="Actualizar"
                                                    onClick={() => {
                                                        setCurrentCuota(cuotaNombre);
                                                        setShowModal(true);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            {/* Modal para actualizar notas */}
                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Actualizar Estado Cuotas</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        {/* Elimina el Form.Control anterior */}
                                        <Form.Group controlId="formToggle">
                                            <Form.Label>Estado de la Cuota</Form.Label>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                label={toggleState ? "Pagado" : "No Pagado"}
                                                checked={toggleState}
                                                onChange={() => setToggleState(!toggleState)}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <ButtonCustomRedGreen
                                        color="red"
                                        onClick={() => setShowModal(false)}
                                        nameBtt="Cancelar"
                                    />
                                    <ButtonCustomRedGreen
                                        color="green"
                                        onClick={handleUpdateEstadoCuota}
                                        nameBtt="Actualizar"
                                        disabled={toggleState === currentCuota}
                                    />
                                </Modal.Footer>
                            </Modal>
                        </>
                    ) : (
                        <p>No hay registro de cuotas disponibles.</p>
                    )}
                </Row>

            </Container>
        </>
    )
}

export default CrudCuotas
