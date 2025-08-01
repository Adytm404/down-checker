import { CheckStatus } from '../types';
import type { CheckResult } from '../types';

interface ApiResponse {
  status: 'up' | 'down';
  message: string;
  domain: string;
  ip_address: string;
  response_time_ms: number | null;
  location: string;
}

export const checkDomain = async (domain: string): Promise<CheckResult> => {
  const apiUrl = `https://down-api.webkulo.com/check?domain=${encodeURIComponent(domain)}`;

  try {
    const response = await fetch(apiUrl, {
        headers: {
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
      let errorMessage = `API Error: ${response.status} ${response.statusText}. Please check the domain and try again.`;
      try {
        const errorData = await response.json();
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        // Body is not JSON or is empty, use the default error message
      }
      throw new Error(errorMessage);
    }

    const data: ApiResponse = await response.json();

    const status = data.status === 'up' ? CheckStatus.UP : CheckStatus.DOWN;

    const result: CheckResult = {
      status: status,
      domain: data.domain,
      ipAddress: data.ip_address || 'N/A',
      responseTime: data.response_time_ms ?? undefined,
      location: data.location || 'Unknown',
      timestamp: new Date().toISOString(),
      error: status === CheckStatus.DOWN ? data.message : undefined,
    };

    return result;
  } catch (error) {
    console.error('Error checking domain:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('A network error occurred. Please check your connection.');
  }
};
