import axios from "axios";
import { refreshToken } from "./Refresh";

export const getMyProfile = async () => {
  let token = localStorage.getItem("jwt");

  if (!token) throw new Error("Token no encontrado");

  try {
    const response = await axios.get("https://api.safekids.site/api1/users/my-profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data;
    if (data?.school_id) localStorage.setItem("school_id", data.school_id.toString());
    return data;

  } catch (error: any) {
    const errorCode = error.response?.data?.error_code;
    if (errorCode === "TOKEN_EXPIRED" || errorCode === "TOKEN_BLACKLISTED") {
      
      const refreshRes = await refreshToken(token);
      if (refreshRes.success && refreshRes.data?.token) {
        const newToken = refreshRes.data.token;
        
        localStorage.setItem("jwt", newToken);
        const retryResponse = await axios.get("https://api.safekids.site/api1/users/my-profile", {
          headers: { Authorization: `Bearer ${newToken}` },
        });
        const data = retryResponse.data;
        if (data?.school_id) localStorage.setItem("school_id", data.school_id.toString());
        return data;
      } else {
    
        throw new Error("No se pudo renovar el token");
      }
    }
    throw error;
  }
};

export const changePassword = async (password: string) => {
  let token = localStorage.getItem("jwt");

  if (!token) throw new Error("Token no encontrado");

  try {
    const response = await axios.post(
      "https://api.safekids.site/api1/users/new-password",
      { password },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    const errorCode = error.response?.data?.error_code;
    if (errorCode === "TOKEN_EXPIRED" || errorCode === "TOKEN_BLACKLISTED") {
      const refreshRes = await refreshToken(token);
      if (refreshRes.success && refreshRes.data?.token) {
        const newToken = refreshRes.data.token;
        localStorage.setItem("jwt", newToken);
        const retryResponse = await axios.post(
          "https://api.safekids.site/api1/users/new-password",
          { password },
          { headers: { Authorization: `Bearer ${newToken}` } }
        );
        return retryResponse.data;
      } else {
        throw new Error("No se pudo renovar el token");
      }
    }
    throw error;
  }
};
