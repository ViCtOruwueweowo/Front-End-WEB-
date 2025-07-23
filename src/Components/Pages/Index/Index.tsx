import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout/Layout";
import styles from './Index.module.css';
import { getMyProfile } from "../../../Api/Profile";

function Index() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        if (res.success) {
          setProfile(res.data);
        } else {
          setError(res.message || "No se pudo cargar el perfil");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Error al cargar el perfil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Cargando perfil...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
          Error: {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ position: "relative", minHeight: "95vh", width: "100%" }}>
  
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#256fa1",
            zIndex: 0,
          }}
        />
   
        <div
          style={{
            position: "relative",
            zIndex: 1,
            color: "white",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            className="flex-md-row d-flex"
          >
            {/* Columna de texto */}
            <div style={{ flex: 1, maxWidth: "100%" }}>
              <h2 className={styles.tituloUno}>Bienvenido</h2>
              <p className={styles.tituloDos}>
                {profile.firstName} {profile.lastName}
              </p>
              <br />
              <p className={styles.texto}>
                Gracias a nuestra plataforma podrás gestionar la información de alumnos, tutores, personal autorizado, supervisar la actividad diaria con total seguridad.
              </p>
              <br />
              <p className={styles.texto}>
                “La tranquilidad de los padres comienza con la seguridad de sus hijos. Nosotros estamos aquí para apoyarle.”
              </p>
            </div>
          <div
  style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  }}
  // Quitamos la clase que oculta la imagen en móviles
  // className="d-none d-md-flex"
>
  <img
    src="./dsadsa.png"
    alt="Bienvenida"
    style={{
    width: "100%",
    maxWidth: "300px",
    height: "auto",
    minHeight: "50px",  // por ejemplo 200px como mínimo
    objectFit: "contain",
    }}
  />
</div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
