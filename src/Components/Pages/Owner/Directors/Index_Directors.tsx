import Layout from "../../../Layout/Layout/Layout";
import { Link } from "react-router-dom";
import styles from './Directors.module.css';
import { useEffect, useState } from "react";
import { fetchDirector, Director} from "../../../../Api/Director"

function Index_Director() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDirectors = async () => {
      const token = localStorage.getItem("jwt");
      const data = await fetchDirector(token);
      setDirectors(data);
      setLoading(false);
    };

    loadDirectors();
  }, []);

  return (
    <Layout>
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
          Gestion De Directores
        </h5>
      </div>
      <br />
      <div className="d-flex justify-content-end">
        <Link
          to="/create-directors"
          className="btn"
          style={{
            backgroundColor: "#ffffff",
            color: "#0857a1",
            border: "3px solid #0857a1",
            margin: "5px",
            width: "200px",
          }}
        >
          <b>Añadir Director</b>
        </Link>
      </div>
      <br />
      <div className="d-flex justify-content-center">
        {loading ? (
          <p>Cargando directores...</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className={styles.textTable} style={{ color: "#256ea1" }}>
                  <b>Direccion</b>
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
              {directors.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.textTable2}>
                    No se encontraron directores.
                  </td>
                </tr>
              ) : (
                directors.map((dir, index) => (
                  <tr key={index}>
                    <td className={styles.textTable2}>{dir.firstName} {dir.lastName}</td>
                    <td className={styles.textTable2}>{dir.email}</td>
                    <td className={styles.textTable2}>{dir.phone}</td>
                   
                    <td>
                      <button
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          marginRight: "10px",
                        }}
                      >
                        <img
                          src="/5.png"
                          alt="Editar"
                          style={{ width: "25px", height: "25px" }}
                        />
                      </button>
                      <button
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src="/6.png"
                          alt="Eliminar"
                          style={{ width: "25px", height: "25px" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

export default Index_Director;
