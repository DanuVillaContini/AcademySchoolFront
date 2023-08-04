import Style from '../styles/footerStyle.module.css'
import Logo from "../assets/logo_recortado.png";


function FooterCustom() {
  return (
    <div className={`container-fluid text-center py-4 mt-auto ${Style['footerCustom']}`}>
      <div className="d-flex align-items-center justify-content-center">
        <img alt="logo footer"
          src={Logo}
          width="85"
          height="75"
          className="d-inline-block align-top "/>
          <p className="text-white font-monospace m-0 h5">AcademySchool</p>
    </div>
      </div >
        
        )
}
export default FooterCustom
