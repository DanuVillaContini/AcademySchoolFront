import CrudPersonal from "../../components/CrudPersonal"
import GridLoyout from "../../components/GridLoyout"


function PersonalScreen({ destroyJwt }) {
    return (
        <>
            <GridLoyout destroyJwt={destroyJwt} props_content={<CrudPersonal />} />
        </>
    )
}

export default PersonalScreen