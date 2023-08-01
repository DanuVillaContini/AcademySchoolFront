import { Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import styles from  '../styles/sidebarStyle.module.css';

function SideBarLateral() {
    return (
        <div className={styles['container-wrapper']}>

            
            <div className={styles['sidebar-conteiner']}>
                {/* Utilizamos NavDropdown para el desplegable en pantallas pequeñas */}
                <NavDropdown title="Menú" id="basic-nav-dropdown" className="d-lg-none text-dark fw-bold">
                    <div className={`p-1 ${styles['wrapper-link custom-link']}`}>
                        <Link to="/menu/" className="text-decoration-none">
                            <Nav.Link as="span" className="text-light fw-normal">
                                Personal Institución
                            </Nav.Link>
                        </Link>
                    </div>
                    <hr className="bg-light"/>
                    <div className={`p-1 ${styles['wrapper-link custom-link']}`}>
                        <Link to="/menu/alumnos" className="text-decoration-none">
                            <Nav.Link as="span" className="text-light fw-normal">
                                Alumnos Institución
                            </Nav.Link>
                        </Link>
                    </div>
                </NavDropdown>


                {/* En pantallas grandes, mostramos los links */}
                <div className="d-none d-lg-block">
                    <div className={`p-1 ${styles['wrapper-link custom-link']}`}>
                        <Link to="/menu/" className="text-decoration-none">
                            <Nav.Link as="span" className="text-white">
                                Personal Institución
                            </Nav.Link>
                        </Link>
                    </div>
                    <div className={`p-1 ${styles['wrapper-link custom-link']}`}>
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
