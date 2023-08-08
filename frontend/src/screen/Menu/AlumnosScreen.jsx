import CrudAlumnos from "../../components/CrudALumnos"
import GridLoyout from "../../components/GridLoyout"



function AlumnosScreen() {


    return (
        <>
            <GridLoyout props_content ={<CrudAlumnos/>} />
        </>

    )
}

export default AlumnosScreen
