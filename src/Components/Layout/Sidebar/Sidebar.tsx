import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";  // <-- cambiar Link por NavLink
import { getMyProfile } from "../../../Api/Profile";
import styles from "./Sidebar.module.css";

function SideBar() {
  const [roleId, setRoleId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await getMyProfile();
        if (res.success) {
          setRoleId(res.role_info.id);
        }
      } catch (error) {
        console.error("Error al obtener el rol del usuario");
      }
    };

    fetchUserRole();
  }, []);

  const menuItems = [
    { to: "/index", label: "Inicio", icon: "/2.png", allowedRoles: [2, 3] },
    { to: "/profile", label: "Mi Perfil", icon: "/1.png", allowedRoles: [2, 3] },
    { to: "/directors", label: "Directores", icon: "/1.png", allowedRoles: [2] },
    { to: "/secretary", label: "Secretarias", icon: "/3.png", allowedRoles: [3] },
    { to: "/establishment", label: "Establecimiento", icon: "/4.png", allowedRoles: [2] },
  ];

  const filteredItems = menuItems.filter(
    (item) => roleId !== null && item.allowedRoles.includes(roleId)
  );

  return (
    <>
      {/* Navbar horizontal en pantallas pequeñas (mobile + tablet) */}
      <nav
        className="navbar d-flex d-md-none flex-wrap justify-content-center p-2 gap-2"
        style={{ backgroundColor: "#0857a1" }}
      >
        {filteredItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `nav-link text-white px-3 py-1 rounded transition-hover ${styles.linkHover} ${
                isActive ? styles.activeLink : ""
              }`
            }
            style={{ textDecoration: "none" }}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar vertical en pantallas grandes */}
      <div
        className={`d-none d-md-flex flex-column flex-shrink-0 p-3 text-white ${styles.sidebarContainer}`}
        style={{ width: "320px", height: "100vh", backgroundColor: "#0857a1" }}
      >
        <ul className="nav nav-pills flex-column mb-auto mt-4">
          {filteredItems.map((item, index) => (
            <li key={index} className={`nav-item mb-4 ${styles.iconHover}`}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `nav-link text-white d-flex align-items-center ${styles.linkHover} ${
                    isActive ? styles.activeLink : ""
                  }`
                }
                style={{ fontSize: "1.1rem" }}
              >
                <img
                  src={item.icon}
                  alt=""
                  className="d-none d-md-inline"
                  style={{ width: "26px", height: "26px", marginRight: "14px" }}
                />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SideBar;
