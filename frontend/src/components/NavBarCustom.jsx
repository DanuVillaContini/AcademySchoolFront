import { Navbar, Container, Col, Nav, NavDropdown } from "react-bootstrap"
import Logo from "../assets/logo_recortado.png"
import "../styles/navbarStyle.css"

function NavBarCustom({ name_user }) {
    return (
        <Navbar className="bg-body-tertiary custom-navbar">
            <Container>
                <Col xs={2} sm={2} md={2} lg={2}>
                    <img
                        alt=""
                        src={Logo}
                        width="95"
                        height="85"
                        className="d-inline-block align-top"
                    />
                </Col>
                <Col>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar.Brand href="#">Academy School</Navbar.Brand>
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="basic-nav-dropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-person mr-2"></i> {/* Icono de usuario */}
                                    Hello, {name_user}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="basic-nav-dropdown">
                                    <li>
                                        <a className="dropdown-item" href="#action/3.1">
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        {/* <Nav className="me-auto">
                            <NavDropdown nameUser={name_user} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav> */}
                    </Navbar.Collapse>
                </Col>
            </Container>
        </Navbar>




    )
}

export default NavBarCustom
