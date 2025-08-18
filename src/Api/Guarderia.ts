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

export async function fetchGuarderias(token: string | null): Promise<School[]> {
  const res = await fetch("https://api.safekids.site/api1/schools", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener las guarderías");

  const data = await res.json();

  if (!data.success) throw new Error(data.message || "Error inesperado");

  return (Array.isArray(data.data) ? data.data : []).filter((school: any) =>
    school.school_types?.some((type: any) => type.type === "day_care")
  );
}

export async function fetchGuarderiaById(id: number, token: string | null): Promise<School> {
  const res = await fetch(`https://api.safekids.site/api1/schools/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener la información de la guardería");

  const data = await res.json();

  if (!data.success) throw new Error(data.message || "Error inesperado");

  return data.data;
}

export async function deleteGuarderiaById(id: number, token: string | null) {
  // 1. Intentar eliminar carpeta física de la escuela (envío solo el número)
  const resFs = await fetch(`https://api2.safekids.site/api2/eliminar/escuela`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),  // <-- Aquí solo el número, no objeto
  });
  const dataFs = await resFs.json();
  if (!dataFs.success) throw new Error(dataFs.message || "Error al eliminar carpeta física");

  // 2. Si la carpeta fue eliminada, eliminar la escuela en base de datos
  const resDb = await fetch(`https://api.safekids.site/api1/schools/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const dataDb = await resDb.json();
  if (!dataDb.success) throw new Error(dataDb.message || "Error al eliminar en DB");

  return { fs: dataFs, db: dataDb };
}