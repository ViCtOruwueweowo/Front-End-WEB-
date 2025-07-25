import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../Api/Logout";
import { getMyProfile, changePassword } from "../../../Api/Profile";
import Layout from "../../Layout/Layout/Layout";
import style from "./Profile.module.css";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Estados para mostrar/ocultar modales
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const openPasswordModal = () => setShowPasswordModal(true);
  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setNewPassword("");
    setError("");
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    closePasswordModal();
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      setAlertMessage("Error al cerrar sesión");
      setTimeout(() => setAlertMessage(null), 4000);
    }
  };

  const handlePasswordChange = async () => {
    setError("");

    if (newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      const res = await changePassword(newPassword);

      if (res.success) {
        setShowSuccessModal(true);
        setShowPasswordModal(false);
      } else {
        setError(res.message || "Error al cambiar la contraseña.");
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.errors?.password?.[0] ||
        err.response?.data?.message ||
        "Error inesperado";
      setError(msg);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        if (res.success) {
          setUserData(res.data);
        } else {
          setAlertMessage(res.message || "No se pudo cargar el perfil");
          setTimeout(() => setAlertMessage(null), 4000);
        }
      } catch (err: any) {
        setAlertMessage(
          "Error al cargar el perfil: " + (err.response?.data?.message || err.message)
        );
        setTimeout(() => setAlertMessage(null), 4000);
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
      {/* Alerta Bootstrap arriba a la derecha */}
      {alertMessage && (
        <div
          className="alert alert-danger position-fixed top-0 end-0 m-3 shadow"
          role="alert"
          style={{ zIndex: 1055 }}
        >
          {alertMessage}
        </div>
      )}

      {/* Encabezado */}
      <div
        style={{
          position: "relative",
          backgroundColor: "#0857a1",
          width: "100%",
          height: "90px",
          overflow: "visible",
          paddingLeft: "20px",
        }}
        className="text-white d-flex align-items-center m-0"
      >
        <img className={`${style.imagen}`} src="./icono.jpg" alt="" />
      </div>

      <div
        className={`${style.userName}`}
        style={{ marginLeft: "10px", marginTop: "60px", color: "#000" }}
      >
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
              <button
                className={`${style.btnedit}`}
                type="button"
                onClick={openPasswordModal}
              >
                <b>Modificar Contraseña</b>
              </button>
            </div>
          </div>
          <br />
        </div>
      </div>

      {/* Modal para cambiar contraseña */}
      {showPasswordModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 shadow-sm p-4">
              <div className="mb-3 row">
                <label className={`col-sm-4 col-form-label ${style.modaltext}`}>Nombre</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={userData?.firstName || "-"}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className={`col-sm-4 col-form-label ${style.modaltext}`}>Apellido</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={userData?.lastName || "-"}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className={`col-sm-4 col-form-label ${style.modaltext}`}>Teléfono</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value={userData?.phone || "-"}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className={`col-sm-4 col-form-label ${style.modaltext}`}>
                  Correo Electrónico
                </label>
                <div className="col-sm-8">
                  <input
                    type="email"
                    readOnly
                    className="form-control-plaintext"
                    value={userData?.email || "-"}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className={`col-sm-4 col-form-label ${style.modaltext}`}>Contraseña</label>
                <div className="col-sm-8">
                  <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {error && (
                    <div className="text-danger mt-1" style={{ fontSize: "0.9em" }}>
                      {error}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-12 text-center">
                <button
                  className={`${style.btnupdate}`}
                  type="button"
                  onClick={handlePasswordChange}
                >
                  <b>Actualizar</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body text-center">
                <p
                  style={{
                    marginTop: "15px",
                    marginBottom: "15px",
                    fontSize: "18px",
                    marginLeft: "40px",
                    marginRight: "40px",
                    fontFamily: "Inter, sans-serif",
                    color: "#0857a1",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  Éxito
                </p>

                <img
                  src="/9.png"
                  alt="Éxito"
                  className="img-fluid"
                  style={{ maxHeight: "200px", marginBottom: "10px" }}
                />

                <div className="d-grid gap-2">
                  <button className={style.btnedit} onClick={closeSuccessModal}>
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Profile;
