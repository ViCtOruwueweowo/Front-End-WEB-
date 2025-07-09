import { NavLink } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className="row">

          <div className={`col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center ${styles.pagina}`}>
            <h1 className={`${styles.titulo} ${styles.tituloEscribiendo}`}>Safe Kids</h1>
            <img className={styles.imagen} src="/dsadsa.png" alt="Safe Kids logo" />
          </div>

          <div className={`col-12 col-md-6 ${styles.login}`}>
            <h2 className={`${styles.tituloEscribiendo}`}>Ingresar</h2>
            <p className={`${styles.tituloEscribiendo}`}>Favor de llenar los campos solicitados</p>
            <form>
              <input
                type="email"
                className={`form-control mb-3 ${styles.inputs}`}
                placeholder="Correo Electrónico"
                required
              />
              <input
                type="password"
                className={`form-control mb-3 ${styles.inputs}`}
                placeholder="Contraseña"
                required
              />
              <div className={`mb-3 ${styles.links}`}>
                <NavLink to="/recovermail">¿Olvidaste tu contraseña?</NavLink>
              </div>
              <div>
                <button type="submit" className={`btn ${styles.btnPersonalizado}`}>
                  <b>Ingresar</b>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
