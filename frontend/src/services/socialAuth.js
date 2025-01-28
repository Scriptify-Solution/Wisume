const LINKEDIN_CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_LINKEDIN_REDIRECT_URI;
import { toast } from 'react-toastify';
import { API_BASE_URL } from './api';

export const getLinkedInUrl = () => {
  if (!LINKEDIN_CLIENT_ID) {
    console.error('LinkedIn Client ID is not configured');
    return '#';
  }

  const encodedRedirectUri = encodeURIComponent(REDIRECT_URI);
  const state = window.crypto.getRandomValues(new Uint8Array(16))
    .reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
  const scope = encodeURIComponent('r_liteprofile r_emailaddress');
  
  return `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code` +
    `&client_id=${LINKEDIN_CLIENT_ID}` +
    `&redirect_uri=${encodedRedirectUri}` +
    `&state=${state}` +
    `&scope=${scope}`;
};

export const handleLinkedInSuccess = async (code, login, navigate) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/linkedin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    
    if (data.status === 1) {
      login(data.data, data.token);
      toast.success('Successfully logged in with LinkedIn!');
      navigate('/');
    } else {
      toast.error(data.message || 'LinkedIn login failed');
    }
  } catch (error) {
    console.error('LinkedIn login error:', error);
    toast.error('LinkedIn login failed. Please try again.');
  }
};

export const handleGoogleSuccess = async (response, login, navigate) => {
  try {
    const res = await fetch(API_BASE_URL + '/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: response.credential }),
    });
    const data = await res.json();
    
    if (data.status === 1) {
      login(data.data, data.token);
      toast.success('Successfully logged in with Google!');
      navigate('/');
    } else {
      toast.error(data.message || 'Google login failed');
    }
  } catch (error) {
    console.error('Google login error:', error);
    toast.error('Google login failed. Please try again.');
  }
}; 