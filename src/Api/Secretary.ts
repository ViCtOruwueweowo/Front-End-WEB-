// src/Api/Secretary.ts

import axios from "axios";

export interface Secretary {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Obtener secretarias (rol tipo 4)
export async function fetchSecretaries(token: string | null): Promise<Secretary[]> {
  if (!token) return [];

  try {
    const res = await axios.get("https://apidev.safekids.site/api1/users/type/4", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success) {
      return res.data.data as Secretary[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al cargar secretarias:", error);
    return [];
  }
}

// Editar secretaria
export async function editSecretary(
  id: string,
  email: string,
  phone: string,
  token: string | null
): Promise<boolean> {
  if (!token) return false;

  try {
    const res = await axios.put(
      `https://apidev.safekids.site/api1/users/edit/${id}`,
      { email, phone },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data.success === true;
  } catch (error) {
    console.error("Error al editar secretaria:", error);
    return false;
  }
}

// Eliminar secretaria
export async function deleteSecretary(id: string, token: string | null): Promise<boolean> {
  if (!token) return false;

  try {
    const res = await axios.delete(`https://apidev.safekids.site/api1/users/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.success === true;
  } catch (error) {
    console.error("Error al eliminar secretaria:", error);
    return false;
  }
}
