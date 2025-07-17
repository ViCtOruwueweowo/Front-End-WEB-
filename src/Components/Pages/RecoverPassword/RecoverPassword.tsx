import { useNavigate, NavLink } from "react-router-dom";
import styles from "./RecoverPassword.module.css";

function RecoverPassword() {

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
              <h2 className={styles.tituloEscribiendo}>Recuperar</h2>
                            <h2 className={styles.tituloEscribiendo}>Contraseña</h2>


              <form>
                <input type="password" className={`form-control mb-3 ${styles.inputs}`} placeholder="Nueva Contraseña"
                 required  />

            
                
        <input type="password" className={`form-control mb-3 ${styles.inputs}`} placeholder="Confirmar Contraseña"
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

export default RecoverPassword;