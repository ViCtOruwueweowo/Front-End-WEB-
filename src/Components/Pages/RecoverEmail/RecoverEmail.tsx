// src/Components/Pages/RecoverEmail/RecoverEmail.tsx

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

    setLoading(true);
    try {
      const response = await sendRecoveryEmail(email);

      setSuccess(response.success);
      setMessage(response.message);

      if (response.success) {
        localStorage.setItem("recoverEmail", email);
        navigate("/recover-2");
      }
    } catch (error) {
      setSuccess(false);
      setMessage("Error de servidor. Inténtalo más tarde.");
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

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  className={`form-control mb-3 ${styles.inputs}`}
                  placeholder="Correo Electrónico"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {message && (
                  <div className={`alert ${success ? "alert-success" : "alert-danger"}`}>
                    {message}
                  </div>
                )}

                <div className="d-grid">
                  <button
                    type="submit"
                    className={`btn ${styles.btnPersonalizado}`}
                    disabled={loading}
                  >
                    <b>{loading ? "Enviando..." : "Enviar"}</b>
                  </button>
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
