import CrudAlumnos from "../../components/CrudALumnos"
import GridLoyout from "../../components/GridLoyout"



function AlumnosScreen({ destroyJwt }) {


    return (
        <>
            <GridLoyout destroyJwt={destroyJwt} props_content ={<CrudAlumnos/>} />
        </>

    )
}

export default AlumnosScreen