import logo from '../assets/logo_recortado.png';
import styles from "../styles/loginStyle.module.css";

function ScreenLogin() {
  return (
    <div className={styles["login-container"]}>
      <div className={styles["background-image"]} />
      <div className={styles["login-content"]}>
      <img src={logo} alt="Logo de la página" className={styles["logo"]} />
        <h2>Bienvenido</h2>
        <form>
          <label htmlFor="username">Usuario</label>
          <input type="text" id="username" name="username" maxLength="15" />

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" maxLength="15" />

          <div className={styles["remember-me"]}>
            <input type="checkbox" id="remember" name="remember" />
            <label className={styles["remember-label"]} htmlFor="remember">
              Recordar usuario
            </label>
          </div>
          
          <button type="submit">Iniciar sesión</button>
        </form>
        <p className={styles["register-link"]}>¿Aún no tienes cuenta? Regístrate aquí.</p>
      </div>
    </div>
  );
}

export default ScreenLogin;
