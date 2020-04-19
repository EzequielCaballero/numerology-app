import React from "react";
//CSS
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="nav-custom">
      <input type="checkbox" id="nav-custom-check" />
      <div className="nav-custom-header">
        <div className="nav-custom-title">
          <a href="/home" rel="noopener noreferrer">
            Inicio
          </a>
        </div>
      </div>
      <div className="nav-custom-btn">
        <label htmlFor="nav-custom-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="nav-custom-links">
        <a href="/calculator" rel="noopener noreferrer">
          Calculadora
        </a>
        <a href="/about" rel="noopener noreferrer">
          ¿Cómo funciona?
        </a>
        <a href="/contact" rel="noopener noreferrer">
          Contacto
        </a>
      </div>
    </div>
  );
};

export default Navbar;
