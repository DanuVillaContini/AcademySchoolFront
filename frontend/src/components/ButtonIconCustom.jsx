import { Button } from "react-bootstrap"
import styles from "../styles/ButtonStyles.module.css"

function ButtonIconCustom({ variant, icon, tooltip, onClick  }) {
    return (
        <div className={styles["custom-tooltip"]}>
            <Button variant={variant} onClick={onClick}>
                <i className={icon}></i>
            </Button>
            <span className={styles["tooltiptext"]}>{tooltip}</span>
        </div>
    )

}
export default ButtonIconCustom


// ------- Para colocarlos:-----
{/* <ButtonIconCustom variant='outline-danger' icon=""  tooltip="" /> */ }