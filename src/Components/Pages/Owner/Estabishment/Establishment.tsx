import Layout from "../../../Layout/Layout/Layout";
import styles from "./Establishment.module.css";
import { useEffect, useState } from "react";
import { fetchDirector, Director } from "../../../../Api/Director";
import Select from "react-select";
import { createSchool } from "../../../../Api/Schools";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "../../../Layout/Loading/FullScreenLoader";

function Estabishment() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [token] = useState<string | null>(localStorage.getItem("jwt"));
  const [selectedDirector, setSelectedDirector] = useState<any>(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  // Cambié el estado para que coincida con los keys usados en el map de checkboxes
  const [types, setTypes] = useState<{ guarderia: boolean; kinder: boolean; primaria: boolean }>({
    guarderia: false,
    kinder: false,
    primaria: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDirectors = async () => {
      const data = await fetchDirector(token);
      setDirectors(data);
    };
    loadDirectors();
  }, [token]);

  const customOptions = directors.map((director) => ({
    value: director.id,
    label: (
      <div>
        <div style={{ fontWeight: "bold" }}>
          {director.firstName} {director.lastName}
        </div>
        <div style={{ fontSize: "0.9em", color: "#777" }}>{director.email}</div>
      </div>
    ),
  }));

  // Función actualizada con las claves correctas
  const mapTypesToNumbers = () => {
    const result: number[] = [];
    if (types.kinder) result.push(1);
    if (types.guarderia) result.push(2);
    if (types.primaria) result.push(3);
    return result;
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/.test(name)) {
      newErrors.name = "Solo letras, entre 2 y 100 caracteres.";
    }

    if (!address.trim()) {
      newErrors.address = "La dirección es obligatoria.";
    }

    if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "El teléfono debe tener exactamente 10 dígitos numéricos.";
    }

    if (!city.trim()) {
      newErrors.city = "La ciudad es obligatoria.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/.test(city)) {
      newErrors.city = "Solo letras, entre 2 y 50 caracteres.";
    }

    const school_types = mapTypesToNumbers();
    if (school_types.length === 0) {
      newErrors.types = "Selecciona al menos un tipo.";
    }

    if (!selectedDirector) {
      newErrors.director = "Selecciona un director.";
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

    setLoading(true);
    const payload = {
      name,
      address,
      phone,
      city,
      school_types: mapTypesToNumbers(),
      director_id: selectedDirector?.value,
    };

    try {
      const result = await createSchool(payload, token);
      setLoading(false);

      if (result.success) {
        setModal({ title: "Éxito", message: "El establecimiento fue creado correctamente." });
        setName("");
        setAddress("");
        setPhone("");
        setCity("");
        setTypes({ guarderia: false, kinder: false, primaria: false });
        setSelectedDirector(null);
      } else {
        setModal({ title: "Error", message: result.message });
      }
    } catch {
      setLoading(false);
      setModal({ title: "Error inesperado", message: "No se pudo registrar el establecimiento." });
    }
  };

  const handleCloseModal = () => {
    setModal(null);
    if (modal?.title === "Éxito") {
      navigate("/establishment");
    }
  };

  return (
    <Layout>
      {loading && <FullScreenLoader />}

      {/* Modal Éxito/Error */}
      {modal && (
        <div
          className={`modal fade show d-block`}
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body text-center">
                <p
                  style={{
                    marginTop: "15px",
                    marginBottom: "15px",
                    fontSize: "18px",
                    marginLeft: "40px",
                    marginRight: "40px",
                    fontFamily: "Inter, sans-serif",
                    color: "#0857a1",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {modal.title}
                </p>
                <img src="/9.png" alt="Resultado" className="img-fluid" style={{ maxHeight: "200px", marginBottom: "10px" }} />
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" onClick={handleCloseModal}>
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Encabezado */}
      <div
        style={{
          backgroundColor: "#0857a1",
          width: "100%",
          height: "90px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
        className="text-white m-0"
      >
        <h5 style={{ fontWeight: 100, marginBottom: "10px", marginTop: 0 }}>Añadir Nuevo Establecimiento</h5>
      </div>

      <br />
      <br />
      <br />

      <div className="d-flex justify-content-center">
        <form className="row g-4" style={{ maxWidth: "900px", width: "100%" }} onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="name" className={`${styles.textLabel} from-label`}>
              Nombre
            </label>
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>

          <div className="col-md-6">
            <label htmlFor="direccion" className={`${styles.textLabel} from-label`}>
              Dirección
            </label>
            <input type="text" className="form-control" id="direccion" value={address} onChange={(e) => setAddress(e.target.value)} />
            {errors.address && <small className="text-danger">{errors.address}</small>}
          </div>

          <div className="col-md-6">
            <label htmlFor="telefono" className={`${styles.textLabel} from-label`}>
              Teléfono
            </label>
            <input type="text" className="form-control" id="telefono" value={phone} onChange={(e) => setPhone(e.target.value)} />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}
          </div>

          <div className="col-md-6">
            <label htmlFor="ciudad" className={`${styles.textLabel} from-label`}>
              Ciudad
            </label>
            <input type="text" className="form-control" id="ciudad" value={city} onChange={(e) => setCity(e.target.value)} />
            {errors.city && <small className="text-danger">{errors.city}</small>}
          </div>

          <div className="col-md-6">
            <label className={`${styles.textLabel} from-label`}>Tipo</label>
            <div className="d-flex justify-content-around">
              {["guarderia", "kinder", "primaria"].map((key) => (
                <div className="d-flex flex-column align-items-center" key={key}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`radio${key}`}
                    checked={types[key as keyof typeof types]}
                    onChange={(e) => setTypes({ ...types, [key]: e.target.checked })}
                  />
                  <label className={`${styles.textLabel} from-label`} htmlFor={`radio${key}`}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            {errors.types && <small className="text-danger d-block text-center">{errors.types}</small>}
          </div>

          <div className="col-md-6">
            <label htmlFor="director" className={`${styles.textLabel} from-label`}>
              Asignar Director
            </label>
            <Select
              id="director"
              options={customOptions}
              onChange={setSelectedDirector}
              placeholder="Seleccionar Director"
              value={selectedDirector}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#ced4da",
                  boxShadow: "none",
                  minHeight: "38px",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
            />
            {errors.director && <small className="text-danger">{errors.director}</small>}
          </div>

          <div className="col-12 text-white d-flex justify-content-center align-items-center">
            <button
              style={{ width: "220px", backgroundColor: "#0857a1", color: "white", margin: "10px" }}
              type="submit"
              className="btn btn-primary"
            >
              <b>Generar Registro</b>
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Estabishment;
