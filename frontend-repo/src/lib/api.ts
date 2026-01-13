import { ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const DEFAULT_TIMEOUT = 10000;

async function fetchWithTimeout(url: string, timeout: number = DEFAULT_TIMEOUT): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchPoints(bbox?: [number, number, number, number]): Promise<ApiResponse> {
  let url = `${API_BASE_URL}/api/points`;

  if (bbox) {
    const [minLon, minLat, maxLon, maxLat] = bbox;
    url += `?bbox=${minLon},${minLat},${maxLon},${maxLat}`;
  }

  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
