import React, { useState, useEffect } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../assets/Images/logo.svg";
import routes from "../../router/routes"; // Импортируем routes

const Header = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="nav-center">
            <ul className="nav-links">
              {routes.map(
                (
                  link,
                  index // Используем массив routes
                ) => (
                  <li key={index} className="nav-item">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      {link.content}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="nav-right">
            <div>
              <a href="tel:+998917777931" className="phone-number">
                <i className="fas fa-phone-alt mr-2 text-indigo-400"></i>
                +998 (91) 777-79-31
              </a>
            </div>

            <div
              className={`burger ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
        <div className="mobile-menu-content">
          {routes.map(
            (
              link,
              index // Используем массив routes и здесь
            ) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `mobile-link ${isActive ? "active" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.content}
              </NavLink>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
