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
  // ... (resto de tu código)

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <ButtonCustom onClick={() => setShowCreateForm(prevState => !prevState)} nameBtt={showCreateForm ? "Cancelar" : "Nuevo Estudiante"} />
          <Form className={` ${Styles["categories__create-form"]}`} style={{ display: showCreateForm ? "block" : "none" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="font-monospace text-decoration-none">Nombre</Form.Label>
                            <Form.Control type="text"
                                placeholder="Nombre"
                                value={NombreAlumno}
                                onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                    setNombreAlumno(onlyLettersAndSpaces);
                                }}
                                maxLength={25}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="font-monospace text-decoration-none">Apellido</Form.Label>
                            <Form.Control type="text"
                                placeholder="Apellido"
                                value={ApellidoAlumno}
                                onChange={(e) => {
                                    const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                    setApellidoAlumno(onlyLettersAndSpaces);
                                }}
                                maxLength={25}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
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
                                minLength={7} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
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
        </Col>
      </Row>
      <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="font-monospace text-decoration-none">Nombre</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Nombre"
                                    required
                                    maxLength={25}
                                    value={updateNombre}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                        setupdateNombre(onlyLettersAndSpaces);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className="font-monospace text-decoration-none">Apellido</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Apellido"
                                    required
                                    maxLength={25}
                                    value={updateApellido}
                                    onChange={(e) => {
                                        const onlyLettersAndSpaces = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                        setupdateApellido(onlyLettersAndSpaces);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
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
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
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
                                        setupdateId("")
                                        setupdateNombre("")
                                        setupdateDni("")
                                        setupdateAnio("")
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
      {/* Modales */}
      {/* ... Código de modales aquí ... */}
    </Container>
  );
}

export default CrudALumnos;
