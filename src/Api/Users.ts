import axios from "axios";

export const registerUser = async (formData: FormData, token: string) => {
  const response = await axios.post(
    "https://api.safekids.site/api1/users/register",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getMySchools = async () => {
  try {
    const token = localStorage.getItem('jwt');
    const response = await axios.get('https://api.safekids.site/api1/schools/my-schools', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    if (response.data.success) {
      return response.data.data;
    } else {
      console.warn('Respuesta no exitosa:', response.data.message);
      return [];
    }

  } catch (error) {
    if (error.response) {
      console.error('Error en la respuesta del servidor:', error.response.data);
    } else {
      console.error('Error en la petición:', error.message);
    }
  }
};