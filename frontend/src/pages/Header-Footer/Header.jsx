import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/images/Wisume-Logo.png";
import ic_login from "../../assets/icons/ic_login.svg";
import ic_logout from "../../assets/icons/ic_logout.svg";
import { Modal, ModalTrigger } from "../../components/ui/animated-modal";

const Header = () => {
  const headerList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Templates",
      path: "/templates",
    },
    {
      name: "ATS Score Checker",
      path: "/ats-checker",
    },
    {
      name: "My Resumes",
      path: "/landingpage",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const { user, logout } = useAuth();

  const login = () => {
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Common class names for links
  const linkClass =
    "text-gray-300 hover:text-white transition-colors font-bold md:text-[14px] lg:text-[18px]";

  return (
    <>
      <header className="bg-[#0F183E] py-4 px-6 relative">
        <nav className="container mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/">
            <div className="flex items-center gap-2">
              {/* <div className="w-8 h-8 bg-orange-500 rounded-full"></div> */}
              <img src={Logo} alt="" />
              {/* <span className="text-white text-xl font-semibold">
                Wisume Pro
              </span> */}
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <ul className="flex space-x-8 items-center m-0">
              {headerList?.map((item, index) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={linkClass}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <Modal>
              <ModalTrigger
                className="bg-secondary dark:bg-white dark:text-black text-white flex justify-center group/modal-btn rounded-md"
                onClick={() => {
                  if (user) {
                    logout();
                  } else {
                    login();
                  }
                }}
              >
                <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                  {user ? "Logout" : "Login"}
                </span>
                <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                  <img
                    src={user ? ic_logout : ic_login}
                    alt="Login"
                    width={20}
                  />
                </div>
              </ModalTrigger>
            </Modal>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu (visible when isMenuOpen is true) */}
        {isMenuOpen && (
          <div className="bg-[#0a0f2c] text-white p-4 absolute top-[50px] w-full left-0 z-50 md:hidden">
            <div className="flex flex-col items-center gap-4">
              {headerList?.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
