import React from "react";
import "../styles/Header.css";

const ButtonHeader = () => {
    if(localStorage.getItem('token')){
        <div>
        <a href="/login" className="btn-bar-login">Cerrar Sesión</a>
        </div>
      }else{
        <div>
        <a href="/register" className="btn-bar">Crear Cuenta</a>
        <a href="/login" className="btn-bar-login">Iniciar Sesión</a>
      </div>
      }
}

export default ButtonHeader;