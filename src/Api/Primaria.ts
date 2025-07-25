
// src/Api/Primaria.ts

export interface SchoolType {
  id: number;
  type: string;
  type_name: string;
}

export interface AssignedDirector {
  director_id: number;
  director_role_id: number;
  name: string;
  email: string;
  phone: string;
  school_user_id: number;
}

export interface TeamInfo {
  user_type: string;
  assigned_directors: AssignedDirector[];
  total_directors: number;
}

export interface AccessInfo {
  school_user_id: number | null;
  user_role_id: number;
  access_level: number;
}

export interface School {
  id: number;
  name: string;
  address: string;
  phone: string;
  city: string;
  status: boolean;
  created_at: string;
  school_types: SchoolType[];
  total_types: number;
  access_info: AccessInfo;
  team_info?: TeamInfo;
}

export async function fetchPrimaria(token: string | null): Promise<School[]> {
  const res = await fetch("http://127.0.0.1:8000/api1/schools", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener las guarderías");

  const data = await res.json();

  if (!data.success) throw new Error(data.message || "Error inesperado");

  return (Array.isArray(data.data) ? data.data : []).filter((school: any) =>
    school.school_types?.some((type: any) => type.type === "preschool")
  );
}

export async function fetchPrimariaById(id: number, token: string | null): Promise<School> {
  const res = await fetch(`http://127.0.0.1:8000/api1/schools/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener la información de la guardería");

  const data = await res.json();

  if (!data.success) throw new Error(data.message || "Error inesperado");

  return data.data;
}

export async function deletePrimariaById(id: number, token: string | null) {
  const res = await fetch(`http://127.0.0.1:8000/api1/schools/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!data.success) throw new Error(data.message || "Error al eliminar");

  return data;
}

export interface UpdateSchoolPayload {
  name?: string;
  address?: string;
  phone?: string;
  city?: string;
  school_types?: number[];
  director_id?: number | null;
  status?: boolean;
}


export async function updatePrimaria(
  id: number,
  payload: any,
  token: string
): Promise<{ success: boolean; message?: string }> {
  const response = await fetch(`http://127.0.0.1:8000/api1/schools/edit/${id}`, {
    method: "PUT", // o PATCH, según backend
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error ${response.status}: ${text}`);
  }

  return response.json();
}
