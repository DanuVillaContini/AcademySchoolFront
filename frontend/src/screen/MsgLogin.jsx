import { Link } from "react-router-dom";
import ButtonCustom from "../components/ButtonCustom";

export default function MsgLogin() {
    return (
        <div>
            <h1>datos de institucion actualizados. Logueate de nuevo Perri :)</h1>
            <Link to={'/'}>
                <ButtonCustom nameBtt="Ir a Login" />
            </Link>
        </div>
    )
}
