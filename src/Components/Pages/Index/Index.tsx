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
  <div className={styles.seccionFondo}>
    <div className={styles.contenedorPrincipal}>
      {/* Texto */}
      <div style={{ flex: 1, minWidth: "280px" }}>
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

      {/* Imagen */}
      <div
        style={{
          flex: 1,
          minWidth: "280px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="./dsadsa.png"
          alt="Bienvenida"
          className={styles.imagen}
        />
      </div>
    </div>
  </div>
</Layout>


  );
}

export default Index;
