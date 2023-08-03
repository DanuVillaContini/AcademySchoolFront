
import { Button } from "react-bootstrap"
import styles from "../styles/ButtonStyles.module.css"



function ButtonCustom({ onClick , nameBtt}) {
    return (
        <div >
            <Button className={`m-1 ${styles['custom-btt']}`} onClick={onClick}>{nameBtt}</Button>
        </div>
    )
}

export default ButtonCustom

// ------- Para colocarlos:-----
// <ButtonCustom onClick={handle..} nameBtt="" /> */ }
