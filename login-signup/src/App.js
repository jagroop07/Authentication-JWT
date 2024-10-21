import Errorrr from "./Component/Errorrr";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Protect from "./Component/Protect";
import Signup from "./Component/Signup";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/500" element={<Errorrr/>}/>
        <Route path="/" element={<Protect><Home/></Protect>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
