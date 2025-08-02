import { useState, FormEvent, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styles from "./Login.module.css";
import { loginUser } from "../../../Api/Auth";
import FullScreenLoader from "../../Layout/Loading/FullScreenLoader";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("temporaryToken", data.temporaryToken);
      localStorage.setItem("email", email);
      navigate("/secondfactor");
    } catch (error: any) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "";
        if (status === 401) setErrorMsg("Correo o contraseña incorrectos.");
        else if (status === 404) setErrorMsg("El usuario no existe.");
        else if (status === 403) setErrorMsg("Usuario inactivo o sin acceso.");
        else setErrorMsg("Error inesperado. Intenta nuevamente.");
      } else {
        setErrorMsg("No se pudo conectar al servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

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
              <h2 className={styles.tituloEscribiendo}>Ingresar</h2>
              <p className={styles.tituloEscribiendo}>Favor de llenar los campos solicitados</p>

              <form onSubmit={handleSubmit} className={styles.formulario}>
                <input
                  type="email"
                  className={`form-control ${styles.inputs}`}
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />

                <input
                  type="password"
                  className={`form-control ${styles.inputs}`}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />

                {errorMsg && (
                  <div className={`alert alert-danger ${styles.alerta}`} role="alert">
                    {errorMsg}
                  </div>
                )}

                <div className={styles.links}>
                  <NavLink to="/recover-1">¿Olvidaste tu contraseña?</NavLink>
                </div>

                <button
                  type="submit"
                  className={`btn ${styles.btnPersonalizado}`}
                  disabled={loading}
                >
                  <b>Ingresar</b>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
