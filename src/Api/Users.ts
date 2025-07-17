import axios from "axios";

interface RegisterPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  profilePhoto: string; // base64
}

export const registerUser = async (payload: RegisterPayload, token: string) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api1/users/register",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
