import Layout from "../../../Layout/Layout/Layout";
import { Link } from "react-router-dom";
import styles from './Directors.module.css';
import { useEffect, useState } from "react";
import {
  fetchDirector,
  editDirector,
  deleteDirector,
  Director,
} from "../../../../Api/Director";

function Index_Director() {
  
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalEditar, setModalEditar] = useState<Director | null>(null);
  const [modalEliminar, setModalEliminar] = useState<Director | null>(null);

  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const [modalExito, setModalExito] = useState<string | null>(null);
  const mostrarModalExito = (mensaje: string) => setModalExito(mensaje);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDirectors = directors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(directors.length / itemsPerPage);

  useEffect(() => {
    const loadDirectors = async () => {
      const token = localStorage.getItem("jwt");
      const data = await fetchDirector(token);
      setDirectors(data);
      setLoading(false);
    };
    loadDirectors();
  }, []);

  useEffect(() => {
    if (modalEditar) {
      setEditEmail(modalEditar.email);
      setEditPhone(modalEditar.phone);
    }
  }, [modalEditar]);

  const handleGuardarCambios = async () => {
    let valid = true;
    setEmailError("");
    setPhoneError("");

    // Validación del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editEmail)) {
      setEmailError("Correo inválido. Debe tener formato correo@dominio.com");
      valid = false;
    }

    // Validación del teléfono
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(editPhone)) {
      if (!/^\d+$/.test(editPhone)) {
        setPhoneError("El teléfono solo debe contener números.");
      } else {
        setPhoneError("El teléfono debe tener exactamente 10 dígitos.");
      }
      valid = false;
    }

    if (!valid || !modalEditar) return;

    const token = localStorage.getItem("jwt");
    const success = await editDirector(modalEditar.id, editEmail, editPhone, token);

    if (success) {
      const actualizadas = directors.map((d) =>
        d.id === modalEditar.id ? { ...d, email: editEmail, phone: editPhone } : d
      );
      setDirectors(actualizadas);
      setModalEditar(null);
      mostrarModalExito("Accion Exitosa");
    } else {
    setModalEditar(null);
    setMensajeError("No se pudo actualizar el director, Verifique los datos ingresados.");
    setTimeout(() => setMensajeError(null), 5000);
    }
  };
const [mensajeError, setMensajeError] = useState<string | null>(null);

