import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo_recortado.png';
import { API_URI } from '../common/constants';
import ButtonCustom from '../components/ButtonCustom';
import styles from "../styles/loginStyle.module.css";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import { Modal } from 'react-bootstrap';

function ScreenLogin({ changeJwt }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIncorrectModal, setShowPasswordIncorrectModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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

    try {
      const response = await fetch(API_URI + "/auth/login", requestOptions);
      const result = await response.json();
      if (response.status === 200) {
        const decodedToken = jwtDecode(result.access_token);
        changeJwt(decodedToken);
        localStorage.setItem("token", JSON.stringify(decodedToken));
        localStorage.setItem("access_token", result.access_token);
        navigate('/auth');
      } else {
        setShowPasswordIncorrectModal(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  const handlePasswordIncorrectModalClose = () => {
    setShowPasswordIncorrectModal(false);
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
            type={showPassword ? "text" : "password"} 
            name="password"
            maxLength={15}
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles["remember-me"]}>
            <input
              type="checkbox"
              id="remember"
              name="remember"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className={styles["remember-label"]} htmlFor="remember">
              Mostrar contraseña
            </label>
          </div>
          <ButtonCustom onClick={handleLogin} nameBtt="Iniciar Sesión" />
        </form>
      </div>

      <Modal show={showPasswordIncorrectModal} onHide={handlePasswordIncorrectModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aviso</Modal.Title>
        </Modal.Header>
        <Modal.Body>Contraseña incorrecta o Usuario inexistente. Por favor, inténtelo nuevamente.</Modal.Body>
        <Modal.Footer>
          <ButtonCustom onClick={handlePasswordIncorrectModalClose} nameBtt="Ok" />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

ScreenLogin.propTypes = {
  changeJwt: PropTypes.func.isRequired
}

export default ScreenLogin;
