import styles from "../styles/gridLoyout.module.css"
import NavBarCustom from "./NavBarCustom"
import SideBarLateral from "./SideBarLateral"
import FooterCustom from "./FooterCustom"


function GridLoyout({  props_content }) {

    const userName = "Nombre User"

    return (
        <div className={styles["grid-container"]}>
            <div className={styles["navbar-grid"]}>
                <NavBarCustom name_user={userName} />
            </div>

            <div className={styles["sidebar-grid"]}>
                <SideBarLateral/>
            </div>

            <div className={styles["content-grid"]}>
                {props_content}
            </div>

            <div className={styles["footer-grid"]}>
                <FooterCustom/>
            </div>
        </div>
    )
}

export default GridLoyout
