import "../styles/gridLoyout.css"
import NavBarCustom from "./NavBarCustom"
import SideBarLateral from "./SideBarLateral"
import FooterCustom from "./FooterCustom"


function GridLoyout({  props_content }) {

    const userName = "Nombre User"

    return (
        <div className="grid-container">
            <div className="navbar">
                <NavBarCustom name_user={userName} />
            </div>

            <div className="sidebar">
                <SideBarLateral/>
            </div>

            <div className="content">
                {props_content}
            </div>

            <div className="footer">
                <FooterCustom/>
            </div>
        </div>
    )
}

export default GridLoyout
