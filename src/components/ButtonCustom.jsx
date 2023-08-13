import { Button } from "react-bootstrap";
import styles from "./../styles/buttonStyles.module.css";
import { Link } from "react-router-dom";

function ButtonCustom({ to, onClick, nameBtt, disabled }) {
    if (to) {
        return (
            <div>
                <Link to={to} className={`m-1 font-monospace ${styles["custom-btt"]}`} disabled={disabled}>
                    {nameBtt}
                </Link>
            </div>
        );
    } else {
        return (
            <div>
                <Button className={`m-1 font-monospace ${styles["custom-btt"]}`} onClick={onClick} disabled={disabled}>
                    {nameBtt}
                </Button>
                {disabled && <p style={{ color: 'red' }}>Complete todos los campos.</p>}
            </div>
        );
    }
}

export default ButtonCustom;
