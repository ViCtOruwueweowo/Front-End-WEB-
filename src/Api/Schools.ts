// src/Api/Schools.ts

export interface CreateSchoolPayload {
  name: string;
  address: string;
  phone: string;
  city: string;
  school_types: number[];
  director_id: number | null;  // Cambiado a number | null
}

export async function createSchool(
  payload: CreateSchoolPayload,
  token: string | null
): Promise<{ success: boolean; message: string }> {
  if (!token) {
    return { success: false, message: "Token no proporcionado" };
  }

  try {

    const response = await fetch("https://api.safekids.site/api1/schools/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: result.message || "Escuela creada exitosamente" };
    } else {
      return { success: false, message: result.message || "Error al crear la escuela" };
    }
  } catch (error) {
    console.error("Error en createSchool:", error);
    return { success: false, message: "Hubo un error de conexión." };
  }
}


