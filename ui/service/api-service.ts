"use client";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface ApiRequestOptions {
  method: Method;
  body?: any;
  headers?: Record<string, string>;
}

const apiRequest = async <T>(
  endpoint: string,
  method: Method = "GET",
  body?: any,
  headers: Record<string, string> = {}
): Promise<T> => {
  const url = `${API_BASE_URL}/${endpoint}`;

  const options: ApiRequestOptions = {
    method,

    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(url, { credentials: "include", ...options });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

export const get = <T>(
  endpoint: string,
  headers: Record<string, string> = {}
): Promise<T> => apiRequest<T>(endpoint, "GET", undefined, headers);

export const post = <T>(
  endpoint: string,
  body: any,
  headers: Record<string, string> = {}
): Promise<T> => apiRequest<T>(endpoint, "POST", body, headers);

export const del = <T>(
  endpoint: string,

  headers: Record<string, string> = {}
): Promise<T> => apiRequest<T>(endpoint, "DELETE", undefined, headers);
