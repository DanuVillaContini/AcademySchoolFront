import CrudDetail from "../../components/CrudDetail"
import GridLoyout from "../../components/GridLoyout"


function CursadoScreen({ destroyJwt }) {
    return (
        <>
            <GridLoyout destroyJwt={destroyJwt} props_content={<CrudDetail/>} />
        </>
    )
}

export default CursadoScreen