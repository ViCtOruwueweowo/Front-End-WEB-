import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Estilo.module.css';
import {
  fetchGuarderias,
  fetchGuarderiaById,
  deleteGuarderiaById,
  School
} from "../../../../../Api/Guarderia";

function Guarderia() {
  const navigate = useNavigate();
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalEliminar, setModalEliminar] = useState<School | null>(null);

  // Estado para modal éxito
  const [modalExito, setModalExito] = useState<string | null>(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSchools = schools.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(schools.length / itemsPerPage);

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    fetchGuarderias(token)
      .then(setSchools)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleViewSchool = (id: number) => {
    setModalLoading(true);
    setModalError(null);
    const token = localStorage.getItem('jwt');

    fetchGuarderiaById(id, token)
      .then(setSelectedSchool)
      .then(() => setModalOpen(true))
      .catch(err => setModalError(err.message))
      .finally(() => setModalLoading(false));
  };

  const handleEliminarGuarderia = () => {
    if (!modalEliminar) return;
    const token = localStorage.getItem('jwt');

    deleteGuarderiaById(modalEliminar.id, token)
      .then(() => {
        // Mostrar modal de éxito en vez de alert
        setModalExito("Guardería eliminada correctamente");
        setSchools(prev => prev.filter(s => s.id !== modalEliminar.id));
        setModalEliminar(null);
      })
      .catch(err => {
        console.error(err);
        alert(`Ocurrió un error: ${err.message}`);
      });
  };

  const handleEdit = (id: number) => {
    navigate(`/primaria/editar/${id}`);
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

  if (loading) return <p>Cargando escuelas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '10px' }}>

      {/* Tabla para pantallas medianas y grandes */}
      <div className="d-none d-md-block table-responsive" style={{ maxHeight: "65vh", overflowY: "auto" }}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className={styles.textTable} style={{ color: '#256ea1' }}>Nombre</th>
              <th className={styles.textTable} style={{ color: '#256ea1' }}>Dirección</th>
              <th className={styles.textTable} style={{ color: '#256ea1' }}>Teléfono</th>
              <th className={styles.textTable} style={{ color: '#256ea1' }}>Ciudad</th>
              <th className={styles.textTable} style={{ color: '#256ea1' }}>Opciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentSchools.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.textTable2}>
                  No se encontraron escuelas.
                </td>
              </tr>
            ) : (
              currentSchools.map((school) => (
                <tr key={school.id}>
                  <td className={styles.textTable2}>{school.name || 'No Disponible'}</td>
                  <td className={styles.textTable2}>{school.address || 'No Disponible'}</td>
                  <td className={styles.textTable2}>{school.phone || 'No Disponible'}</td>
                  <td className={styles.textTable2}>{school.city || 'No Disponible'}</td>
                  <td>
                    <button className={`btn btn-link p-0 me-3 ${styles.iconHover}`} onClick={() => handleViewSchool(school.id)}>
                      <img src="/8.png" alt="Ver" style={{ width: '25px', height: '25px' }} />
                    </button>
                    <button className={`btn btn-link p-0 me-3 ${styles.iconHover}`} onClick={() => handleEdit(school.id)}>
                      <img src="/6.png" alt="Editar" style={{ width: '25px', height: '25px' }} />
                    </button>
                    <button className={`btn btn-link p-0 ${styles.iconHover}`} onClick={() => setModalEliminar(school)}>
                      <img src="/5.png" alt="Eliminar" style={{ width: '25px', height: '25px' }} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Cards para pantallas pequeñas */}
    <div className="d-block d-md-none" style={{ maxHeight: "65vh", overflowY: "auto" }}>
  {currentSchools.length === 0 ? (
    <p className="text-center text-muted">No se encontraron escuelas.</p>
  ) : (
    currentSchools.map((school) => (
      <div className="card mb-3" key={school.id}>
        <div className="card-body">
          <h5 className="card-title">{school.name || 'No Disponible'}</h5>
          <p className="card-text"><strong>Dirección:</strong> {school.address || 'No Disponible'}</p>
          <p className="card-text"><strong>Teléfono:</strong> {school.phone || 'No Disponible'}</p>
          <p className="card-text"><strong>Ciudad:</strong> {school.city || 'No Disponible'}</p>
          <div className="d-flex justify-content-start gap-3 mt-2">
            <button className={`btn btn-link p-0 me-3 ${styles.iconHover}`} onClick={() => handleViewSchool(school.id)}>
              <img src="/8.png" alt="Ver" style={{ width: '25px', height: '25px' }} />
            </button>
            <button className={`btn btn-link p-0 me-3 ${styles.iconHover}`} onClick={() => handleEdit(school.id)}>
              <img src="/6.png" alt="Editar" style={{ width: '25px', height: '25px' }} />
            </button>
            <button className={`btn btn-link p-0 ${styles.iconHover}`} onClick={() => setModalEliminar(school)}>
              <img src="/5.png" alt="Eliminar" style={{ width: '25px', height: '25px' }} />
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>


      {renderPagination()}

      {/* Modal de Detalle */}
      {modalOpen && selectedSchool && (
        <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-custom modal-dialog-centered" role="document">
            <div className="modal-content rounded-4 shadow-sm p-4">
              <h5 className="modal-title text-center" style={{ color: "#0857a1" }}>Detalle</h5>
              <div className="modal-body">
                {modalLoading && <p>Cargando información...</p>}
                {modalError && <p className="text-danger">{modalError}</p>}
                {!modalLoading && !modalError && (
                  <>
                    <div className="mb-3 row">
                      <label className={`col-sm-4 col-form-label ${styles.modaltext}`}>Nombre</label>
                      <div className="col-sm-8"><input type="text" readOnly className="form-control-plaintext" value={selectedSchool.name || "-"} /></div>
                    </div>
                    <div className="mb-3 row">
                      <label className={`col-sm-4 col-form-label ${styles.modaltext}`}>Dirección</label>
                      <div className="col-sm-8"><input type="text" readOnly className="form-control-plaintext" value={selectedSchool.address || "-"} /></div>
                    </div>
                    <div className="mb-3 row">
                      <label className={`col-sm-4 col-form-label ${styles.modaltext}`}>Teléfono</label>
                      <div className="col-sm-8"><input type="text" readOnly className="form-control-plaintext" value={selectedSchool.phone || "-"} /></div>
                    </div>
                    <div className="mb-3 row">
                      <label className={`col-sm-4 col-form-label ${styles.modaltext}`}>Ciudad</label>
                      <div className="col-sm-8"><input type="text" readOnly className="form-control-plaintext" value={selectedSchool.city || "-"} /></div>
                    </div>
                    <div className="mb-3 row">
                      <label className={`col-sm-4 col-form-label ${styles.modaltext}`}>Director</label>
                      <div className="col-sm-8">
                        {selectedSchool.team_info?.assigned_directors?.length ? (
                          <ul className="list-unstyled mb-0">
                            {selectedSchool.team_info.assigned_directors.map(director => (
                              <li key={director.director_role_id}>{director.name}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No hay directores asignados.</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className='text-center'>
                  <button type="button" className={`${styles.btnedit}`} onClick={() => setModalOpen(false)}>
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {modalEliminar && (
        <div className={`modal fade show d-block`} tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} aria-modal="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <h5 className={`${styles.modale}`}>
                ¿Estás seguro de emprender la siguiente acción?
              </h5>
              <div className="modal-body">
                <p style={{ color: "#0857a1", fontSize: "20px" }}>
                  Eliminar guardería: <span style={{ color: "black" }}>{modalEliminar.name}</span>?
                </p>
                <div className="d-grid gap-2">
                  <button className={`${styles.btnedit}`} onClick={handleEliminarGuarderia}>
                    Eliminar Guardería
                  </button>
                  <button className={`${styles.btnedit}`} onClick={() => setModalEliminar(null)}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Éxito */}
      {modalExito && (
        <div
          className={`modal fade show d-block`}
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
                    fontSize: "20px",
                    color: "#0857a1",
                    fontWeight: 500,
                  }}
                >
                  {modalExito}
                </p>
                <img
                  src="./9.png"
                  alt="Éxito"
                  className="img-fluid"
                  style={{ maxHeight: "30vh", marginBottom: "1%" }}
                />
                <div className="d-grid gap-2">
                  <button className={styles.btnedit} onClick={() => setModalExito(null)}>
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Guarderia;
