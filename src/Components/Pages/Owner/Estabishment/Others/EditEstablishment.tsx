import Layout from "../../../../Layout/Layout/Layout";
import styles from "./Estilo.module.css";
import { useEffect, useState } from "react";
import { fetchOutDirectors, Director } from "../../../../../Api/Director";
import { fetchPrimariaById, updatePrimaria } from "../../../../../Api/Primaria";
import { useNavigate, useParams } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import FullScreenLoader from "../../../../Layout/Loading/FullScreenLoader";

interface DirectorOption {
  value: number;
  label: React.ReactNode; // Permite JSX en label para personalizar el formato
}

function EditarPrimaria() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [directors, setDirectors] = useState<Director[]>([]);
  const [token] = useState<string | null>(localStorage.getItem("jwt"));

  // Estados para formulario
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [types, setTypes] = useState<{ guarderia: boolean; kinder: boolean; primaria: boolean }>({
    guarderia: false,
    kinder: false,
    primaria: false,
  });
  const [selectedDirector, setSelectedDirector] = useState<DirectorOption | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) {
      setModal({ title: "Error", message: "ID inválido" });
      setLoading(false);
      return;
    }

    const loadAll = async () => {
      setLoading(true);
      try {
        const [directorsData, schoolData] = await Promise.all([
          fetchOutDirectors(token),
          fetchPrimariaById(Number(id), token),
        ]);

        setDirectors(directorsData);

        setName(schoolData.name);
        setAddress(schoolData.address);
        setPhone(schoolData.phone);
        setCity(schoolData.city);

        setTypes({
          kinder: schoolData.school_types.some((t: any) => t.type === "kindergarten"),
          guarderia: schoolData.school_types.some((t: any) => t.type === "day_care"),
          primaria: schoolData.school_types.some((t: any) => t.type === "preschool"),
        });



        // Aquí buscamos el director dentro de directorsData para asegurar que sea el objeto correcto
        const assigned = schoolData.team_info?.assigned_directors ?? [];
        if (Array.isArray(assigned) && assigned.length > 0) {
          const dir = assigned[0]; // director asignado
          // Busca en directorsData el director con id igual a dir.director_id
          const directorOption = directorsData.find(d => d.id === dir.director_id);
          if (directorOption) {
            setSelectedDirector({
              value: directorOption.id,
              label: `${directorOption.firstName} ${directorOption.lastName} - ${directorOption.email}`,
            });
          } else {
            setSelectedDirector(null);
          }
        } else {
          setSelectedDirector(null);
        }
      } catch (error) {
        setModal({ title: "Error", message: "No se pudieron cargar los datos" });
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, [id, token]);

  const customOptions = directors.map((director) => ({
    value: director.id,
    label: `${director.firstName} ${director.lastName} - ${director.email}`,
  }));




  const mapTypesToNumbers = () => {
    const result: number[] = [];
    if (types.kinder) result.push(1);
    if (types.guarderia) result.push(2);
    if (types.primaria) result.push(3);
    return result;
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/.test(name)) newErrors.name = "Solo letras, entre 2 y 100 caracteres.";

    if (!address.trim()) newErrors.address = "La dirección es obligatoria.";

    if (!/^\d{10}$/.test(phone)) newErrors.phone = "El teléfono debe tener exactamente 10 dígitos numéricos.";

    if (!city.trim()) newErrors.city = "La ciudad es obligatoria.";
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/.test(city)) newErrors.city = "Solo letras, entre 2 y 50 caracteres.";

    if (mapTypesToNumbers().length === 0) newErrors.types = "Selecciona al menos un tipo.";

    if (!selectedDirector) newErrors.director = "Selecciona un director.";

    return newErrors;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setModal(null);

    const clientSideErrors = validateFields();
    if (Object.keys(clientSideErrors).length > 0) {
      setErrors(clientSideErrors);
      return;
    }

    setSaving(true);

    const payload = {
      name,
      address,
      phone,
      city,
      school_types: mapTypesToNumbers(),
      director_id: selectedDirector?.value,
    };
    try {
      const result = await updatePrimaria(Number(id), payload, token ?? "");
      if (result.success) {
        setModal({ title: "Éxito", message: "El establecimiento fue actualizado correctamente." });
      } else {
        setModal({ title: "Error", message: result.message || "Error al actualizar" });
      }
    } catch {
      setModal({ title: "Error inesperado", message: "No se pudo actualizar el establecimiento." });
    } finally {
      setSaving(false);
    }
  };

  const handleCloseModal = () => {
    if (modal?.title === "Éxito") {
      navigate("/establishment");
    }
    setModal(null);
  };

  if (loading) return <FullScreenLoader />;

  return (
    <Layout>
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
                    marginTop: 15,
                    marginBottom: 15,
                    fontSize: 18,
                    marginLeft: 40,
                    marginRight: 40,
                    fontFamily: "Inter, sans-serif",
                    color: "#0857a1",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {modal.title}
                </p>
                <img
                  src="/9.png"
                  alt="Resultado"
                  className="img-fluid"
                  style={{ maxHeight: 200, marginBottom: 10 }}
                />
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
        <h4 style={{ fontWeight: 100, marginBottom: 10, marginTop: 0 }}>
          Editar Establecimiento
        </h4>
      </div>

      <br />
      <br />
      <br />

      <div className="d-flex justify-content-center">
        <form
          className="row g-5"
          style={{ maxWidth: "90%", width: "100%" }}
          onSubmit={handleSave}
          noValidate
        >
          <div className="col-md-6">
            <label htmlFor="name" className={`${styles.textLabel} form-label`}>
              Nombre
            </label>
            <input
              type="text"
              className={`${styles.animatedInput} form-control`}
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>

          <div className="col-md-6">
            <label htmlFor="direccion" className={`${styles.textLabel} form-label`}>
              Dirección
            </label>
            <input
              type="text"
              className={`${styles.animatedInput} form-control`}
              id="direccion"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <small className="text-danger">{errors.address}</small>}
          </div>

          <div className="col-md-6">
            <label htmlFor="telefono" className={`${styles.textLabel} form-label`}>
              Teléfono
            </label>
            <input
              type="text"
              className={`${styles.animatedInput} form-control`}
              id="telefono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}
          </div>

          <div className="col-md-6">
            <label htmlFor="ciudad" className={`${styles.textLabel} form-label`}>
              Ciudad
            </label>
            <input
              type="text"
              className={`${styles.animatedInput} form-control`}
              id="ciudad"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {errors.city && <small className="text-danger">{errors.city}</small>}
          </div>

          <div className="col-md-6">
            <label className={`${styles.textLabel} form-label`}>Tipo</label>
            <div className="d-flex justify-content-around">
              {["guarderia", "kinder", "primaria"].map((key) => (
                <div className="d-flex flex-column align-items-center" key={key}>
                  <input
                    className={`${styles.animatedInput} form-check-input`}
                    type="checkbox"
                    id={`checkbox${key}`}
                    checked={types[key as keyof typeof types]}
                    onChange={(e) => setTypes({ ...types, [key]: e.target.checked })}
                  />
                  <label className={`${styles.textLabel} form-label`} htmlFor={`checkbox${key}`}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            {errors.types && (
              <small className="text-danger d-block text-center">{errors.types}</small>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="director" className={`${styles.textLabel} from-label`}>
              Asignar Director
            </label>
            <Select
              id="director"
              options={customOptions}
              onChange={(option: SingleValue<DirectorOption>) => {
                setSelectedDirector(option);
              }}
              placeholder="Seleccionar Director"
              value={selectedDirector}
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: state.isFocused ? "#0857a1" : "#ced4da",
                  boxShadow: state.isFocused
                    ? "0 0 10px 3px rgba(8, 87, 161, 0.5)"
                    : "none",
                  transition: "all 0.3s ease",
                  borderRadius: "4px",
                  minHeight: "38px",
                  "&:hover": {
                    borderColor: "#0857a1",
                  },
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                  maxHeight: 150,
                  overflowY: "auto",
                  borderRadius: "6px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                  animation: "fadeIn 0.2s ease-in-out",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#0857a1"
                    : state.isFocused
                      ? "rgba(8, 87, 161, 0.1)"
                      : "white",
                  color: state.isSelected ? "white" : "#0857a1",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "14px",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "#0857a1",
                  fontFamily: "Montserrat, sans-serif",
                }),
              }}
            />

          </div>

          <div className="col-12 text-white d-flex justify-content-center align-items-center">
            <button
              style={{ width: 220, backgroundColor: "#0857a1", color: "white", margin: 10 }}
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              <b>{saving ? "Guardando..." : "Guardar Cambios"}</b>
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default EditarPrimaria;
