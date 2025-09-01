import { LoginRequest, RegisterRequest, JwtResponse } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        try {
          const errorData = await response.json();
          if (errorData && typeof errorData === 'object' && 'error' in errorData) {
            errorMessage = errorData.error;
          }
        } catch (parseError) {
          try {
            const textError = await response.text();
            if (textError) {
              errorMessage = textError;
            }
          } catch (textError) {
          }
        }
        
        throw new Error(errorMessage);
      }

      try {
        return await response.json();
      } catch (parseError) {
        const textResponse = await response.text();
        return { message: textResponse } as T;
      }
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async login(credentials: LoginRequest): Promise<JwtResponse> {
    return this.request<JwtResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<{ message: string }> {
    return this.request<{ message: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async refreshToken(refreshToken: string): Promise<JwtResponse> {
    return this.request<JwtResponse>('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }
  
  async getProfile(): Promise<any> {
    return this.request('/api/user/profile');
  }
}

export const apiService = new ApiService();
