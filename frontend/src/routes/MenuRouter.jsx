import {  Route, Routes } from "react-router-dom"
import PersonalScreen from "../screen/Menu/PersonalScreen";
import AlumnosScreen from "../screen/Menu/AlumnosScreen";
import CursadoScreen from "../screen/Menu/CursadoScreen";


function MenuRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<PersonalScreen />} />
                <Route path="/alumnos" element={<AlumnosScreen />} />
                <Route path="/detalle-cursado/:id" element={<CursadoScreen />} />
            </Routes>
        </>
    )
}

export default MenuRouter
