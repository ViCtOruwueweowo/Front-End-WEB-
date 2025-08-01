
import axios from "axios";
export interface SchoolType {
  id: number;
  type: string;
  type_name: string;
}

export interface School {
  id: number;
  name: string;
  address: string;
  phone: string;
  city: string;
  status: boolean;
  school_types: SchoolType[];
  total_types: number;
  school_user_id: number;
}

export interface Director {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePhoto?: string;
  status: boolean;
  roleId: number;
  createdBy: number;
  userRoleId: number;
  userRoleStatus: boolean;
  school: School;
}

export interface Director {
  id:number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
}

//Ver Directores
export async function fetchDirector(token: string | null): Promise<Director[]> {
  if (!token) return [];

  try {
    const res = await axios.get("https://apidev.safekids.site/api1/users/type/3", {
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
  id: number,
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
    console.error("Error al editar director:", error);
    return false;
  }
}

// Eliminar Director
export async function deleteDirector(id: number, token: string | null): Promise<boolean> {
  if (!token) return false;

  try {
    const res = await axios.delete(`https://apidev.safekids.site/api1/users/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data.success === true;
  } catch (error) {
    console.error("Error al eliminar director:", error);
    return false;
  }
}
