import Layout from "../../../Layout/Layout/Layout";
import { Link } from "react-router-dom"
import styles from './Secretary.module.css'

function Index_Secretary() {
  return (
    <Layout>
      <div style={{ backgroundColor: "#0857a1", width: "100%", height: "90px", display: "flex", justifyContent: "center", alignItems: "flex-end", }} className="text-white m-0">
        <h5 style={{ fontWeight: 100, marginBottom: "10px", marginTop: 0 }} >
          Gestion De Secretarias
        </h5>
      </div>
      <br />
      <div className="d-flex justify-content-end">
        <Link to="/create-secretary" className="btn" style={{ backgroundColor: "#ffffff", color: "#0857a1", border: "3px solid #0857a1", margin: "5px", width: "200px" }}>
          <b>  Añadir Secretaria </b>
        </Link>
      </div>
      <br />
      <div className="d-flex d-flex justify-content-center">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" className={`${styles.textTable}`} style={{ color: "#256ea1" }}> <b>Direccion</b> </th>
              <th scope="col" className={`${styles.textTable}`} style={{ color: "#256ea1" }}> <b>Correo</b> </th>
              <th scope="col" className={`${styles.textTable}`} style={{ color: "#256ea1" }}> <b>Telefono</b> </th>
              <th scope="col" className={`${styles.textTable}`} style={{ color: "#256ea1" }}> <b>Institucion</b> </th>
              <th scope="col" className={`${styles.textTable}`} style={{ color: "#256ea1" }}> <b>Opciones</b> </th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className={`${styles.textTable2}`}>Luis Jacobo  </td>
              <td className={`${styles.textTable2}`}>lui@gmail.com</td>
              <td className={`${styles.textTable2}`}>871 752 6090</td>
              <td className={`${styles.textTable2}`}>Tecnológico de Torreón</td>
              <td >
                <button style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", marginRight: "10px" }}><img src="/5.png" alt="Ícono personalizado" style={{ width: "25px", height: "25px" }} /></button>
                <button style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}><img src="/6.png" alt="Ícono personalizado" style={{ width: "25px", height: "25px" }} /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Index_Secretary;
