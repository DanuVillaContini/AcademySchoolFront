import Style from '../styles/footerStyle.module.css'


function FooterCustom() {
    return (
        <div className={`container-fluid text-center py-4 mt-auto ${Style['footerCustom']}`}>
        <div className="d-flex align-items-center justify-content-center">
            <img src="" alt="" />
          <p className="m-0 h5">AcademySchool</p>
        </div>
      </div>
        
        )
    }
export default FooterCustom
