import axios from "axios";

export const registerUser = async (formData: FormData, token: string) => {
  const response = await axios.post(
    "https://apidev.safekids.site/api1/users/register",
    formData,
    {
      headers: {
        // No pongas 'Content-Type', axios lo configura automáticamente
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
