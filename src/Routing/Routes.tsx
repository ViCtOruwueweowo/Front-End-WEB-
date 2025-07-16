import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PrivateRoute2fa from "./PrivateRoute2FA";

// Importa tus componentes de páginas
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
        <Route path="/secondfactor" element={<PrivateRoute2fa> <SecondFactor /> </PrivateRoute2fa> } />
        <Route path="/index" element={<PrivateRoute><Index /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/create-directors" element={<PrivateRoute><Directors /></PrivateRoute>} />
        <Route path="/directors" element={<PrivateRoute><Index_Director /></PrivateRoute>} />
        <Route path="/create-establishment" element={<PrivateRoute><Estabishment /></PrivateRoute>} />
        <Route path="/establishment" element={<PrivateRoute><Index_Establishment /></PrivateRoute>} />
        <Route path="/primaria" element={<PrivateRoute><Primaria /></PrivateRoute>} />
        <Route path="/guarderia" element={<PrivateRoute><Guarderia /></PrivateRoute>} />
        <Route path="/kinder" element={<PrivateRoute><Kinder /></PrivateRoute>} />
        <Route path="/secretary" element={<PrivateRoute><Index_Secretary /></PrivateRoute>} />
        <Route path="/create-secretary" element={<PrivateRoute><Secretary /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};
