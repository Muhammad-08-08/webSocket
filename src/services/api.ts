import { User, CreateNotificationRequest, NotificationResponse } from '../types';

const BASE_URL = '/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    const response = await this.request<{
      status: string;
      meta: {
        list: any[];
        elements: number;
        pages: number;
      };
    }>('/user/getAllUsers');
    
    // Extract users from the nested response structure and map to our User interface
    return response.meta.list.map(user => ({
      id: user.id.toString(),
      name: `${user.firstname || ''} ${user.lastname || ''}`.trim(),
      email: user.email,
      createdAt: user.createdAt
    }));
  }

  async createNotification(data: CreateNotificationRequest): Promise<NotificationResponse> {
    return this.request<NotificationResponse>('/notifications/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async setFirebaseToken(token: string, userId: string): Promise<any> {
    const params = new URLSearchParams({
      token,
      userId,
    });

    return this.request('/notification/setFirebaseToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
  }
}

export const apiService = new ApiService();