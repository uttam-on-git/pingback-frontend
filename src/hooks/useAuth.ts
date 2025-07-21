import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface UserPayload {
  id: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // first check for token
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedUser = jwtDecode<UserPayload>(token);
      setUser(decodedUser);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return { user, logout };
};
