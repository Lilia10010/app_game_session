/**
 * Cliente de Fetch nativo para comunicação com o backend Rust
 */
const BASE_URL = 'http://localhost:3000';

export async function fetchClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Erro na requisição: ${response.status}`);
  }

  // Algumas rotas podem retornar 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
