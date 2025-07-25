import axios from "axios";

export const sendRecoveryEmail = async (email: string) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api1/users/reset-password", {
      email: email,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else {
      return {
        success: false,
        message: "No se pudo conectar con el servidor",
        timestamp: new Date(),
      };
    }
  }
};

export const verifyCode = async (code: string) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api1/users/password-challenge", {
      code: code,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else {
      return {
        success: false,
        message: "No se pudo conectar con el servidor",
        timestamp: new Date(),
      };
    }
  }
};

// src/Api/RecoverAccount.ts

export const changePassword = async (resetToken: string, password: string) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api1/users/change-password", {
      resetToken,
      password
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else {
      return {
        success: false,
        message: "Error de red o servidor",
      };
    }
  }
};
