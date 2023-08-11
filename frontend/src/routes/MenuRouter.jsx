import {  Route, Routes } from "react-router-dom"
import PersonalScreen from "../screen/Menu/PersonalScreen";
import AlumnosScreen from "../screen/Menu/AlumnosScreen";
import CursadoScreen from "../screen/Menu/CursadoScreen";
import CuotasScreen from "../screen/Menu/CuotasScreen"


function MenuRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<PersonalScreen />} />
                <Route path="/alumnos" element={<AlumnosScreen />} />
                <Route path="/detalle-cursado/:id" element={<CursadoScreen />} />
                <Route path="/cuotas/:id" element={<CuotasScreen />} />

            </Routes>
        </>
    )
}

export default MenuRouter