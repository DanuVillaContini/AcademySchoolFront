import { useState } from 'react';
import logo from '../assets/logo_recortado.png';
import ButtonCustom from '../components/ButtonCustom';
import styles from "../styles/loginStyle.module.css";
import { API_URI } from '../common/constants';

function ScreenLogin() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      correo: correo,
      pass: password
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URI + "/auth/login", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  return (
    <div className={styles["login-container"]}>
      <div className={styles["background-image"]} />
      <div className={styles["login-content"]}>
        <img src={logo} alt="Logo de la página" className={styles["logo"]} />
        <h2>Bienvenido</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="username">Correo</label>
          <input
            type="text"
            id="correo"
            name="correo"
            maxLength="30"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}

          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            maxLength="30"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />

          <div className={styles["remember-me"]}>
            <input
              type="checkbox"
              id="remember"
              name="remember"
            />

            <label className={styles["remember-label"]} htmlFor="remember">
              Recordar usuario
            </label>
          </div>
          {/* falta props onClick={handle..} */}
          <ButtonCustom onClick={handleLogin} nameBtt="Iniciar Sesion" />
        </form>
        <p className={styles["register-link"]}>¿Aún no tienes cuenta? Regístrate aquí.</p>
      </div>
    </div>
  );
}

export default ScreenLogin;
