import logo from '../assets/logo.png';
import "../styles/loginStyle.css";

function ScreenLogin() {
  return (
    <div className="login-container">
      <div className="background-image" />
      <div className="login-content">
      <img src={logo} alt="Logo de la página" className="logo" />
        <h2>Bienvenido</h2>
        <form>
          <label htmlFor="username">Usuario</label>
          <input type="text" id="username" name="username" maxLength="15" />

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" maxLength="15" />

          <div className="remember-me">
            <input type="checkbox" id="remember" name="remember" />
            <label className="remember-label" htmlFor="remember">
              Recordar usuario
            </label>
          </div>

          <button type="submit">Iniciar sesión</button>
        </form>
        <p className="register-link">¿Aún no tienes cuenta? Regístrate aquí.</p>
      </div>
    </div>
  );
}

export default ScreenLogin;
