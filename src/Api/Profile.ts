// src/Api/Profile.ts
import axios from "axios";

export const getMyProfile = async () => {
  const token = localStorage.getItem("jwt");

  if (!token) throw new Error("Token no encontrado");

  const response = await axios.get("https://apidev.safekids.site/api1/users/my-profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const changePassword = async (password: string) => {
  const token = localStorage.getItem("jwt");

  if (!token) throw new Error("Token no encontrado");

  const response = await axios.post(
    "https://apidev.safekids.site/api1/users/new-password",
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
