// src/Components/Pages/Profile/Profile.tsx
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../Api/Logout";
import Layout from "../../Layout/Layout/Layout";
import style from "./Profile.module.css";

function Profile() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      alert("Error al cerrar sesión");
    }
  };

  return (
    <Layout>
      <div style={{  position: "relative", backgroundColor: "#0857a1", width: "100%", height: "90px", 
      overflow: "visible",paddingLeft: "20px",}} className="text-white d-flex align-items-center m-0">
        <img className={`${style.imagen}`} src="./icono.jpg" alt="" />
      </div>

      <div className={`${style.userName}`} style={{ marginLeft: "10px", marginTop: "60px", color: "#000" }}>
        Andrea Margarita Guibel Escobar
      </div>

      <br />

      <div className={`${style.contenedorUser}`}>
       
        <h4 className={`${style.principal}`}>Mi Información</h4>

        <div className="container">

          <ul className="list-group list-group-horizontal">
            <li className={`${style.listgroup} list-group-item ${style.temas}`}>
              Nombre
            </li>
            <li className={`${style.listgroup} ${style.temas2} list-group-item`}>
              Andrea Margarita
            </li>
          </ul>

          <ul className="list-group list-group-horizontal-sm">
            <li className={`${style.listgroup} list-group-item ${style.temas}`}>
              Apellido
            </li>
            <li className={`${style.listgroup} ${style.temas2} list-group-item`}>
              Guibel Escobar
            </li>
          </ul>

          <ul className="list-group list-group-horizontal-sm">
            <li className={`${style.listgroup} list-group-item ${style.temas}`}>
              Teléfono
            </li>
            <li className={`${style.listgroup} ${style.temas2} list-group-item`}>
              8715148016
            </li>
          </ul>

          <ul className="list-group list-group-horizontal-sm">
            <li className={`${style.listgroup} list-group-item ${style.temas}`}>
              Email
            </li>
            <li className={`${style.listgroup} ${style.temas2} list-group-item`}>
              safekids@gmail.com
            </li>
          </ul>

          <div className="row">
            <div className="col-6 d-grid">
              <button className={`${style.btnlogout}`}  type="button" onClick={handleLogout} >
                <b>Cerrar Sesión</b>
              </button>
            </div>
            <div className="col-6 d-grid">
              <button className={`${style.btnedit}`} type="button">
                <b>Modificar Contraseña</b>
              </button>
            </div>
          </div>
          <br />
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
