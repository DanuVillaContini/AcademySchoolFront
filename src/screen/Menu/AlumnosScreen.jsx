//import CrudAlumnos from "../../components/CrudALumnos"
import GridLoyout from "../../components/GridLoyout"
import CrudALumnos from "../../components/CrudALumnos"



function AlumnosScreen({ destroyJwt }) {


    return (
        <>
            <GridLoyout destroyJwt={destroyJwt} props_content ={<CrudALumnos/>} />
        </>

    )
}

export default AlumnosScreen