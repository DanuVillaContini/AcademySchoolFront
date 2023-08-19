import { useEffect, useState } from "react";
import { Col, Container, Row, Table, Modal } from "react-bootstrap";
import Styles from "../styles/StyleAlum.module.css";
import ButtonIconCustom from "./ButtonIconCustom";
import ButtonCustom from "./ButtonCustom";
import { API_URI } from '../common/constants';
import Form from 'react-bootstrap/Form';
import ButtonCustomRedGreen from "./ButtonCustomRedGreen";
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
            if (response.status >= 400) return alert("No se pudieron obtener los alumnos")
            const result = await response.json()
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
    <Container>
      <Row>
        <Col xs={12}>
          <ButtonCustom onClick={() => setShowCreateForm(prevState => !prevState)} nameBtt={showCreateForm ? "Cancelar" : "Nuevo Estudiante"} />
          <Form className={` ${Styles["categories__create-form"]}`} style={{ display: showCreateForm ? "block" : "none" }}>
            {/* ... Contenido del formulario de creación aquí ... */}
          </Form>
        </Col>
      </Row>
      {/* Formulario de actualización */}
      {updateId.length > 0 && showUpdateForm && (
        <Row>
          <Col xs={12}>
            {/* ... Contenido del formulario de actualización aquí ... */}
          </Col>
        </Row>
      )}
      {/* Tabla */}
      <Row>
        <Col xs={12}>
          {/* ... Contenido de la tabla aquí ... */}
        </Col>
      </Row>
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
    </Container>
  );
}

export default CrudALumnos;
