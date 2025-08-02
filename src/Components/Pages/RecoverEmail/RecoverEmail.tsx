import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecoverCode.module.css";
import { sendRecoveryEmail } from "../../../Api/RecoverAccount";
import FullScreenLoader from "../../Layout/Loading/FullScreenLoader";

function RecoverEmail() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setSuccess(null);
    setLoading(true);

    try {
      const response = await sendRecoveryEmail(email);

      setSuccess(response.success);
      setMessage(response.message);

      if (response.success) {
        localStorage.setItem("recoverEmail", email);
        navigate("/recover-2");
      }
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        const msg = error.response.data?.message || "";

        if (status === 400 && msg === "Email is required and must be valid") {
          setMessage("Debes ingresar un correo electrónico válido.");
        } else if (status === 404 && msg === "User not found") {
          setMessage("El correo electrónico no está registrado.");
        } else if (status === 500 && msg === "Server failed") {
          setMessage("Error del servidor. Intenta más tarde.");
        } else {
          setMessage("Ocurrió un error inesperado. Intenta más tarde.");
        }
      } else {
        setMessage("No se pudo conectar al servidor.");
      }

      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className={styles.wrapper}>
        <div className="container">
          <div className="row">
            <div className={`col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center ${styles.pagina}`}>
              <h1 className={`${styles.titulo} ${styles.tituloEscribiendo}`}>Safe Kids</h1>
              <img className={styles.imagen} src="/dsadsa.png" alt="Safe Kids logo" />
            </div>

            <div className={`col-12 col-md-6 ${styles.login}`}>
              <h2 className={styles.tituloEscribiendo}>Recuperación</h2>
              <p className={styles.tituloEscribiendo}>Favor de ingresar tu correo registrado</p>

              <form onSubmit={handleSubmit} className={styles.formulario}>
                <input
                  type="email"
                  className={`form-control ${styles.inputs}`}
                  placeholder="Correo Electrónico"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />

                {message && (
                  <div className={`alert alert-danger ${styles.alerta}`} role="alert">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className={`btn ${styles.btnPersonalizado}`}
                  disabled={loading}
                >
                  <b>{loading ? "Enviando..." : "Enviar"}</b>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecoverEmail;
