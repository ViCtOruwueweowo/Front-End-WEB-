import styles from "./Secretary.module.css";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../Layout/Layout/Layout";
import { registerUser } from "../../../../Api/Users";
import FullScreenLoader from "../../../Layout/Loading/FullScreenLoader";

function Modal({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10000, }}>
      <div style={{ backgroundColor: "white", padding: 20, borderRadius: 8, width: "60%", height: "50%", textAlign: "center", }} >
        <h3 style={{ color: "#0857a1" }}>{title}</h3>
        <div className="container">
          <img style={{ maxHeight: "30vh", marginBottom: "1%" }} src="/9.png" alt="Éxito" />
        </div>
        <div>
          <button className="btn" onClick={onClose} style={{ backgroundColor: "#ffffff", color: "#0857a1", border: "3px solid #0857a1", margin: "5px", width: "200px", }}>
            <b>Cerrar</b>
          </button>
        </div>
      </div>
    </div>
  );
}

function Secretary() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    profilePhoto: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImageAsFile = async () => {
      try {
        const response = await fetch("/ZY.png");
        const blob = await response.blob();
        const file = new File([blob], "ZY.png", { type: blob.type });
        setFormData(prev => ({ ...prev, profilePhoto: file }));
      } catch (error) {
        console.error("Error al cargar imagen fija:", error);
        setMensajeError("Error al cargar la imagen fija.");
      }
    };

    fetchImageAsFile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    let filteredValue = value;

    if (id === "firstName" || id === "lastName") {
      filteredValue = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
    } else if (id === "phone") {
      filteredValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({ ...formData, [id]: filteredValue });
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "El nombre es obligatorio.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/.test(formData.firstName)) {
      newErrors.firstName = "Solo letras, mínimo 2 y máximo 50 caracteres.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es obligatorio.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/.test(formData.lastName)) {
      newErrors.lastName = "Solo letras, mínimo 2 y máximo 50 caracteres.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Debe tener exactamente 10 dígitos numéricos.";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Correo electrónico inválido.";
    }

    if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (!formData.profilePhoto) {
      newErrors.profilePhoto = "No se pudo cargar la imagen fija.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setModal(null);

    const clientSideErrors = validateFields();
    if (Object.keys(clientSideErrors).length > 0) {
      setErrors(clientSideErrors);
      return;
    }

    if (formData.profilePhoto && formData.profilePhoto.size > 2 * 1024 * 1024) {
      setErrors({ profilePhoto: "La imagen no debe superar los 2MB." });
      return;
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      setModal({ title: "Error", message: "No hay sesión activa. Inicia sesión primero." });
      return;
    }

    try {
      setLoading(true);

      const formDataUser = new FormData();
      formDataUser.append("firstName", formData.firstName);
      formDataUser.append("lastName", formData.lastName);
      formDataUser.append("phone", formData.phone);
      formDataUser.append("email", formData.email);
      formDataUser.append("password", formData.password);
      formDataUser.append("profilePhoto", formData.profilePhoto as File);

      await registerUser(formDataUser, token);

      setLoading(false);
      setModal({ title: "Éxito", message: "Registro completado correctamente" });
      setFormData({ firstName: "", lastName: "", phone: "", email: "", password: "", profilePhoto: null });
    } catch (error: any) {
      setLoading(false);

      if (error.response) {
        setMensajeError(`Error ${error.response.status}: ${JSON.stringify(error.response.data) || error.message}`);
        console.error("Error Axios Response Data:", error.response.data);
        console.error("Error Axios Status:", error.response.status);
      } else {
        setMensajeError(error.message || "Ocurrió un error al registrar.");
        console.error("Error inesperado:", error);
      }

      setTimeout(() => setMensajeError(null), 7000);
    }
  };

  const handleCloseModal = () => {
    setModal(null);
    if (modal?.title === "Éxito") {
      navigate("/secretary");
    }
  };

  return (
    <Layout>
      {loading && <FullScreenLoader />}
      {modal && <Modal title={modal.title} onClose={handleCloseModal} />}

       <div style={{ backgroundColor: "#0857a1", width: "100%", height: "90px", display: "flex", justifyContent: "center", alignItems: "flex-end", }} className="text-white m-0">
        <h5 style={{ fontWeight: 100, marginBottom: "10px", marginTop: 0 }}>
          Añadir Nueva Secretaria
        </h5>
      </div>

      <br />
      <br />
      <br />
     <div className="text-white d-flex justify-content-center align-items-center m-0">
        <form className="row g-5" style={{ maxWidth: "90%", width: "100%" }} onSubmit={handleSubmit} >
        
          <div className="col-md-6">
            <label htmlFor="firstName" className={styles.textLabel}>
              Nombre
            </label>
            <input type="text" className={`${styles.animatedInput} form-control`} id="firstName" value={formData.firstName}onChange={handleChange} required/>
            {errors.firstName && (
              <small className="text-danger">{errors.firstName}</small>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="password" className={styles.textLabel}>
              Contraseña
            </label>
            <input type="password" className={`${styles.animatedInput} form-control`} id="password" value={formData.password}onChange={handleChange}required />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="lastName" className={styles.textLabel}>
              Apellido
            </label>
            <input type="text" className={`${styles.animatedInput} form-control`} id="lastName" value={formData.lastName} onChange={handleChange}required />
            {errors.lastName && (
              <small className="text-danger">{errors.lastName}</small>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="phone" className={styles.textLabel}>
              Teléfono
            </label>
            <input type="text" className={`${styles.animatedInput} form-control`} id="phone" value={formData.phone} onChange={handleChange}required/>
            {errors.phone && (
              <small className="text-danger">{errors.phone}</small>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className={styles.textLabel}>
              Email
            </label>
            <input type="email" className={`${styles.animatedInput} form-control`} id="email" value={formData.email} onChange={handleChange} required/>
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div className="col-12 d-flex justify-content-center align-items-center">
            <button style={{ width: "220px", backgroundColor: "#0857a1", color: "white", margin: "10px",}}type="submit" className="btn btn-primary" disabled={loading} >
              <b>Generar Registro</b>
            </button>
          </div>
        </form>
      </div>

      {mensajeError && (
        <div className="alert alert-danger alert-dismissible fade show position-fixed top-0 end-0 m-4 shadow"  role="alert" style={{ zIndex: 1050, minWidth: "300px", maxWidth: "400px" }} >
          {mensajeError}
          <button type="button" className="btn-close" onClick={() => setMensajeError(null)} aria-label="Close"></button>
        </div>
      )}
    </Layout>
  );
}

export default Secretary;
