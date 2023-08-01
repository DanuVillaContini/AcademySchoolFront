import { Button } from "react-bootstrap"
import "../styles/ButtonStyles.css"

function ButtonIconCustom({icon, tooltip}) {
    return (
        <Button className="custom-btt custom-tooltip">
        <i className="{icon}"></i>
        <span className="tooltiptext">{tooltip}</span>

        
        </Button>

    )
    
}
export default ButtonIconCustom
