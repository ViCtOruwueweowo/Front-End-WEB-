// src/components/RecoverEmail.tsx
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

      if (response.success) {
        setSuccess(true);
        // Asumo que el mensaje viene en response.data.message
        setMessage(response.data?.message || "Correo enviado correctamente.");
        localStorage.setItem("recoverEmail", email);
        navigate("/recover-2");
      } else {
        const status = response.status;
        // El mensaje puede venir en data.message o en message (para fallo conexión)
        const msg = response.data?.message || response.message || "";

        if (status === 400 && msg === "El correo electrónico es inválido") {
          setMessage("Debes ingresar un correo electrónico válido.");
        } else if (status === 404 && msg === "Usuario no encontrado") {
          setMessage("El correo electrónico no está registrado.");
        } else if (status === 500 && msg === "Caida del servidor") {
          setMessage("Error del servidor. Intenta más tarde.");
        } else if (status === 0) {
          // Error de conexión (status 0 en tu función)
          setMessage("No se pudo conectar al servidor.");
        } else {
          setMessage("Ocurrió un error inesperado. Intenta más tarde.");
        }
        setSuccess(false);
      }
    } catch (error) {
      // Este catch es para errores no controlados o inesperados
      setMessage("Error inesperado. Intenta más tarde.");
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
            <div
              className={`col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center ${styles.pagina}`}
            >
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

                <button type="submit" className={`btn ${styles.btnPersonalizado}`} disabled={loading}>
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
