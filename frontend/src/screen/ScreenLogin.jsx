import ButtonCustom from "../components/ButtonCustom"
import ButtonIconCustom from "../components/ButtonIconCustom"
import "../styles/loginStyle.css"

function ScreenLogin() {
    return (
        <div>
        <h1>Login</h1>
     
        <ButtonCustom nombre="Cancelar" />
        <ButtonCustom nombre="Login" />
        <ButtonIconCustom icon="bi bi-trash" tooltip={"Delete"} />
        <ButtonIconCustom icon="bi bi-telephone-fill" tooltip={"Telefono"} />
        <ButtonIconCustom icon="bi bi-person-add" tooltip={"Agregar"} />
        <ButtonIconCustom icon="bi bi-mortarboard-fill" tooltip={"Alumno"} />




        

        </div>
        
    )
}

export default ScreenLogin
