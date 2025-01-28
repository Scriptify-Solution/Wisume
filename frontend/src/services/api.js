export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const api = {
  signup: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Signup failed');
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  verifyOtp: async (otp, email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp, email }),
      });
      return await response.json();
    } catch (error) {
      throw new Error('OTP verification failed');
    }
  },

  resetPassword: async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Password reset failed');
    }
  },

  googleAuth: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Google authentication failed');
    }
  },

  linkedinAuth: async (code) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/linkedin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      return await response.json();
    } catch (error) {
      throw new Error('LinkedIn authentication failed');
    }
  },
}; 