//import CrudAlumnos from "../../components/CrudALumnos"
import GridLoyout from "../../components/GridLoyout"
import CrudResponsive from "../../components/CrudResponsive"



function AlumnosScreen({ destroyJwt }) {


    return (
        <>
            <GridLoyout destroyJwt={destroyJwt} props_content ={<CrudResponsive/>} />
        </>

    )
}

export default AlumnosScreen