import Layout from "../../../Layout/Layout/Layout";
import { Link } from "react-router-dom";
import styles from './Secretary.module.css';
import { useEffect, useState } from "react";
import {
  fetchSecretaries,
  editSecretary,
  deleteSecretary,
  Secretary,
} from "../../../../Api/Secretary";

function Index_Secretary() {
  const [secretaries, setSecretaries] = useState<Secretary[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalEditar, setModalEditar] = useState<Secretary | null>(null);
  const [modalEliminar, setModalEliminar] = useState<Secretary | null>(null);

  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const [modalExito, setModalExito] = useState<string | null>(null);

  const mostrarModalExito = (mensaje: string) => {
    setModalExito(mensaje);
  };

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSecretaries = secretaries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(secretaries.length / itemsPerPage);

  useEffect(() => {
    const loadSecretaries = async () => {
      const token = localStorage.getItem("jwt");
      const data = await fetchSecretaries(token);
      setSecretaries(data);
      setLoading(false);
    };
    loadSecretaries();
  }, []);

  useEffect(() => {
    if (modalEditar) {
      setEditEmail(modalEditar.email);
      setEditPhone(modalEditar.phone);
    }
  }, [modalEditar]);

  const handleGuardarCambios = async () => {
    if (!modalEditar) return;
    const token = localStorage.getItem("jwt");
    const success = await editSecretary(modalEditar.id, editEmail, editPhone, token);

    if (success) {
      const actualizadas = secretaries.map((s) =>
        s.id === modalEditar.id ? { ...s, email: editEmail, phone: editPhone } : s
      );
      setSecretaries(actualizadas);
      setModalEditar(null);
      mostrarModalExito("Accion Exitosa");
    } else {
      alert("Error al actualizar secretaria");
    }
  };

  const handleEliminarSecretaria = async () => {
    if (!modalEliminar) return;
    const token = localStorage.getItem("jwt");
    const success = await deleteSecretary(modalEliminar.id, token);

    if (success) {
      const actualizadas = secretaries.filter((s) => s.id !== modalEliminar.id);
      setSecretaries(actualizadas);
      setModalEliminar(null);
      mostrarModalExito("Accion Exitosa");
    } else {
      alert("No se pudo eliminar la secretaria.");
    }
  };

  const renderPagination = () => {
    return (
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <Layout>
      {/* Título */}
      <div
        style={{
          backgroundColor: "#0857a1",
          width: "100%",
          height: "90px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
        className="text-white m-0"
      >
        <h5 style={{ fontWeight: 100, marginBottom: "10px", marginTop: 0 }}>
          Gestion De Secretarias
        </h5>
      </div>

      <br />

      {/* Botón Añadir */}
      <div className="d-flex justify-content-end">
        <Link
          to="/create-secretary"
          className="btn"
          style={{
            backgroundColor: "#ffffff",
            color: "#0857a1",
            border: "3px solid #0857a1",
            margin: "5px",
            width: "200px"
          }}
        >
          <b>Añadir Secretaria</b>
        </Link>
      </div>

      <br />

      {/* Tabla */}
      <div className="d-flex justify-content-center">
        {loading ? (
          <p>Cargando secretarias...</p>
        ) : (
          <div className="table-responsive" style={{ width: "100%" }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className={styles.textTable} style={{ color: "#256ea1" }}>
                    <b>Secretaria</b>
                  </th>
                  <th className={styles.textTable} style={{ color: "#256ea1" }}>
                    <b>Correo Electrónico</b>
                  </th>
                  <th className={styles.textTable} style={{ color: "#256ea1" }}>
                    <b>Teléfono</b>
                  </th>
                  <th className={styles.textTable} style={{ color: "#256ea1" }}>
                    <b>Opciones</b>
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {currentSecretaries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className={styles.textTable2}>
                      No se encontraron secretarias.
                    </td>
                  </tr>
                ) : (
                  currentSecretaries.map((sec, index) => (
                    <tr key={index}>
                      <td className={styles.textTable2}>
                        {sec.firstName} {sec.lastName}
                      </td>
                      <td className={styles.textTable2}>{sec.email}</td>
                      <td className={styles.textTable2}>{sec.phone}</td>
                      <td>
                        <button
                          className="btn btn-link p-0 me-2"
                          onClick={() => setModalEditar(sec)}
                        >
                          <img src="/6.png" alt="Editar" style={{ width: "25px", height: "25px" }} />
                        </button>
                        <button
                          className="btn btn-link p-0"
                          onClick={() => setModalEliminar(sec)}
                        >
                          <img src="/5.png" alt="Eliminar" style={{ width: "25px", height: "25px" }} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {renderPagination()}
          </div>
        )}
      </div>

      {/* Modal Editar */}
      <div
        className={`modal fade ${modalEditar ? "show d-block" : ""}`}
        tabIndex={-1}
        role="dialog"
        style={{ backgroundColor: modalEditar ? "rgba(0,0,0,0.5)" : "transparent" }}
        aria-modal={modalEditar ? "true" : "false"}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">

          <div className="modal-content">

            <h3
              className="modal-title"
              style={{
                marginBottom: "10px",
                fontFamily: "Inter, sans-serif",
                textShadow: "2px 2px 1px rgba(8, 87, 161, 0.44)",
                color: "#0857a1",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Editar
            </h3>

            <div className="modal-body">
              {modalEditar && (
                <>
                  <form>
                    <div className="mb-3" style={{ marginBottom: "10px" }}>
                      <label htmlFor="email" className="form-label"
                        style={{ color: "#0857a1", fontWeight: 400, fontFamily: "'Montserrat', sans-serif" }}>Correo electrónico</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3" style={{ marginBottom: "10px" }}>
                      <label htmlFor="phone" className="form-label"
                        style={{ color: "#0857a1", fontWeight: 400, fontFamily: "'Montserrat', sans-serif" }}>Teléfono</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        maxLength={10}
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                      />
                    </div>
                  </form>
                </>
              )}

              <div className="d-grid gap-2">
                <button className={`${styles.btnedit}`} onClick={handleGuardarCambios}><b>Enviar</b></button>
                <button className={`${styles.btnedit}`} onClick={() => setModalEditar(null)}>Cancelar</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal Eliminar */}
      <div
        className={`modal fade ${modalEliminar ? "show d-block" : ""}`}
        tabIndex={-1}
        role="dialog"
        style={{ backgroundColor: modalEliminar ? "rgba(0,0,0,0.5)" : "transparent" }}
        aria-modal={modalEliminar ? "true" : "false"}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">

            <h5 style={{
              marginTop: "15px",
              marginBottom: "15px",
              fontSize: "18px",
              marginLeft: "40px",
              marginRight: "40px",
              fontFamily: "Inter, sans-serif",
              color: "#0857a1",
              fontWeight: 300,
              textAlign: "center",
            }}>¿Estas Seguro De Emprender La Siguiente Accion?</h5>

            <div className="modal-body">
              {modalEliminar && (
                <p style={{ color: "#0857a1", fontSize: "20px" }}>
                  Eliminar a:{" "}
                  <span style={{ color: "black" }}>
                    {modalEliminar.firstName} {modalEliminar.lastName}
                  </span>
                  ?
                </p>
              )}
              <div className="d-grid gap-2">
                <button className={`${styles.btnedit}`} onClick={handleEliminarSecretaria}>Eliminar Secretaria</button>
                <button className={`${styles.btnedit}`} onClick={() => setModalEliminar(null)}>Cancelar</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ✅ Modal de Éxito */}
      <div
        className={`modal fade ${modalExito ? "show d-block" : ""}`}
        tabIndex={-1}
        role="dialog"
        style={{
          backgroundColor: modalExito ? "rgba(0,0,0,0.5)" : "transparent",
        }}
        aria-modal={modalExito ? "true" : "false"}
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
                {modalExito}
              </p>

              <img
                src="./9.png"
                alt="Éxito"
                className="img-fluid"
                style={{ maxHeight: "200px", marginBottom: "10px" }}
              />

              <div className="d-grid gap-2">
                <button className={`${styles.btnedit}`} onClick={() => setModalExito(null)}>
                  Aceptar
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </Layout>
  );
}

export default Index_Secretary;
