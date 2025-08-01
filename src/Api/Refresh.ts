// src/Api/Refresh.ts

export interface RefreshResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      role: number | null;
    };
  };
  error_code?: string;
  timestamp: string;
}

export async function refreshToken(token: string): Promise<RefreshResponse> {
  try {
    const response = await fetch("https://apidev.safekids.site/api1/users/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al renovar token");
    }

    return data as RefreshResponse;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}
