import { Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import "../styles/sidebarStyle.css";

function SideBarLateral() {
    return (
        <div className="container-wrapper">

            <div className="sidebar-conteiner custom-navdrop">
                {/* Utilizamos NavDropdown para el desplegable en pantallas pequeñas */}
                <NavDropdown title="Menú" id="basic-nav-dropdown" className="d-lg-none text-dark fw-bold">
                    <div className="wrapper-link custom-link p-1">
                        <Link to="/menu/" className="text-decoration-none">
                            <Nav.Link as="span" className="text-light fw-normal">
                                Personal Institución
                            </Nav.Link>
                        </Link>
                    </div>
                    <hr className="bg-light"/>
                    <div className="wrapper-link custom-link p-1">
                        <Link to="/menu/alumnos" className="text-decoration-none">
                            <Nav.Link as="span" className="text-light fw-normal">
                                Alumnos Institución
                            </Nav.Link>
                        </Link>
                    </div>
                </NavDropdown>


                {/* En pantallas grandes, mostramos los links */}
                <div className="d-none d-lg-block">
                    <div className="wrapper-link custom-link p-1">
                        <Link to="/menu/" className="text-decoration-none">
                            <Nav.Link as="span" className="text-white">
                                Personal Institución
                            </Nav.Link>
                        </Link>
                    </div>
                    <div className="wrapper-link custom-link p-1">
                        <Link to="/menu/alumnos" className="text-decoration-none">
                            <Nav.Link as="span" className="text-white">
                                Alumnos Institución
                            </Nav.Link>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBarLateral;
