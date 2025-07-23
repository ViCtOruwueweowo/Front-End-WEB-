import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../Api/Logout";
import { getMyProfile } from "../../../Api/Profile";
import Layout from "../../Layout/Layout/Layout";
import style from "./Profile.module.css";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      alert("Error al cerrar sesión");
    }
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Aquí iría la lógica para enviar la nueva contraseña
    // await changePassword(newPassword);

    alert("Contraseña modificada correctamente");
    setNewPassword("");
    setConfirmPassword("");
    setError("");


  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        if (res.success) {
          setUserData(res.data);
        } else {
          alert(res.message || "No se pudo cargar el perfil");
        }
      } catch (err: any) {
        alert("Error al cargar el perfil: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-5">Cargando perfil...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Encabezado */}
      <div
        style={{ position: "relative", backgroundColor: "#0857a1", width: "100%", height: "90px", overflow: "visible", paddingLeft: "20px" }}
        className="text-white d-flex align-items-center m-0"
      >
        <img className={`${style.imagen}`} src="./icono.jpg" alt="" />
      </div>

      <div className={`${style.userName}`} style={{ marginLeft: "10px", marginTop: "60px", color: "#000" }}>
        {userData?.firstName} {userData?.lastName}
      </div>

      <br />

      <div className={`${style.contenedorUser}`}>
        <h4 className={`${style.principal}`}>Mi Información</h4>

        <div className="container">
          <ul className="list-group list-group-horizontal">
            <li className={`${style.listgroup} list-group-item ${style.temas}`}>Nombre</li>
            <li className={`${style.listgroup} ${style.temas2} list-group-item`}>
              {userData?.firstName || "-"}
            </li>
          </ul>

          <ul className="list-group list-group-horizontal-sm">
            <li className={`${style.listgroup} list-group-item ${style.temas}`}>Apellido</li>
            <li className={`${style.listgroup} ${style.temas2} list-group-item`}>
              {userData?.lastName || "-"}
            </li>
          </ul>

          <ul className="list-group list-group-horizontal-sm">
            <li className={`${style.listgroup} list-group-item ${style.temas}`}>Teléfono</li>
            <li className={`${style.listgroup} ${style.temas2} list-group-item`}>
              {userData?.phone || "-"}
            </li>
          </ul>

          <ul className="list-group list-group-horizontal-sm">
            <li className={`${style.listgroup} list-group-item ${style.temas}`}>Correo Electrónico</li>
            <li className={`${style.listgroup} ${style.temas2} list-group-item`}>
              {userData?.email || "-"}
            </li>
          </ul>

          <div className="row">
            <div className="col-6 d-grid">
              <button className={`${style.btnlogout}`} type="button" onClick={handleLogout}>
                <b>Cerrar Sesión</b>
              </button>
            </div>
            <div className="col-6 d-grid">
              {/* Botón para abrir el modal */}
              <button
                className={`${style.btnedit}`}
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#passwordModal"
              >
                <b>Modificar Contraseña</b>
              </button>
            </div>
          </div>
          <br />
        </div>
      </div>


      {/* Modal de Bootstrap */}
      <div
        className="modal fade"
        id="passwordModal"
        tabIndex={-1}
        aria-labelledby="passwordModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 shadow-sm p-4">

            <div className="mb-3 row">
              <label className={`col-sm-4 col-form-label ${style.modaltext}`}
              >Nombre</label>
              <div className="col-sm-8">
                <input type="text" readOnly className="form-control-plaintext" value={userData?.firstName || "-"} />
              </div>
            </div>

            <div className="mb-3 row">
              <label className={`col-sm-4 col-form-label ${style.modaltext}`}
              >Apellido</label>
              <div className="col-sm-8">
                <input type="text" readOnly className="form-control-plaintext" value={userData?.lastName || "-"} />
              </div>
            </div>

            <div className="mb-3 row">
              <label className={`col-sm-4 col-form-label ${style.modaltext}`}
              >Teléfono</label>
              <div className="col-sm-8">
                <input type="text" readOnly className="form-control-plaintext" value={userData?.phone || "-"} />
              </div>
            </div>

            <div className="mb-3 row">
              <label className={`col-sm-4 col-form-label ${style.modaltext}`}
              >Correo Electrónico</label>
              <div className="col-sm-8">
                <input type="email" readOnly className="form-control-plaintext" value={userData?.email || "-"} />
              </div>
            </div>

            <div className="mb-3 row">
              <label className={`col-sm-4 col-form-label ${style.modaltext}`}
              >Contraseña</label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}

                />
              </div>
            </div>
            <div className="col-12 text-center">
              <button className={`${style.btnupdate}`} type="button" onClick={handlePasswordChange}>
                <b>Actualizar</b>
              </button>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}

export default Profile;
