import { useState } from "react";
import { Navbar, Container, Nav, Accordion } from "react-bootstrap";
import Logo from "../assets/logo_recortado.png";
import styles from "../styles/navbarStyle.module.css";
import { Link } from "react-router-dom";

function NavBarCustom({ name_user }) {

    const [isAccordionOpen, setIsAccordionOpen] = useState(false); //para controlar que no se abra el acordeon al recargar la page





    //para controlar que no se abra el acordeon al recargar la page
    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
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
                                    <Link to="/menu/" className={` text-decoration-none d-lg-none ${styles["custom-nav-link"]}`}>
                                        <span className="text-light text-center fs-5 font-monospace" >
                                            Personal
                                        </span>
                                    </Link>
                                    <Link to="/menu/alumnos" className={` text-decoration-none d-lg-none ${styles["custom-nav-link"]}`}>
                                        <span className="text-light text-center fs-5 font-monospace" >
                                            Alumnos
                                        </span>
                                    </Link>
                                    <Link to="#" className={` text-decoration-none ${styles["custom-nav-link"]}`}>
                                        <span className="text-light text-center fs-5 font-monospace" >
                                            Logout
                                        </span>
                                    </Link>
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