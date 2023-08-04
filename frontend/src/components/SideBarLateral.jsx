import { Link } from "react-router-dom";
import styles from '../styles/sidebarStyle.module.css';

function SideBarLateral() {
    return (
        <div className={`d-none d-lg-block ${styles['sidebar-conteiner']}`}>
            <div className={`d-flex flex-column align-items-center ${styles['container-links']}`}>
                <div className={`m-1 ${styles['wrapper-link']}`}>
                    <Link to="/menu/" >
                        <button className={`font-monospace text-decoration-none ${styles['links-custom']}`}>Personal</button>
                    </Link>
                </div>
                <div className={`m-1 ${styles['wrapper-link']}`}>
                    <Link to="/menu/alumnos" className={`text-decoration-none ${styles['']}`}>
                        <button className={`font-monospace text-decoration-none ${styles['links-custom']}`}>Alumnos</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SideBarLateral;
