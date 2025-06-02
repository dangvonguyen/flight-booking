import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/common';
import { authService } from '../services/authService';

interface ApiUser {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
}

const mapApiUserToUser = (apiUser: ApiUser): User => {
  return {
    id: apiUser.id,
    email: apiUser.email,
    firstName: '', // API không trả về first_name
    lastName: '', // API không trả về last_name
    role: apiUser.is_superuser ? 'admin' : 'customer'
  };
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authService.getCurrentUser();
        if (response) {
          setUser(mapApiUserToUser(response));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      if (response) {
        const { access_token, user: userData } = response;
        localStorage.setItem('token', access_token);
        setUser(mapApiUserToUser(userData));
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return { user, loading, login, logout };
}; 