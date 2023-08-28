import { useState } from "react";
import { Accordion, Container, Modal, Col, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo_recortado.png";
import styles from "../styles/navbarStyle.module.css";
import ButtonCustomRedGreen from "./ButtonCustomRedGreen";

function NavBarCustom({ destroyJwt }) {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false); //para controlar que no se abra el acordeon al recargar la page
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const navigate = useNavigate();

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };
    const handleLogoutConfirmation = () => {
        setShowLogoutConfirmation(true);
    };
    const handleLogoutConfirmed = () => {
        destroyJwt();
        navigate("/");
        setShowLogoutConfirmation(false);
    };
    const handleLogoutCancelled = () => {
        setShowLogoutConfirmation(false);
    };

    return (
        <Navbar sticky="top" className={`justify-content-center ${styles["wrapper-navbar"]}`} expand="md">
            <Container className={`m-1 ${styles["custom-wrapper-navbar"]}`}>
                <Col sm={6} className={`d-flex align-items-center ${styles["custom-logo"]}`}>
                    <img
                        alt="logo menu navbar"
                        src={Logo}
                        width="95"
                        height="85"
                        className="d-none d-sm-block d-md-block d-lg-block d-xl-block align-top "
                    />
                    <Navbar.Brand className="ms-2 text-light d-none d-md-block d-lg-block d-xl-block">
                        ACADEMY SCHOOL
                    </Navbar.Brand>
                </Col>
                <Col sm={6} className={`d-flex justify-content-end ${styles[""]}`}>
                    <Accordion defaultActiveKey={isAccordionOpen ? "0" : null}>
                        <Accordion.Item
                            eventKey="0"
                            className={styles["custom-accordion"]}
                        >
                            <Accordion.Header onClick={toggleAccordion} className={styles["custom-header-accordion"]}>
                                <i className="bi bi-person-lines-fill text-dark"></i>
                                <span >Opciones</span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Link
                                    to="/auth/"
                                    className={` text-decoration-none d-lg-none ${styles["custom-nav-link"]}`}
                                >
                                    <span className="text-light text-center fs-5 font-monospace">
                                        Personal
                                    </span>
                                </Link>
                                <Link
                                    to="/auth/alumnos"
                                    className={` text-decoration-none d-lg-none ${styles["custom-nav-link"]}`}
                                >
                                    <span className="text-light text-center fs-5 font-monospace">
                                        Alumnos
                                    </span>
                                </Link>
                                <ButtonCustomRedGreen
                                    color="red"
                                    onClick={handleLogoutConfirmation}
                                    nameBtt="Logout"
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Container>

            <Modal show={showLogoutConfirmation} onHide={handleLogoutCancelled}>
                <Modal.Header closeButton>
                    <Modal.Title className="font-monospace">Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body className="font-monospace">¿Seguro que desea cerrar sesión?</Modal.Body>
                <Modal.Footer>
                    <ButtonCustomRedGreen color="green" onClick={handleLogoutCancelled} nameBtt="No" />
                    <ButtonCustomRedGreen color="red" onClick={handleLogoutConfirmed} nameBtt="Si" />
                </Modal.Footer>
            </Modal>
        </Navbar>
    );
}

export default NavBarCustom;