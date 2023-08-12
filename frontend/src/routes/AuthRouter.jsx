import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import InstitutionForm from "../screen/InstitutionForm";
import AlumnosScreen from "../screen/Menu/AlumnosScreen";
import CursadoScreen from "../screen/Menu/CursadoScreen";
import PersonalScreen from "../screen/Menu/PersonalScreen";
import CuotasScreen from "../screen/Menu/CuotasScreen"
function AuthRouter({ jwt = undefined, destroyJwt = () => undefined }) {
    return (
        <>
            <Routes>
                {
                    // si no inicia sesion muestro mensaje
                    !jwt
                        ? <Route path="/*" element={<h1>No inicio sesion aun, nos vemos en disney</h1>} />
                        : jwt?.datosActualizados === false // si no actualizo los datos de institcion forzamos el ingreso a esa pantalla
                        ? <Route path="/*" element={<InstitutionForm />} />
                        : (
                            <>
                                {/* Ya tiene acceso a la aplicacion de manera libre */}
                                <Route path="/" element={<PersonalScreen destroyJwt={destroyJwt} />} />
                                <Route path="/alumnos" element={<AlumnosScreen destroyJwt={destroyJwt} />} />
                                <Route path="/detalle-cursado/:id" element={<CursadoScreen destroyJwt={destroyJwt} />} />
                                <Route path="/cuotas/:id" element={<CuotasScreen destroyJwt={destroyJwt} />} />
                                <Route path="/institucion" element={<InstitutionForm  />} />
                            </>
                        )
                }
            </Routes>
        </>
    )
}

AuthRouter.propTypes = {
    jwt: PropTypes.object,
    destroyJwt: PropTypes.func
}

export default AuthRouter