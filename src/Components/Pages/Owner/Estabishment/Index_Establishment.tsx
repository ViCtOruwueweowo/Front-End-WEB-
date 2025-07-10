import { useState } from "react";
import Layout from "../../../Layout/Layout/Layout";
import { Link } from "react-router-dom";
import Primaria from "./Others/Primaria";
import Kinder from "./Others/Kinder";
import Guarderia from "./Others/Guarderia";

function Index_Establishment() {
  const [componenteVisible, setComponenteVisible] = useState<string | null>(null);

  function getButtonStyle(nombre: string) {
    const baseStyle = {
      backgroundColor: "#ffffff",
      color: "#0857a1",
      border: "3px solid #0857a1",
      margin: "5px",
      width: "200px",
      cursor: "pointer",
      fontWeight: "600",
    };

    if (componenteVisible === nombre) {
      baseStyle.backgroundColor = "#0857a1";
      baseStyle.color = "#ffffff";
    }

    return baseStyle;
  }


  function renderComponente() {
    switch (componenteVisible) {
      case 'guarderia':
        return <Guarderia />;
      case 'kinder':
        return <Kinder />;
      case 'primaria':
        return <Primaria />;
      default:
        return null;
    }
  }

  return (
    <Layout>
      <div style={{ backgroundColor: "#0857a1", width: "100%", height: "90px", display: "flex", justifyContent: "center", alignItems: "flex-end", }} className="text-white m-0">
        <h5 style={{ fontWeight: 100, marginBottom: "10px", marginTop: 0 }} >
          Gestión De Establecimientos
        </h5>
      </div>

      <div className="d-flex justify-content-between flex-wrap align-items-start p-3">
        <div>
          <button onClick={() => setComponenteVisible('guarderia')} className="btn" style={getButtonStyle('guarderia')}>
            Guardería
          </button>
          <button onClick={() => setComponenteVisible('kinder')} className="btn" style={getButtonStyle('kinder')}>
            Kinder
          </button>
          <button onClick={() => setComponenteVisible('primaria')} className="btn" style={getButtonStyle('primaria')}>
            Primaria
          </button>
        </div>

        <div>
          <Link to="/create-establishment" className="btn" style={{ backgroundColor: "#ffffff", color: "#0857a1", border: "3px solid #0857a1", margin: "5px", width: "200px", fontWeight: "600", }} >
            Añadir Establecimiento
          </Link>
        </div>
      </div>

      <div className="p-3">{renderComponente()}</div>
    </Layout>
  );
}

export default Index_Establishment;
