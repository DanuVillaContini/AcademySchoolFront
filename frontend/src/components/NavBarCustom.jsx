import { useState } from "react";
import { Accordion, Button, Container, Modal, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo_recortado.png";
import styles from "../styles/navbarStyle.module.css";
import ButtonCustomRedGreen from "./ButtonCustomRedGreen";

function NavBarCustom({ destroyJwt }) {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false); //para controlar que no se abra el acordeon al recargar la page
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const navigate = useNavigate();

    //para controlar que no se abra el acordeon al recargar la page
    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    // const handleCloseSession = () => {
    //     destroyJwt();
    //     navigate("/");
    // };

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
        <Navbar
            sticky="top"
            className={`justify-content-center ${styles["wrapper-navbar"]}`}
            expand="md"
        >
            <Container className={styles["custom-navbar"]}>
                <div className={`d-flex align-items-center ${styles["custom-logo"]}`}>
                    <img
                        alt="logo menu navbar"
                        src={Logo}
                        width="95"
                        height="85"
                        className="d-inline-block align-top "
                    />
                    <Navbar.Brand className="ms-2 text-light ">
                        ACADEMY SCHOOL
                    </Navbar.Brand>
                </div>
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="d-lg-flex justify-content-lg-end"
                >
                    <Nav className="ms-md-auto ">
                        <Accordion defaultActiveKey={isAccordionOpen ? "0" : null}>
                            <Accordion.Item
                                eventKey="0"
                                className={styles["custom-accordion"]}
                            >
                                <Accordion.Header
                                    onClick={toggleAccordion}
                                    className={styles["custom-header-accordion"]}
                                >
                                    <i className="bi bi-person-lines-fill m-2 text-dark">
                                        Opciones
                                    </i>
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
                    </Nav>
                </Navbar.Collapse>
            </Container>
            {/* Modal de confirmación para el logout */}
            <Modal show={showLogoutConfirmation} onHide={handleLogoutCancelled}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Seguro que desea cerrar sesión?</Modal.Body>
                <Modal.Footer>
                    <ButtonCustomRedGreen color="green" onClick={handleLogoutCancelled} nameBtt="No" />
                    <ButtonCustomRedGreen color="red" onClick={handleLogoutConfirmed} nameBtt="Si" />
                </Modal.Footer>
            </Modal>
        </Navbar>
    );
}

export default NavBarCustom;