import { BrowserRouter, Route, Routes } from "react-router-dom"
import MenuRouter from "./routes/MenuRouter";
import ScreenLogin from "./screen/ScreenLogin";
import InstitutionForm from './InstitutionForm';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScreenLogin/>}/>
          <Route path="/menu/*" element={<MenuRouter/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
