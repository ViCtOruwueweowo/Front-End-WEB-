// src/Api/Secretary.ts
import axios from "axios";

export interface Director {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
}

export async function fetchDirector(token: string | null): Promise<Director[]> {
  if (!token) return [];

  try {
    const res = await axios.get("http://127.0.0.1:8000/api1/users/type/2", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success) {
      return res.data.data as Director[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al cargar secretarias:", error);
    return [];
  }
}
