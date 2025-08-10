import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecoverPassword.module.css";
import { changePassword } from "../../../Api/RecoverAccount";
import FullScreenLoader from "../../Layout/Loading/FullScreenLoader";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function RecoverPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
          setTimeout(() => {
      setMessage("");
      setSuccess(null);
    }, 5000);
      return;
    }

    const resetToken = localStorage.getItem("resetToken");
    if (!resetToken) {
      setSuccess(false);
      setMessage("Token no disponible. Intenta reiniciar el proceso.");
      setLoading(false);
          setTimeout(() => {
      setMessage("");
      setSuccess(null);
    }, 5000);
      return;
    }

    const response = await changePassword(resetToken, password);

    setSuccess(response.success);

    if (!response.success) {
      setMessage(response.message);
      setLoading(false);
          setTimeout(() => {
      setMessage("");
      setSuccess(null);
    }, 5000);
      return;
    }

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
            <div
              className={`col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center ${styles.pagina}`}
            >
              <h1 className={`${styles.titulo} ${styles.tituloEscribiendo}`}>
                Safe Kids
              </h1>
              <img
                className={styles.imagen}
                src="/dsadsa.png"
                alt="Safe Kids logo"
              />
            </div>

            <div className={`col-12 col-md-6 ${styles.login}`}>
              <h2 className={styles.tituloEscribiendo}>Recuperar</h2>
              <h2 className={styles.tituloEscribiendo}>Contraseña</h2>

              <form onSubmit={handleSubmit} className={styles.formulario}>
                {/* Input Nueva Contraseña */}
                <div
                  className="position-relative"
                  style={{ width: "100%", maxWidth: "450px", margin: "0 auto" }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${styles.inputs}`}
                    placeholder="Nueva Contraseña"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: "2.5rem" }}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-80%)",
                      cursor: "pointer",
                      fontSize: "1.3rem",
                      color: "#666",
                    }}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setShowPassword(!showPassword);
                      }
                    }}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>

                {/* Input Confirmar Contraseña */}
                <div
                  className="position-relative"
                  style={{ width: "100%", maxWidth: "450px", margin: "0 auto" }}
                >
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control ${styles.inputs}`}
                    placeholder="Confirmar Contraseña"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ paddingRight: "2.5rem" }}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-80%)",
                      cursor: "pointer",
                      fontSize: "1.3rem",
                      color: "#666",
                    }}
                    aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setShowConfirmPassword(!showConfirmPassword);
                      }
                    }}
                  >
                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>

                {success === false && message && (
                  <div className={`alert alert-danger ${styles.alerta}`}>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className={`btn ${styles.btnPersonalizado}`}
                  disabled={loading}
                >
                  <b>Enviar</b>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecoverPassword;
