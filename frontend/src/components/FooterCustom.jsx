import Style from '../styles/footerStyle.module.css'
import Logo from "../assets/logo_recortado.png";


function FooterCustom() {
  return (
    <div className={`d-flex text-center ${Style['footerCustom']}`}>
      <div className={`d-flex align-items-center justify-content-center my-4 ${Style['container-Custom']}`}>
        <img alt="logo footer"
          src={Logo}
          width="85"
          height="75"
          className="d-inline-block align-top " />
        <p className="text-white font-monospace h5">AcademySchool</p>
      </div>
    </div>

  )
}
export default FooterCustom
