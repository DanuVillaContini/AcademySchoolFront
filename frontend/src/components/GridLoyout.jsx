import "../styles/gridLoyout.css"

function GridLoyout({ props_navbar, props_sidebar, props_content, props_footer }) {
    return (
        <div className="grid-container">
            <div className="navbar">
                {props_navbar}
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
