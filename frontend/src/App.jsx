import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRouter from "./routes/AuthRouter";
import ScreenLogin from "./screen/ScreenLogin";

function App() {
  const [jwt, setJwt] = useState(undefined);

  // Función para cambiar el token JWT en el estado
  const changeJwt = (newJwt) => {
    setJwt(newJwt);
  };

  const destroyJwt = () => {
    setJwt(undefined)
    localStorage.clear()
  }

  // cuando yo recargo la pagina tengo que buscar el inicio de sesion anterior para no siempre iniciar con login
  const firstRender = () => {
    const token = localStorage.getItem("token")
    // Si no existe ningun token
    if (token === undefined) return undefined

    const parsedToken = JSON.parse(token)
    setJwt(parsedToken)
  }

  useEffect(() => {
    firstRender()
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Pasar la función changeJwt al componente ScreenLogin */}
          <Route
            path="/"
            element={<ScreenLogin changeJwt={changeJwt} />}
          />
          <Route path="/auth/*" element={<AuthRouter jwt={jwt} destroyJwt={destroyJwt} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;