const handleEliminarDirector = async () => {
  if (!modalEliminar) return;
  const token = localStorage.getItem("jwt");
  const success = await deleteDirector(modalEliminar.id, token);

  if (success) {
    const actualizadas = directors.filter((d) => d.id !== modalEliminar.id);
    setDirectors(actualizadas);
    setModalEliminar(null);
    mostrarModalExito("Accion Exitosa");
  } else {
    setModalEliminar(null);
    setMensajeError("No se pudo eliminar el director, Puede que esté asociado a una escuela.");
    setTimeout(() => setMensajeError(null), 5000);
  }
};


  const renderPagination = () => (
    <div className={styles.pagination}>
      <span>Página</span>
      {Array.from({ length: totalPages }, (_, i) => (
        <span
          key={i}
          className={`${styles.pageNumber} ${currentPage === i + 1 ? styles.pageNumberActive : ""}`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </span>
      ))}
    </div>
  );


  return (
    
    <Layout>
      <div style={{backgroundColor: "#0857a1",width: "100%", height: "90px", display: "flex", justifyContent: "center", alignItems: "flex-end", }} className="text-white m-0">
        <h4 style={{ fontWeight: 100, marginBottom: "10px", marginTop: 0 }}>
         Gestión De Directores
        </h4>
      </div>

      <br />

      <div className="d-flex justify-content-end">
        <Link to="/create-directors" className="btn"  style={{backgroundColor: "#ffffff", color: "#0857a1", border: "3px solid #0857a1", margin: "5px", width: "200px",}} >
          <b>Añadir Director</b>
        </Link>
      </div>

      <br />

      <div className="d-flex justify-content-center">
        {loading ? (
          <p>Cargando directores...</p>
        ) : (
          <div className="table-responsive d-none d-md-block" style={{ width: "100%" }}>
         <table className={`table table-hover table-bordered ${styles.customHover}`}>
              <thead>
                <tr>
                  <th className={styles.textTable} style={{ color: "#256ea1" }}>
                    <b>Director</b>
                  </th>
                  <th className={styles.textTable} style={{ color: "#256ea1" }}>
                    <b>Correo</b>
                  </th>
                  <th className={styles.textTable} style={{ color: "#256ea1" }}>
                    <b>Telefono</b>
                  </th>
                  <th className={styles.textTable} style={{ color: "#256ea1" }}>
                    <b>Institucion</b>
                  </th>
                  <th className={styles.textTable} style={{ color: "#256ea1" }}>
                    <b>Opciones</b>
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {currentDirectors.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={styles.textTable2}>
                      No se encontraron directores.
                    </td>
                  </tr>
                ) : (
                  currentDirectors.map((dir, index) => (
                       <tr key={index} className={styles.customHoverRow}>
                      <td className={styles.textTable2}>
                        {dir.firstName} {dir.lastName}
                      </td>
                      <td className={styles.textTable2}>{dir.email}</td>
                      <td className={styles.textTable2}>{dir.phone}</td>
                      <td className={styles.textTable2}>{dir.school ? dir.school.name : 'Sin escuela asignada'}</td>
                      <td>
                        <button className={`${styles.textTable2} btn btn-link p-0  me-2 ${styles.iconHover}`} onClick={() => setModalEditar(dir)}>
                          <img src="/6.png" alt="Editar" style={{ width: "25px", height: "25px" }} />
                        </button>
                        <button className={`${styles.textTable2} btn btn-link p-0 ${styles.iconHover}`} onClick={() => setModalEliminar(dir)}>
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
        {currentDirectors.length === 0 ? (
          <p className={styles.textTable2}>No se encontraron directores.</p>
        ) : (
          currentDirectors.map((dir, index) => (
            <div className="card mb-3" key={index}>
              <div className="card-body">
                <h5 className="card-title">{dir.firstName} {dir.lastName}</h5>
                <p className="card-text"><strong>Email:</strong> {dir.email}</p>
                <p className="card-text"><strong>Teléfono:</strong> {dir.phone}</p>
                <p className="card-text"><strong>Institución:</strong> {dir.school ? dir.school.name : 'Sin escuela asignada'}</p>
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
      <div className={`modal fade ${modalEditar ? "show d-block" : ""}`}
        tabIndex={-1} role="dialog" style={{ backgroundColor: modalEditar ? "rgba(0,0,0,0.5)" : "transparent" }}aria-modal={modalEditar ? "true" : "false"} >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <h3 className="modal-title text-center" style={{ color: "#0857a1", fontWeight: 600 }}>Editar</h3>
            <div className="modal-body">
              {modalEditar && (
                <form>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ color: "#0857a1" }}>Correo electrónico</label>
                    <input type="email" className="form-control"id="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)}/>
                    {emailError && <div className="text-danger mt-1">{emailError}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label" style={{ color: "#0857a1" }}>Teléfono</label>
                    <input type="text"className="form-control" id="phone" maxLength={10}value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
                    {phoneError && <div className="text-danger mt-1">{phoneError}</div>}
                  </div>

                </form>
              )}

              <div className="d-grid gap-2">
                <button className={styles.btnedit} onClick={handleGuardarCambios}><b>Enviar</b></button>
                <button className={styles.btnedit} onClick={() => setModalEditar(null)}>Cancelar</button>
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
            <h5 className="text-center" style={{ color: "#0857a1", marginTop: 15 }}>¿Estas Seguro De Emprender La Siguiente Accion?</h5>
            <div className="modal-body">
              {modalEliminar && (
                <p style={{ color: "#0857a1", fontSize: "20px" }}> Eliminar a: <span style={{ color: "black" }}>{modalEliminar.firstName} {modalEliminar.lastName}</span>? </p>
              )}
              <div className="d-grid gap-2">
                <button className={styles.btnedit} onClick={handleEliminarDirector}>Eliminar Director</button>
                <button className={styles.btnedit} onClick={() => setModalEliminar(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Éxito */}
      <div
        className={`modal fade ${modalExito ? "show d-block" : ""}`}
        tabIndex={-1}
        role="dialog"
        style={{ backgroundColor: modalExito ? "rgba(0,0,0,0.5)" : "transparent" }}
        aria-modal={modalExito ? "true" : "false"}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body text-center">
              <p style={{ fontSize: "20px", color: "#0857a1", fontWeight: 500 }}>{modalExito}</p>
              <img src="./9.png" alt="Éxito" className="img-fluid" style={{ maxHeight: "30vh", marginBottom: "1%" }} />
              <div className="d-grid gap-2">
                <button className={styles.btnedit} onClick={() => setModalExito(null)}>Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
{mensajeError && (
  <div
    className="alert alert-danger alert-dismissible fade show position-fixed top-0 end-0 m-4 shadow"
    role="alert"
    style={{ zIndex: 1050, minWidth: "300px", maxWidth: "400px" }}
  >
    {mensajeError}
    <button
      type="button"
      className="btn-close"
      onClick={() => setMensajeError(null)}
      aria-label="Close"
    ></button>
  </div>
)}

    </Layout>
  );
}

export default Index_Director;
