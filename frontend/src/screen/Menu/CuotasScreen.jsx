import CrudCuotas from "../../components/CrudCuotas"
import GridLoyout from "../../components/GridLoyout"


function CuotasScreen() {
    return (
        <>
            <GridLoyout props_content={<CrudCuotas />} />

        </>
    )
}

export default CuotasScreen
