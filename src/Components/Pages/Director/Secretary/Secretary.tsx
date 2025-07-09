import Layout from "../../../Layout/Layout/Layout";
import styles from "./Secretary.module.css";

function Secretary() {
  return (
    <Layout>
      <div style={{ backgroundColor: "#0857a1", width: "100%", height: "90px" }} className="text-white d-flex justify-content-center align-items-center m-0">
        <h5 className="m-0 py-3">Añadir Nueva Secretaria</h5>
      </div>
      <br />
      <br />
      <br />
      <div className="d-flex d-flex justify-content-center">
        <form className="row g-4" style={{ maxWidth: "900px", width: "100%" }}>
          <div className="col-md-6">
            <label htmlFor="name" className={`${styles.textLabel} from-label`}>Nombre</label>
            <input type="text" className="form-control" id="name" />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputPassword4" className={`${styles.textLabel} from-label`}>Contraseña</label>
            <input type="password" className="form-control" id="inputPassword4" />
          </div>

          <div className="col-md-6">
            <label htmlFor="name" className={`${styles.textLabel} from-label`}>Apellido</label>
            <input type="text" className="form-control" id="name" />
          </div>

          <div className="col-md-6">
            <label htmlFor="name" className={`${styles.textLabel} from-label`}>Telefono</label>
            <input type="text" className="form-control" id="name" />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputEmail4" className={`${styles.textLabel} from-label`}>Email</label>
            <input type="email" className="form-control" id="mail" />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputEmail4" className={`${styles.textLabel} from-label`}>Imagen</label>
            <input className="form-control" type="file" id="formFile" />
          </div>

          <div className="col-12 text-white d-flex justify-content-center align-items-center ">
            <button type="submit" className="btn btn-primary">Añadir Director</button>
          </div>

        </form>
      </div>

    </Layout>
  );
}

export default Secretary;
