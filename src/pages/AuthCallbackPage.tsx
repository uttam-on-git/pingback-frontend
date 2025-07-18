import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AuthCallbackPage = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // store the token in localStorage
      localStorage.setItem('auth-token', token);
      onAuthSuccess();
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate, onAuthSuccess]);
  return <div className="text-white">Loading...</div>;
};

export default AuthCallbackPage;
