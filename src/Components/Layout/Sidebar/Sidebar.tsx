import { Link } from "react-router-dom";

function SideBar() {
  const menuItems = [
    { to: "/index", label: "Inicio", icon: "/2.png" },
    { to: "/profile", label: "Mi Perfil", icon: "/1.png" },
    { to: "/directors", label: "Directores", icon: "/1.png" },
    { to: "/secretary", label: "Secretarias", icon: "/3.png" },
    { to: "/establishment", label: "Establecimiento", icon: "/4.png" },
  ];

  return (
    <>
      <nav className="navbar d-flex d-md-none flex-wrap justify-content-center p-2 gap-2" style={{ backgroundColor: "#0857a1" }}>
        {menuItems.map((item, index) => (
          <Link key={index}to={item.to} className="nav-link text-white px-3 py-1 rounded transition-hover"
            style={{transition: "background-color 0.3s ease", textDecoration: "none",}}> {item.label}
          </Link>
        ))}
      </nav>

      {/* Sidebar vertical en pantallas grandes */}
      <div className="d-none d-md-flex flex-column flex-shrink-0 p-3 text-white" style={{ width: "280px", height: "100vh", backgroundColor: "#0857a1" }} >
        <ul className="nav nav-pills flex-column mb-auto mt-4">
          {menuItems.map((item, index) => (
           
           <li key={index} className="nav-item mb-3">
              <Link to={item.to} className="nav-link text-white d-flex align-items-center transition-hover" style={{ transition: "background-color 0.3s ease" }} >
                <img src={item.icon} alt="" className="d-none d-md-inline" style={{ width: "20px", height: "20px", marginRight: "10px" }}/>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default SideBar;
