import "../styles/gridLoyout.css"
// import NavBarCustom from "./NavBarCustom"
// import SideBarLateral from "./SideBarLateral"

function GridLoyout({  props_content, props_footer }) {

    // const userName = "Nombre User"

    return (
        <div className="grid-container">
            <div className="navbar">
                {/* <NavBarCustom name_user={userName} /> */}
            </div>

            <div className="sidebar">
                {/* <SideBarLateral/> */}
            </div>

            <div className="content">
                {props_content}
            </div>

            <div className="footer">
                {props_footer}
            </div>
        </div>
    )
}

export default GridLoyout
