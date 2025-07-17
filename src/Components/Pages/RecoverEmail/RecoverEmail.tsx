import { useNavigate, NavLink } from "react-router-dom";
import styles from "./RecoverCode.module.css";

function RecoverEmail() {

  return (
    <>
      

      <div className={styles.wrapper}>
        <div className="container">
          <div className="row">

            <div className={`col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center ${styles.pagina}`}>
              <h1 className={`${styles.titulo} ${styles.tituloEscribiendo}`}>
                Safe Kids
              </h1>
              <img className={styles.imagen} src="/dsadsa.png" alt="Safe Kids logo" />
            </div>

            <div className={`col-12 col-md-6 ${styles.login}`}>
              <h2 className={styles.tituloEscribiendo}>Recuperación</h2>
              <p className={styles.tituloEscribiendo}> Favor de ingresar tu correo registrado </p>

              <form>
                <input type="email" className={`form-control mb-3 ${styles.inputs}`} placeholder="Correo Electrónico"
                 required  />

            
                


                <div className="d-grid">
                  <button type="submit" className={`btn ${styles.btnPersonalizado}`} > <b>Enviar</b> </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecoverEmail;