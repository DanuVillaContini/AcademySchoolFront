import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/ButtonStyles.module.css";

function ButtonIconCustom({ to, variant, icon, tooltip, onClick }) {
    const buttonContent = (
        <div className={styles["custom-tooltip"]}>
            <Button variant={variant} onClick={onClick}>
                <i className={icon}></i>
            </Button>
            <span className={styles["tooltiptext"]}>{tooltip}</span>
        </div>
    );

    if (to) {
        return <Link to={to}>{buttonContent}</Link>;
    } else {
        return buttonContent;
    }
}

export default ButtonIconCustom;


// ------- Para colocarlos:-----
// <ButtonIconCustom variant='outline-danger' icon=""  tooltip="" /> 