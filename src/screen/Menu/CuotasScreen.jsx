import CrudCuotas from "../../components/CrudCuotas"
import GridLoyout from "../../components/GridLoyout"


function CuotasScreen({ destroyJwt }) {
    return (
        <>
            <GridLoyout destroyJwt={destroyJwt} props_content={<CrudCuotas />} />

        </>
    )
}

export default CuotasScreen