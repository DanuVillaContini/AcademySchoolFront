import CrudPersonal from "../../components/CrudPersonal"
import GridLoyout from "../../components/GridLoyout"


function PersonalScreen() {
    return (
        <>
            <GridLoyout props_content={<CrudPersonal />} />
        </>
    )
}

export default PersonalScreen
