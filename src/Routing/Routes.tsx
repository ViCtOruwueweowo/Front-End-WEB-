import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/Pages/Login/Login";
import SecondFactor from "../Components/Pages/SecondFactor/SecondFactor";
import Index from "../Components/Pages/Index/Index";
import Directors from "../Components/Pages/Owner/Directors/Directors";
import Index_Director from "../Components/Pages/Owner/Directors/Index_Directors";
import Index_Establishment from "../Components/Pages/Owner/Estabishment/Index_Establishment";
import Profile from "../Components/Pages/Profile/Profile";
import Index_Secretary from "../Components/Pages/Director/Secretary/Index_Secretary";
import Secretary from "../Components/Pages/Director/Secretary/Secretary";
import Estabishment from "../Components/Pages/Owner/Estabishment/Establishment";
import Kinder from "../Components/Pages/Owner/Estabishment/Others/Guarderia";
import Guarderia from "../Components/Pages/Owner/Estabishment/Others/Guarderia";
import Primaria from "../Components/Pages/Owner/Estabishment/Others/Primaria";
export const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/secondfactor" element={<SecondFactor />} />
        <Route path="/index" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        /Rutas Del Dueño
        <Route path="/create-directors" element={<Directors />} />
        <Route path="/directors" element={<Index_Director />} />
        <Route path="/create-establishment" element={<Estabishment />} />
        <Route path="/establishment" element={<Index_Establishment />} />
        <Route path="/primaria" element={<Primaria />} />
        <Route path="/guarderia" element={<Guarderia />} />
        <Route path="/kinder" element={<Kinder/>} />
        //Rutas Del Director
        <Route path="/secretary" element={<Index_Secretary />} />
        <Route path="/create-secretary" element={<Secretary />} />

      </Routes>
    </BrowserRouter>
  );
};
