import styles from "../styles/detailStyle.module.css"
import ButtonIconCustom from "./ButtonIconCustom";
import { Col, Container, Form, Modal, Row, Table } from "react-bootstrap"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { API_URI } from "../common/constants";
import ButtonCustomRedGreen from "./ButtonCustomRedGreen";
import 'bootstrap/dist/css/bootstrap.css';



function CrudDetail() {


    const { id } = useParams();

    const [notas, setNotas] = useState([])
    const [changeNota, setChangeNota] = useState([])

    const [showModal, setShowModal] = useState(false);
    const [currentMateria, setCurrentMateria] = useState("");

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [updateSuccess, setUpdateSuccess] = useState(false)

    const getNotas = async () => {
        try {
            let myHeaders = new Headers();
            const access_token = localStorage.getItem("access_token").replaceAll('"',"")
            myHeaders.append("Authorization", "Bearer " + access_token);

            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            } 
            const response = await fetch(API_URI + "/materias/show/" + id, requestOptions);
            if (!response.ok) throw new Error("No se pudieron obtener las notas");
            const result = await response.json();

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
                setNotas(filteredNotas);
            } 
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const updateNotas = async () => {
        try {
            let myHeaders = new Headers();
            const access_token = localStorage.getItem("access_token").replaceAll('"',"")
            myHeaders.append("Authorization", "Bearer " + access_token);
            myHeaders.append("Content-Type", "application/json")
            const raw = JSON.stringify({
                nota: changeNota,
            });
            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };
            const response = await fetch(
                API_URI + "/materias/update/" + id + "/" + currentMateria,
                requestOptions
            );
            if (!response.ok) throw new Error("no se pudo actualizar el estado de cuotas del alumno")
            if (response.ok) {
                setUpdateSuccess(true);
            } else {
                setUpdateSuccess(false);
            }
    
            getNotas();
            setShowModal(false);
            setShowSuccessModal(true); 
        } catch (error) {
            console.error(error);
            alert("Error al actualizar la nota.");
        }
    }
    
    const handleUpdateNota = async () => {
        await updateNotas()
        setShowSuccessModal(true);

    }

    useEffect(() => {
        getNotas()
    }, [])


    return (
        <>
            <Container>
                <Row className={`align-items-center flex-column ${styles['custom-container']}`}>
                    <Col className="d-flex justify-content-center">
                        <h2 className="font-monospace text-decoration-none">Detalle Notas Finales</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Object.keys(notas).length > 0 ? (
                            <>
                                <Table className={styles["custom-table"]} striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className="font-monospace text-decoration-none">Materia</th>
                                            <th className="font-monospace text-decoration-none" >Nota Final</th>
                                            <th className="font-monospace text-decoration-none">Actualizar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(notas).map(([materiaNombre, nota]) => (
                                            <tr key={materiaNombre}>
                                                <td>{materiaNombre}</td>
                                                <td >{nota}</td>
                                                <td>
                                                    <ButtonIconCustom
                                                        variant="outline-success"
                                                        icon="bi bi-pencil-square"
                                                        tooltip="Actualizar"
                                                        onClick={() => {
                                                            setCurrentMateria(materiaNombre);
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
                                        <Modal.Title className="font-monospace">Actualizar Nota</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group controlId="formNota">
                                                <Form.Label className="font-monospace">Nueva Nota</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Ingrese la nueva nota"
                                                    value={changeNota}
                                                    onChange={(e) => {
                                                        const newValue = parseInt(e.target.value);
                                                        if (!isNaN(newValue) && newValue >= 1 && newValue <= 10) {
                                                            setChangeNota(newValue);
                                                        }
                                                    }}
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
                                            onClick={handleUpdateNota}
                                            nameBtt="Actualizar"
                                            disabled={!changeNota}
                                        />
                                    </Modal.Footer>
                                </Modal>
                            </>
                        ) : (
                            <p className="font-monospace ">No hay notas disponibles.</p>
                        )}
                    </Col>
                </Row>
            </Container>

            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="font-monospace ">Operación exitosa</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-monospace ">
                    {updateSuccess
                        ? "La operación se ha realizado exitosamente."
                        : "No se pudo completar la operación con éxito."}
                </Modal.Body>
                <Modal.Footer>
                    <ButtonCustomRedGreen color="red" onClick={() => setShowSuccessModal(false)} nameBtt="Cerrar" />
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CrudDetail