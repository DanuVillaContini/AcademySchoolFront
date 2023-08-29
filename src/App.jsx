import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRouter from "./routes/AuthRouter";
import ScreenLogin from "./screen/ScreenLogin";
import MsgLogin from "./screen/MsgLogin"
import PersonalScreen from "./screen/Menu/PersonalScreen";

function App() {
  const [jwt, setJwt] = useState(undefined);
  const changeJwt = (newJwt) => {
    setJwt(newJwt);
  };
  const destroyJwt = () => {
    setJwt(undefined)
    localStorage.clear()
  }
  const firstRender = () => {
    const token = localStorage.getItem("token")
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
          
          <Route
            path="/"
            element={<ScreenLogin changeJwt={changeJwt} />}
          />
          <Route path="/auth/*" element={<AuthRouter jwt={jwt} destroyJwt={destroyJwt} />} />
  <Route path="/mensaje" element={<MsgLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;