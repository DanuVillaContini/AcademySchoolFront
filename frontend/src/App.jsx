import { BrowserRouter, Route, Routes } from "react-router-dom"
import MenuRouter from "./routes/MenuRouter";
import ScreenLogin from "./screen/ScreenLogin";
import InstitutionForm from "./screen/InstitutionForm"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScreenLogin/>}/>
          <Route path="/menu/*" element={<MenuRouter/>} />
          <Route path="/Institucion" element={<InstitutionForm/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
