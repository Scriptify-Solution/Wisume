import { getLinkedInUrl } from '../services/socialAuth';
import { FaLinkedin } from 'react-icons/fa';

const LinkedInLogin = () => {
  const handleClick = () => {
    window.location.href = getLinkedInUrl();
  };

  return (
    <button 
      onClick={handleClick}
      className="flex items-center justify-center w-full py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-700/30 transition-colors"
    >
      <FaLinkedin className="w-6 h-6 mr-2 text-[#0A66C2]" />
      <span className="text-white">Continue with LinkedIn</span>
    </button>
  );
};

export default LinkedInLogin; 