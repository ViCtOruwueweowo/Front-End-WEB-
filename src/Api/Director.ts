// src/Api/Secretary.ts
import axios from "axios";

export interface Director {
  id:string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
}
//Ver Directores
export async function fetchDirector(token: string | null): Promise<Director[]> {
  if (!token) return [];

  try {
    const res = await axios.get("http://127.0.0.1:8000/api1/users/type/3", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success) {
      return res.data.data as Director[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al cargar directores:", error);
    return [];
  }
}

// Editar Director
export async function editDirector(
  id: string,
  email: string,
  phone: string,
  token: string | null
): Promise<boolean> {
  if (!token) return false;

  try {
    const res = await axios.put(
      `http://127.0.0.1:8000/api1/users/edit/${id}`,
      { email, phone },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data.success === true;
  } catch (error) {
    console.error("Error al editar director:", error);
    return false;
  }
}

// Eliminar Director
export async function deleteDirector(id: string, token: string | null): Promise<boolean> {
  if (!token) return false;

  try {
    const res = await axios.delete(`http://127.0.0.1:8000/api1/users/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.success === true;
  } catch (error) {
    console.error("Error al eliminar director:", error);
    return false;
  }
}
