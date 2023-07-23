import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap";
import "../styles/sidebarStyle.css";
// import { useState } from "react";

function SideBarLateral() {


    return (
        <div className="container-wrapper">
            <div className="sidebar-conteiner">
                <div className="wrapper-link custom-link ">
                    <Link to="/menu/" className="text-decoration-none ">
                        <Nav.Link as="span" className="text-white ">
                            Personal Institución
                        </Nav.Link>
                    </Link>
                </div>
                <div className="wrapper-link custom-link">
                    <Link to="/menu/alumnos" className="text-decoration-none">
                        <Nav.Link as="span" className="text-white">
                            Alumnos Institución
                        </Nav.Link>
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default SideBarLateral