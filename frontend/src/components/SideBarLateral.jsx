import { Link } from "react-router-dom";
import styles from '../styles/sidebarStyle.module.css';

function SideBarLateral() {
    return (
        <div className={styles['container-wrapper']}>


            <div className={styles['sidebar-conteiner']}>

                <div className={`d-none d-lg-block text-center ${styles['']}`}>
                    <div className={`p-2 m-3 ${styles['wrapper-link custom-link']}`}>
                        <Link to="/menu/" className={`text-decoration-none ${styles['links-custom']}`}>
                            <span className="text-light text-center font-monospace fs-5 p-2" >
                                Personal
                            </span>
                        </Link>
                    </div>
                    <div className={`p-2 m-3 ${styles['wrapper-link custom-link']}`}>
                        <Link to="/menu/alumnos" className={`text-decoration-none ${styles['links-custom']}`}>
                            <span className="text-light text-center  font-monospace fs-5 p-2" >
                                Alumnos 
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBarLateral;
