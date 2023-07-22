import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Logo from "../assets/logo_recortado.png";
import "../styles/navbarStyle.css";

function NavBarCustom({ name_user }) {
    return (
        //sticky="top"
        <Navbar  className="justify-content-center wrapper-navbar" expand="lg">
            <Container className="custom-navbar">
                <div className="d-flex align-items-center custom-logo">
                    <img
                        alt=""
                        src={Logo}
                        width="95"
                        height="85"
                        className="d-inline-block align-top "
                    />
                    <Navbar.Brand className="ms-2 ">Academy School</Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="d-lg-flex justify-content-lg-end">
                    <Nav className="ms-md-auto">
                        <NavDropdown
                            menuVariant="dark"
                            className="custom-navdropdown fw-bold font-monospace"
                            title={
                                <>
                                    <i className="bi bi-person-lines-fill m-1 text-dark"></i>
                                    {name_user}
                                </>
                            }
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item className=" text-center fs-5 font-monospace" href="#">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBarCustom;
