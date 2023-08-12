import { useState } from "react";
import { Accordion, Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo_recortado.png";
import styles from "../styles/navbarStyle.module.css";

function NavBarCustom({ name_user, destroyJwt }) {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false); //para controlar que no se abra el acordeon al recargar la page
    const navigate = useNavigate()

    //para controlar que no se abra el acordeon al recargar la page
    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const handleCloseSession = () => {
        destroyJwt()
        navigate("/")
    }

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
                    <Navbar.Brand className="ms-2 text-light ">ACADEMY SCHOOL</Navbar.Brand>
                </div>
                <Navbar.Collapse id="basic-navbar-nav" className="d-lg-flex justify-content-lg-end">
                    <Nav className="ms-md-auto " >
                        <Accordion defaultActiveKey={isAccordionOpen ? "0" : null} >
                            <Accordion.Item eventKey="0" className={styles["custom-accordion"]}>

                                <Accordion.Header onClick={toggleAccordion} className={styles["custom-header-accordion"]}>
                                    <i className="bi bi-person-lines-fill m-2 text-dark"></i>
                                    {name_user}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Link to="/auth/" className={` text-decoration-none d-lg-none ${styles["custom-nav-link"]}`}>
                                        <span className="text-light text-center fs-5 font-monospace" >
                                            Personal
                                        </span>
                                    </Link>
                                    <Link to="/auth/alumnos" className={` text-decoration-none d-lg-none ${styles["custom-nav-link"]}`}>
                                        <span className="text-light text-center fs-5 font-monospace" >
                                            Alumnos
                                        </span>
                                    </Link>
                                    <Button onClick={handleCloseSession} className={` text-decoration-none ${styles["custom-nav-link"]}`}>
                                        <span className="text-light text-center fs-5 font-monospace" >
                                            Logout
                                        </span>
                                    </Button>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBarCustom;