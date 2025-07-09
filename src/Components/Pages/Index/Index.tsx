import Layout from "../../Layout/Layout/Layout";
import styles from './Index.module.css'
function Index() {
  return (
    <Layout>
      <div style={{ position: "relative", height: "95vh", width: "100%" }}>
        <div
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundImage: "url('/chida.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", filter: "blur(8px)", zIndex: 0, }} />
        <div
          style={{ position: "relative", zIndex: 1, color: "white", padding: "20px", }}>

          <div
            className="row"
            style={{ display: "flex", marginBottom: "20px", alignItems: "flex-start" }}>
            <div className="col" style={{ flex: 1 }}>
              <h1 className={`${styles.tituloUno} from-label`}>Bienvenido</h1>
              <p>Usuario logeado</p>
              <p>
                Gracias a nuestra plataforma podrás gestionar la información de
                alumnos, tutores, personal autorizado, supervisar la actividad diaria con
                total seguridad.
              </p>
              <p>“La tranquilidad de los padres comienza con la seguridad de sus hijos. Nosotros estamos aquí para apoyarle.”</p>
            </div>

            <div className="col" style={{ flex: 1, paddingLeft: "10px" }}>
              <img src="./dsadsa.png" alt="" />
            </div>
          </div>



        </div>
      </div>
    </Layout>
  );
}

export default Index;
