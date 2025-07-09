import { Link } from "react-router-dom"


function SideBar() {

    return (
        <div className="d-none d-md-flex flex-column flex-shrink-0 p-3 text-white" style={{ width: "280px", height: "100vh", backgroundColor: "#0857a1" }}>
            <ul className="nav nav-pills flex-column mb-auto mt-4">
                <li className="nav-item mb-3">
                    <Link to="/index" className="nav-link text-white d-flex align-items-center">
                        <img src="/2.png" alt="Ícono personalizado" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                        Inicio
                    </Link>

                </li>
                <li className="nav-item mb-3">
                    <Link to="/profile" className="nav-link text-white d-flex align-items-center">
                        <img src="/1.png" alt="Ícono personalizado" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                        Mi Perfil
                    </Link>
                </li>
                <li className="nav-item mb-3">
                    <Link to="/directors" className="nav-link text-white d-flex align-items-center">
                        <img src="/1.png" alt="Ícono personalizado" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                        Directores
                      </Link>

                </li>
              <li className="nav-item mb-3">
                    <Link to="/secretary" className="nav-link text-white d-flex align-items-center">
                        <img src="/3.png" alt="Ícono personalizado" style={{ width: "20px", height: "20px", marginRight: "10px" }} />

                        Secretarias
                                            </Link>

                </li>
                <li className="nav-item mb-3">
                    <Link to="/establishment" className="nav-link text-white d-flex align-items-center">
                        <img src="/4.png" alt="Ícono personalizado" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
                        Establecimiento
                                       </Link>

                </li>
            </ul>
        </div>
    );
}

export default SideBar;
