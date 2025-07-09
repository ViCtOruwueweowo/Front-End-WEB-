import styles from "./SecondFactor.module.css";

function SecondFactor() {
  return (
    <div className={styles.wrapper}>
      <div className={`container text-center ${styles.container}`}>
        <img
          src="./dsadsa.png"
          alt="Logo"
          className={styles.imagen}
        />
        <div className={`${styles.titulo} ${styles.tituloEscribiendo}`}>
          Verificación En Dos Pasos
        </div>
        <div className={styles.texto}>
          INGRESA LOS 6 DIGITOS DE SEGURIDAD ENVIADOS A TU GMAIL
        </div>
        <div className="row justify-content-center">
          {[...Array(6)].map((_, i) => (
            <div className="col-1" key={i}>
              <input
                type="text"
                className={`form-control ${styles.code}`}
                placeholder="0"
                maxLength={1}
              />
            </div>
          ))}
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col-6">
            <button type="button" className={styles.boton}>
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondFactor;
