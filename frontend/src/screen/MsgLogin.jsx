import { Link } from "react-router-dom";
import ButtonCustom from "../components/ButtonCustom";
import styles from "../styles/msgLoginStyle.module.css"
import svg from "../assets/undraw_education_f8ru.svg"

function MsgLogin() {
    return (
        <>
            <div className={` ${styles["wrapper"]}`}>
                <h1 className="font-monospace text-center text-light">Datos de institución actualizados.</h1>
                <h4 className="font-monospace text-center text-light">Debes volver a loguearte</h4>
                <img src={svg} alt="screen volver a loguearse" />

                <Link to={'/'}>
                    <ButtonCustom nameBtt="Loguin" />
                </Link>
            </div>
        </>

    )
}


export default MsgLogin