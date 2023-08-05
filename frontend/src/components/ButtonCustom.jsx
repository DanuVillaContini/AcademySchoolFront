
import { Button } from "react-bootstrap"
import styles from "../styles/ButtonStyles.module.css"
import { Link } from "react-router-dom";



function ButtonCustom({ to, onClick, nameBtt }) {
    if (to) {
        return (
            <div>
                <Link to={to} className={`m-1 font-monospace ${styles["custom-btt"]}`}>
                    {nameBtt}
                </Link>
            </div>
        );
    } else {
        return (
            <div>
                <Button className={`m-1 font-monospace ${styles["custom-btt"]}`} onClick={onClick}>
                    {nameBtt}
                </Button>
            </div>
        );
    }
}

export default ButtonCustom;


// ------- Para colocarlos:-----
// <ButtonCustom to="/ruta" onClick={handle..} nameBtt="" /> */ }
