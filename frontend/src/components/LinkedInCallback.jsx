import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const LinkedInCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = new URLSearchParams(location.search).get('code');
        if (code) {
          const data = await api.linkedinAuth(code);
          
          if (data.status === 1) {
            login(data.data, data.token);
            toast.success('Successfully logged in with LinkedIn!');
            navigate('/');
          } else {
            toast.error(data.message || 'LinkedIn login failed');
            navigate('/login');
          }
        } else {
          toast.error('No authorization code found');
          navigate('/login');
        }
      } catch (error) {
        console.error('LinkedIn callback error:', error);
        toast.error('Authentication failed. Please try again.');
        navigate('/login');
      }
    };

    handleCallback();
  }, [location, navigate, login]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f183e]">
      <div className="text-white text-xl">Processing LinkedIn login...</div>
    </div>
  );
};

export default LinkedInCallback; 