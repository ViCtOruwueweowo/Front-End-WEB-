import Layout from "../../Layout/Layout/Layout";
import styles from './Index.module.css';

function Index() {
  return (
    <Layout>
      <div style={{ position: "relative", minHeight: "95vh", width: "100%" }}>
        {/* Fondo azul */}
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
        
        {/* Contenido principal */}
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
              flexDirection: "column", // por defecto en móviles
              gap: "20px",
            }}
            className="flex-md-row d-flex"
          >
            {/* Columna de texto */}
            <div style={{ flex: 1, maxWidth: "100%" }}>
              <h2 className={styles.tituloUno}>Bienvenido</h2>
              <p className={styles.tituloDos}>Andrea Margarita Guibel Escobar</p>
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
                className="d-none d-md-flex"
            >
              <img
                src="./dsadsa.png"
                alt="Bienvenida"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  height: "auto",
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
