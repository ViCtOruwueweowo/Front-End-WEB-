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
      cursor: "pointer",
      fontWeight: "600",
      width: "200px",
      minWidth: "120px",  // ancho mínimo para pantalla chica
      flexGrow: 0,
      flexShrink: 0,
      transition: "width 0.3s ease",
    };

    if (componenteVisible === nombre) {
      baseStyle.backgroundColor = "#0857a1";
      baseStyle.color = "#ffffff";
    }

    return baseStyle;
  }

  return (
    <Layout>
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
        <h5 style={{ fontWeight: 100, marginBottom: "10px", marginTop: 0 }}>
          Gestión De Establecimientos
        </h5>
      </div>

      <div className="p-3">
        {/* Contenedor flex para botones */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            gap: "10px",
            overflowX: "auto",
          }}
        >
          <button
            onClick={() => setComponenteVisible("guarderia")}
            className="btn"
            style={{
              ...getButtonStyle("guarderia"),
              width: "auto",
              minWidth: 120,
              flexShrink: 1,
              flexGrow: 1,
              maxWidth: 200,
            }}
          >
            Guardería
          </button>
          <button
            onClick={() => setComponenteVisible("kinder")}
            className="btn"
            style={{
              ...getButtonStyle("kinder"),
              width: "auto",
              minWidth: 120,
              flexShrink: 1,
              flexGrow: 1,
              maxWidth: 200,
            }}
          >
            Kinder
          </button>
          <button
            onClick={() => setComponenteVisible("primaria")}
            className="btn"
            style={{
              ...getButtonStyle("primaria"),
              width: "auto",
              minWidth: 120,
              flexShrink: 1,
              flexGrow: 1,
              maxWidth: 200,
            }}
          >
            Primaria
          </button>
          <Link
            to="/create-establishment"
            className="btn"
            style={{
              backgroundColor: "#ffffff",
              color: "#0857a1",
              border: "3px solid #0857a1",
              margin: "5px 0",
              cursor: "pointer",
              fontWeight: "600",
              width: "auto",
              minWidth: 120,
              flexShrink: 1,
              flexGrow: 1,
              maxWidth: 200,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Añadir Establecimiento
          </Link>
        </div>

        <div className="p-3">{(() => {
          switch (componenteVisible) {
            case "guarderia":
              return <Guarderia />;
            case "kinder":
              return <Kinder />;
            case "primaria":
              return <Primaria />;
            default:
              return null;
          }
        })()}</div>
      </div>
    </Layout>
  );
}

export default Index_Establishment;
