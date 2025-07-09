import Layout from "../../../Layout/Layout/Layout";
import styles from "./Establishment.module.css";

function Estabishment() {
    return (
        <Layout>
            <div style={{ backgroundColor: "#0857a1", width: "100%", height: "90px" }} className="text-white d-flex justify-content-center align-items-center m-0">
                <h5 className="m-0 py-3">Añadir Nuevo Establecimiento</h5>
            </div>
            <div className="d-flex d-flex justify-content-center">
                <form className="row g-4" style={{ maxWidth: "900px", width: "100%" }}>
                    <div className="col-md-6">
                        <label htmlFor="name" className={`${styles.textLabel} from-label`}>Nombre</label>
                        <input type="text" className="form-control" id="name" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="inputPassword4" className={`${styles.textLabel} from-label`}>Direccion</label>
                        <input type="password" className="form-control" id="inputPassword4" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="name" className={`${styles.textLabel} from-label`}>Telefono</label>
                        <input type="text" className="form-control" id="name" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="name" className={`${styles.textLabel} from-label`}>Ciudad</label>
                        <input type="text" className="form-control" id="name" />
                    </div>

                    <div className="col-md-6">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label className="form-label">Guarderia</label>
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label className="form-label">Kinder</label>
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label className="form-label">Primaria</label>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="name" className={`${styles.textLabel} from-label`}>Asignar Director</label>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Seleccionar Director</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Generar Registro</button>
                    </div>
                </form>
            </div>

        </Layout>
    );
}

export default Estabishment;
