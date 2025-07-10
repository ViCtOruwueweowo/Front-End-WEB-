import Layout from "../../../Layout/Layout/Layout";
import styles from "./Establishment.module.css";

function Estabishment() {
    return (
        <Layout>
            <div style={{ backgroundColor: "#0857a1", width: "100%", height: "90px", display: "flex", justifyContent: "center", alignItems: "flex-end", }} className="text-white m-0">
                <h5 style={{ fontWeight: 100, marginBottom: "10px", marginTop: 0 }} >
                    Añadir Nuevo Establecimiento
                </h5>
            </div>
            <br />
            <br />
            <br />
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
                        <label htmlFor="name" className={`${styles.textLabel} from-label`}>Tipo</label>
                        <div className="d-flex justify-content-around">

                            <div className="d-flex flex-column align-items-center">
                                <input className="form-check-input" type="checkbox" name="inlineRadioOptions" id="radioGuarderia" value="guarderia" />
                                <label className={`${styles.textLabel} from-label`} htmlFor="radioGuarderia">Guardería</label>
                            </div>

                            <div className="d-flex flex-column align-items-center">
                                <input className="form-check-input" type="checkbox" name="inlineRadioOptions" id="radioKinder" value="kinder" />
                                <label className={`${styles.textLabel} from-label`} htmlFor="radioKinder">Kinder</label>
                            </div>

                            <div className="d-flex flex-column align-items-center">
                                <input className="form-check-input" type="checkbox" name="inlineRadioOptions" id="radioPrimaria" value="primaria" />
                                <label className={`${styles.textLabel} from-label`} htmlFor="radioPrimaria">Primaria</label>
                            </div>
                        </div>
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

                    <div className="col-12 text-white d-flex justify-content-center align-items-center ">
                        <button style={{ width: "220px", backgroundColor: "#0857a1", color: "white", margin: "10px" }} type="submit" className="btn btn-primary"><b>Generar Registro</b></button>
                    </div>
                </form>
            </div>

        </Layout>
    );
}

export default Estabishment;
