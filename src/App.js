import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Excel2 from "./component/excel2";
// import Login from "./Login";
// import Home from "./pages/Home";
import Myntraforward from "./calculator/Myntraforward";
import Main from "./aspfinder/flipkart/Main";
// import aspfinder from "./pages/aspfinder";
import Mynmain from "./aspfinder/myntra/Mynmain";
import Amzmain from "./aspfinder/amazon/Amzmain";
// import Amzprimemain from "./flipkartnew/Amzprimemain";
// import Amzfbamain from "./flipkartnew/Amzfbamain";
import Loginpage from "./pages/authentication/Loginpage";
import Layout from "./pages/Layout";
import "./css/appp.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route index element={<Layout />} />
          <Route path="/aspfinderflipkart" element={<Main />} />
          <Route path="/aspfindermyntra" element={<Mynmain />} />
          <Route path="/aspfindereasyship" element={<Amzmain />} />
          <Route path="/aspfinderprimeonly" element={<Amzmain />} />
          <Route path="/aspfinderfba" element={<Amzmain />} />
          {/* 
          <Route path="/aspfinder" element={<Excel2 />} />
          
          */}
          <Route path="/aspcalculator" element={<Myntraforward />} />

          <Route path="/login" element={<Loginpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
