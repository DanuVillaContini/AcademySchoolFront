import { BrowserRouter, Route, Routes } from "react-router-dom"
import MenuRouter from "./routes/MenuRouter";
import ScreenLogin from "./screen/ScreenLogin";
import InstitutionForm from "./screen/InstitutionForm"
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function App() {
  const [jwt, setJwt] = useState(localStorage.getItem("token") || "");
  const [isAdmin, setIsAdmin] = useState(false);

  const verifyEmployee = () => {
    try {
      const decodedToken = jwtDecode(jwt);
      setIsAdmin(decodedToken.isAdmin);
      console.log("Se inició sesión", decodedToken.username);
    } catch (error) {
      console.error("Error al decodificar el JWT:", error);
    }
  };

  const changeJwt = (value) => {
    setJwt(value);
    localStorage.setItem("token", value)
  };

  useEffect(() => {
    verifyEmployee();

  }, [jwt]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScreenLogin authenticated={!!jwt} isAdmin={isAdmin} changeJwt={changeJwt} />} />
          <Route path="/menu/*" element={<MenuRouter />} />
          <Route path="/Institucion" element={<InstitutionForm />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
