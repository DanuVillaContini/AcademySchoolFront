import { Col, Container, Form, Modal, Row, Table } from "react-bootstrap"
import styles from "../styles/cuotaStyle.module.css"
import ButtonCustomRedGreen from "./ButtonCustomRedGreen";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URI } from "../common/constants";
import ButtonIconCustom from "./ButtonIconCustom";


function CrudCuotas() {
    const { id } = useParams();
    const [allCuotas, setAllCuotas] = useState([])
    const [alDiaCuota, setAlDiaCuota] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [currentCuota, setCurrentCuota] = useState("");

    const getCuotas = async () => {
        try {
            const response = await fetch(API_URI + "/year/show/" + id);
            if (!response.ok) throw new Error("No se pudieron obtener las notas");
            const result = await response.json();
            console.log("Notas recibidas:", result);
            // Filtrar propiedades no deseadas (_id y __v) antes de establecer el estado
            const filteredCuotas = Object.entries(result.cuotas).reduce(
                (filtered, [key, value]) => {
                    if (key !== "_id" && key !== "__v") {
                        filtered[key] = value;
                    }
                    return filtered;
                },
                {}
            );
            if (Object.keys(filteredCuotas).length > 0) {
                setAllCuotas(filteredCuotas);
                setAlDiaCuota(result.alDia)
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
                <Row className={`align-items-center flex-column ${styles['custom-h1']}`}>
                    <Col className="d-flex justify-content-center">
                        <h2 className="font-monospace text-decoration-none">Detalle del estado cuotas:</h2>
                    </Col>
                </Row>
                <Row className={`align-items-center flex-column ${styles['custom-h5']}`}>
                    <Col className="d-flex justify-content-center m-1">
                        <h5 className="font-monospace text-decoration-none d-flex align-items-center pt-2">Alumno {alDiaCuota ? "al dia" : "debe Cuota"}</h5>
                        <div className="m-1 p-1">
                            {alDiaCuota ? (
                                <label className={`${styles['custom-switch-cuota']} ${styles['alDia']}`}>
                                    <input  type="checkbox" disabled />
                                    <span className={styles['btt-cuota-slider']}></span>
                                </label>
                            ) : (
                                <label className={`${styles['custom-switch-cuota']} ${styles['debeCuota']}`}>
                                    <input type="checkbox" disabled />
                                    <span className={styles['btt-cuota-slider']}></span>
                                </label>
                            )}
                        </div>
                    </Col>
                </Row>
                <Row>
                    {Object.keys(allCuotas).length > 0 ? (
                        <>
                            <Table className={styles["custom-table"]} striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className="font-monospace">Cuota</th>
                                        <th className="font-monospace">Estado</th>
                                        <th className="font-monospace">Actualizar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(allCuotas).map(([cuotaNombre, estado]) => (
                                        <tr key={cuotaNombre}>
                                            <td>{cuotaNombre}</td>
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
                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title className="font-monospace">Estado Cuotas</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="formToggle">
                                            <Form.Label className="font-monospace text-center">Estas seguro que deseas actualizar el estado de la Cuota?</Form.Label>
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
                                        Cuotas />
                                </Modal.Footer>
                            </Modal>
                        </>
                    ) : (
                        <p className="font-monospace">No hay registro de cuotas disponibles.</p>
                    )}
                </Row>

            </Container>
        </>
    )
}

export default CrudCuotas
