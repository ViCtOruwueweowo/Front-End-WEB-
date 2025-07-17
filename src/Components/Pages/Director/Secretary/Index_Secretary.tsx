import Layout from "../../../Layout/Layout/Layout";
import { Link } from "react-router-dom";
import styles from './Secretary.module.css';
import { useEffect, useState } from "react";
import { fetchSecretaries, Secretary } from "../../../../Api/Secretary";

function Index_Secretary() {
  const [secretaries, setSecretaries] = useState<Secretary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSecretaries = async () => {
      const token = localStorage.getItem("jwt");
      const data = await fetchSecretaries(token);
      setSecretaries(data);
      setLoading(false);
    };

    loadSecretaries();
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
          Gestion De Secretarias
        </h5>
      </div>
      <br />
      <div className="d-flex justify-content-end">
        <Link
          to="/create-secretary"
          className="btn"
          style={{
            backgroundColor: "#ffffff",
            color: "#0857a1",
            border: "3px solid #0857a1",
            margin: "5px",
            width: "200px",
          }}
        >
          <b> Añadir Secretaria </b>
        </Link>
      </div>
      <br />
      <div className="d-flex justify-content-center">
        {loading ? (
          <p>Cargando secretarias...</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col" className={styles.textTable} style={{ color: "#256ea1" }}>
                  <b>Secretaria</b>
                </th>
                <th scope="col" className={styles.textTable} style={{ color: "#256ea1" }}>
                  <b>Correo Electronico</b>
                </th>
                <th scope="col" className={styles.textTable} style={{ color: "#256ea1" }}>
                  <b>Telefono</b>
                </th>
                <th scope="col" className={styles.textTable} style={{ color: "#256ea1" }}>
                  <b>Opciones</b>
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {secretaries.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.textTable2}>
                    No se encontraron secretarias.
                  </td>
                </tr>
              ) : (
                secretaries.map((sec, index) => (
                  <tr key={index}>
                    <td className={styles.textTable2}>
                      {sec.firstName}  {sec.lastName}
                    </td>
                    <td className={styles.textTable2}>{sec.email}</td>
                    <td className={styles.textTable2}>{sec.phone}</td>

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

export default Index_Secretary;
