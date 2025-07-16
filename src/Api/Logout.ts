// src/Api/Logout.ts
import axios from "axios";

/**
 * Cierra la sesión del usuario enviando una solicitud al backend
 * y eliminando el token del localStorage.
 * @throws Error si ocurre un problema durante el logout
 */
export const logoutUser = async (): Promise<void> => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.error("No hay token en localStorage");
    return;
  }

  console.log("Token actual:", token); // para depuración

  try {
    await axios.post(
      "http://127.0.0.1:8000/api1/users/logout",
      {}, // cuerpo vacío
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    localStorage.removeItem("jwt");
  } catch (error: any) {
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
      console.error("Código de estado:", error.response.status);
    } else {
      console.error("Error en logout:", error.message);
    }

    throw new Error("Error al cerrar sesión");
  }
};
