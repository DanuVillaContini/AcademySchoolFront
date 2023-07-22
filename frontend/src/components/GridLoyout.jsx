import "../styles/gridLoyout.css"
import NavBarCustom from "./NavBarCustom"

function GridLoyout({ props_sidebar, props_content, props_footer }) {
    const userName = "Timoteo Pascal"
    return (
        <div className="grid-container">
            <div className="navbar">
                <NavBarCustom name_user={userName}/>
            </div>

            <div className="sidebar">
                {props_sidebar}
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
