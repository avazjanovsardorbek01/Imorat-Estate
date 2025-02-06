import React from "react";
import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import routes from "../../router/routes";

const Index = () => {
  const navigate = useNavigate();
  console.log(navigate);

  return (
    <nav className="navbar">
      <div className="logo">
        <span>logo</span>ipsum
      </div>
      <ul className="nav-links">
        {routes.map((item, index) => (
          <li key={index}>
            <NavLink className={item.active} to={item.path}>
              {item.content}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="nav-buttons">
        <div className="profile"></div>
        <button className="add-listing">Добавить список</button>
      </div>
    </nav>
  );
};

export default Index;
