import React, { useState, useEffect } from "react";
import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import routes from "../../router/routes";

const Index = () => {
  const navigate = useNavigate();
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
        <div className="logo">
          <span>Real</span>Estate
        </div>

        {/* Desktop Menu */}
        <ul className="nav-links">
          {routes.map((item, index) => (
            <li key={index}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${item.active} active` : item.active
                }
                to={item.path}
              >
                {item.content}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-buttons">
          <div className="profile">
            <span className="notification">2</span>
          </div>
          <button className="add-listing">
            <span>Добавить список</span>
          </button>
          <div
            className={`burger ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
        <div className="mobile-menu-content">
          {routes.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive ? `mobile-link active` : "mobile-link"
              }
              to={item.path}
              onClick={() => setIsOpen(false)}
            >
              {item.content}
            </NavLink>
          ))}
          <button className="mobile-add-listing">Добавить список</button>
        </div>
      </div>
    </>
  );
};

export default Index;
