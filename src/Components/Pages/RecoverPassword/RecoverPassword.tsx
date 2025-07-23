import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecoverPassword.module.css";
import { changePassword } from "../../../Api/RecoverAccount";
import FullScreenLoader from "../../Layout/Loading/FullScreenLoader";

function RecoverPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(null);

    if (password !== confirmPassword) {
      setSuccess(false);
      setMessage("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    const resetToken = localStorage.getItem("resetToken");
    if (!resetToken) {
      setSuccess(false);
      setMessage("Token no disponible. Intenta reiniciar el proceso.");
      setLoading(false);
      return;
    }

    const response = await changePassword(resetToken, password);

    setSuccess(response.success);

    if (!response.success) {
      setMessage(response.message);
      setLoading(false);
      return;
    }

    // Éxito: limpia token y redirige
    localStorage.removeItem("resetToken");
    setLoading(false);
    setTimeout(() => {
      navigate("/");
    }, 2000);
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
              <h2 className={styles.tituloEscribiendo}>Recuperar</h2>
              <h2 className={styles.tituloEscribiendo}>Contraseña</h2>

              <form onSubmit={handleSubmit}>
                <input
                  type="password"
                  className={`form-control mb-3 ${styles.inputs}`}
                  placeholder="Nueva Contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <input
                  type="password"
                  className={`form-control mb-3 ${styles.inputs}`}
                  placeholder="Confirmar Contraseña"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {success === false && message && (
                  <div className="alert alert-danger">
                    {message}
                  </div>
                )}

                <div className="d-grid">
                  <button type="submit" className={`btn ${styles.btnPersonalizado}`}>
                    <b>Enviar</b>
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

export default RecoverPassword;
