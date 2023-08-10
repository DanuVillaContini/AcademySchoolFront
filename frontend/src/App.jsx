import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuRouter from "./routes/MenuRouter";
import ScreenLogin from "./screen/ScreenLogin";
import InstitutionForm from "./screen/InstitutionForm";
import { useState } from "react";

function App() {
  const [jwt, setJwt] = useState("");

  // Función para cambiar el token JWT en el estado
  const changeJwt = (newJwt) => {
    setJwt(newJwt);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Pasar la función changeJwt al componente ScreenLogin */}
          <Route
            path="/"
            element={<ScreenLogin changeJwt={changeJwt} />}
          />
          <Route path="/menu/*" element={<MenuRouter />} />
          <Route path="/Institucion" element={<InstitutionForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
