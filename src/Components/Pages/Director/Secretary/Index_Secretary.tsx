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
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

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
      setEmailError(null);
      setPhoneError(null);
    }
  }, [modalEditar]);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const onlyNumbersRegex = /^\d+$/;
    let valid = true;

    if (!emailRegex.test(editEmail)) {
      setEmailError("Correo electrónico no tiene un formato válido.");
      valid = false;
    } else {
      setEmailError(null);
    }

    if (!onlyNumbersRegex.test(editPhone)) {
      setPhoneError("Teléfono debe contener solo números.");
      valid = false;
    } else if (editPhone.length < 10) {
      setPhoneError("Teléfono debe tener mínimo 10 dígitos.");
      valid = false;
    } else {
      setPhoneError(null);
    }

    return valid;
  };

  const handleGuardarCambios = async () => {
    if (!modalEditar) return;
    if (!validateForm()) return;

    const token = localStorage.getItem("jwt");
    const success = await editSecretary(modalEditar.id, editEmail, editPhone, token);

    if (success) {
      const actualizadas = secretaries.map((s) =>
        s.id === modalEditar.id ? { ...s, email: editEmail, phone: editPhone } : s
      );
      setSecretaries(actualizadas);
      setModalEditar(null);
      mostrarModalExito("Acción Exitosa");
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
      mostrarModalExito("Acción Exitosa");
    } else {
      alert("No se pudo eliminar la secretaria.");
    }
  };

  const renderPagination = () => {
    return (
      <div className={styles.pagination}>
        <span>Página</span>
        {Array.from({ length: totalPages }, (_, i) => (
          <span
            key={i}
            className={`${styles["page-number"]} ${currentPage === i + 1 ? styles.active : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </span>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div style={{ backgroundColor: "#0857a1", width: "100%", height: "90px", display: "flex", justifyContent: "center", alignItems: "flex-end", }} className="text-white m-0">
        <h5 style={{ fontWeight: 100, marginBottom: "10px", marginTop: 0 }}>
          Gestión De Secretarias
        </h5>
      </div>

      <br />

      <div className="d-flex justify-content-end">
        <Link to="/create-secretary" className="btn" style={{ backgroundColor: "#ffffff", color: "#0857a1", border: "3px solid #0857a1", margin: "5px", width: "200px" }}>
          <b>Añadir Secretaria</b>
        </Link>
      </div>

      <br />

      <div className="d-flex justify-content-center">
        {loading ? (
          <p>Cargando secretarias...</p>
        ) : (
          <div className="table-responsive d-none d-md-block" style={{ width: "100%" }}>
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th className={styles.textTable} style={{ color: "#256ea1" }}><b>Secretaria</b></th>
                  <th className={styles.textTable} style={{ color: "#256ea1" }}><b>Correo Electrónico</b></th>
                  <th className={styles.textTable} style={{ color: "#256ea1" }}><b>Teléfono</b></th>
                  <th className={styles.textTable} style={{ color: "#256ea1" }}><b>Opciones</b></th>
                </tr>
              </thead>
              <tbody className="text-center">
                {currentSecretaries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className={styles.textTable2}>No se encontraron secretarias.</td>
                  </tr>
                ) : (
                  currentSecretaries.map((sec, index) => (
                    <tr key={index}>
                      <td className={styles.textTable2}>{sec.firstName} {sec.lastName}</td>
                      <td className={styles.textTable2}>{sec.email}</td>
                      <td className={styles.textTable2}>{sec.phone}</td>
                      <td>
                        <button className={`btn btn-link p-0 me-2 ${styles.iconHover}`} onClick={() => setModalEditar(sec)}>
                          <img src="/6.png" alt="Editar" style={{ width: "25px", height: "25px" }} />
                        </button>
                        <button className={`btn btn-link p-0 ${styles.iconHover}`} onClick={() => setModalEliminar(sec)}>
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

        <div className="d-block d-md-none" style={{ maxHeight: "65vh", overflowY: "auto", width: "100%" }}>
        {currentSecretaries.length === 0 ? (
          <p className={styles.textTable2}>No se encontraron directores.</p>
        ) : (
          currentSecretaries.map((dir, index) => (
            <div className="card mb-3" key={index}>
              <div className="card-body">
                <h5 className="card-title">{dir.firstName} {dir.lastName}</h5>
                <p className="card-text"><strong>Email:</strong> {dir.email}</p>
                <p className="card-text"><strong>Teléfono:</strong> {dir.phone}</p>
                <div className="d-flex justify-content-start">
                  <button className={`btn btn-link p-0 me-3 ${styles.iconHover}`} onClick={() => setModalEditar(dir)}>
                    <img src="/6.png" alt="Editar" style={{ width: "25px", height: "25px" }} />
                  </button>
                  <button className={`btn btn-link p-0 ${styles.iconHover}`} onClick={() => setModalEliminar(dir)}>
                    <img src="/5.png" alt="Eliminar" style={{ width: "25px", height: "25px" }} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
             {renderPagination()}
      </div>
      </div>

      {/* Modal Editar */}
      <div className={`modal fade ${modalEditar ? "show d-block" : ""}`} tabIndex={-1} style={{ backgroundColor: modalEditar ? "rgba(0,0,0,0.5)" : "transparent" }} aria-modal={modalEditar ? "true" : "false"}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <h3 className="modal-title text-center" style={{ margin: "10px 0", color: "#0857a1", fontWeight: 600 }}>
              Editar
            </h3>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#0857a1" }}>Correo electrónico</label>
                  <input
                    type="email"
                    className={`form-control ${emailError ? "is-invalid" : ""}`}
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#0857a1" }}>Teléfono</label>
                  <input
                    type="text"
                    maxLength={10}
                    className={`form-control ${phoneError ? "is-invalid" : ""}`}
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                  />
                  {phoneError && <div className="invalid-feedback">{phoneError}</div>}
                </div>
              </form>
              <div className="d-grid gap-2">
                <button className={styles.btnedit} onClick={handleGuardarCambios}><b>Enviar</b></button>
                <button className={styles.btnedit} onClick={() => setModalEditar(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Eliminar */}
      <div className={`modal fade ${modalEliminar ? "show d-block" : ""}`} tabIndex={-1} style={{ backgroundColor: modalEliminar ? "rgba(0,0,0,0.5)" : "transparent" }} aria-modal={modalEliminar ? "true" : "false"}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <h5 className="text-center" style={{ color: "#0857a1", marginTop: 15 }}>¿Estas Seguro De Emprender La Siguiente Accion?</h5>
            <div className="modal-body">
              {modalEliminar && (
                <p style={{ color: "#0857a1", fontSize: "20px" }}>
                  Eliminar a: <span style={{ color: "black" }}>{modalEliminar.firstName} {modalEliminar.lastName}</span>?
                </p>
              )}
              <div className="d-grid gap-2">
                <button className={styles.btnedit} onClick={handleEliminarSecretaria}>Eliminar Secretaria</button>
                <button className={styles.btnedit} onClick={() => setModalEliminar(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Éxito */}
      <div className={`modal fade ${modalExito ? "show d-block" : ""}`} tabIndex={-1} style={{ backgroundColor: modalExito ? "rgba(0,0,0,0.5)" : "transparent" }} aria-modal={modalExito ? "true" : "false"}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <p className={styles.letra}>{modalExito}</p>
              <img src="./9.png" alt="Éxito" className="img-fluid" style={{ maxHeight: "200px", marginBottom: "10px" }} />
              <div className="d-grid gap-2">
                <button className={styles.btnedit} onClick={() => setModalExito(null)}>Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}

export default Index_Secretary;
