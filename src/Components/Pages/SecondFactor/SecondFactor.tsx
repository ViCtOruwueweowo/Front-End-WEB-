import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SecondFactor.module.css";
import { verifyCode } from "../../../Api/Auth";
import FullScreenLoader from "../../Layout/Loading/FullScreenLoader";

function SecondFactor() {
  const [codeDigits, setCodeDigits] = useState<string[]>(Array(6).fill(""));
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const temporaryToken = localStorage.getItem("temporaryToken") || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newCodeDigits = [...codeDigits];
      newCodeDigits[index] = val;
      setCodeDigits(newCodeDigits);
      if (val && index < 5) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const code = codeDigits.join("");
    if (code.length !== 6) {
      setErrorMsg("Por favor ingresa los 6 dígitos.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      const data = await verifyCode(code, temporaryToken);

      if (data.success) {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          localStorage.removeItem("temporaryToken");
          localStorage.removeItem("email");
          localStorage.removeItem("auth_token");
        }
        navigate("/index");
      } else {
        setErrorMsg(data.message || "Código inválido.");
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Error en la verificación, intenta nuevamente.");
      }
    } finally {
      setLoading(false); // ✅ Ocultar loader
    }
  };

  return (
    <>
      {loading && <FullScreenLoader />} {/* 👈 loader en pantalla completa */}

      <div className={styles.wrapper}>

        <div className={`container text-center ${styles.container}`}>

          <img src="./dsadsa.png" alt="Logo" className={styles.imagen} />

          <div className={`${styles.titulo} ${styles.tituloEscribiendo}`}>
            Verificación En Dos Pasos
          </div>

          <div className={styles.texto}>
            INGRESA LOS 6 DÍGITOS DE SEGURIDAD ENVIADOS A TU GMAIL
          </div>

          <div className="row justify-content-center">
            {codeDigits.map((digit, i) => (
              <div className="col-auto px-1" key={i}>
                <input id={`code-input-${i}`} type="text" className={`form-control ${styles.code}`} placeholder="0" maxLength={1} value={digit} onChange={(e) => handleChange(e, i)} autoFocus={i === 0} disabled={loading} />
              </div>
            ))}
          </div>

          {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}

          <div className="row justify-content-center mt-3">
            <div className="col-6">
              <button type="button" className={styles.boton} onClick={handleSubmit} disabled={loading}>
                Ingresar
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default SecondFactor;