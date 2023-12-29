import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { toast } from "react-hot-toast";
import '../assets/css/estilos.css';
import '../assets/css/estilos-responsive.css';  // Asegúrate de importar tus estilos CSS
import logo from '../assets/img/logo-essalud.svg';
import { jwtDecode } from "jwt-decode";

export function AuthComponent(){
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
      });
    
      const [error, setError] = useState(null);
      const navigate = useNavigate();
    
      const handleLogin = async () => {
        try {
          const response = await login(credentials);
          const accessToken = response.data.access;
          const expirationTime = jwtDecode(accessToken).exp;
          localStorage.setItem("access", accessToken);
          localStorage.setItem("expirationTime", expirationTime);
          console.log(accessToken);
          navigate("/panel");
        } catch (error) {
          setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
          console.log("Credenciales incorrectas. Por favor, inténtalo de nuevo.")
          toast.error("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        }
      }
    
      const handleChange = (e) => {
        setCredentials({
          ...credentials,
          [e.target.name]: e.target.value,
        });
      }
    return (
        <section className="login">
        <div className="section-flex">
            <article className="w-60">
            <div className="t-l descripcion">
                <h1 className="titulo1">Plataforma de análisis de datos</h1>
                <p>
                Monitoreo de las 234 Sistemas de Essalud
                <br />
                "Sistema de análisis de datos eficiente y preciso, optimizando decisiones estratégicas con insights relevantes para el éxito empresarial."
                </p>
            </div>
            </article>

            <article className="w-40">
            <div className="t-c">
                <form name="login" className="cuadro-blanco-2">
                <img src={logo} alt="Essalud Logo" />
                <label>Usuario</label>
                <input
                    name="username"
                    type="text"
                    className="input"
                    value={credentials.username}
                    onChange={handleChange}
                    size="20"
                />
                <label>Contraseña</label>
                <input
                    name="password"
                    type="password"
                    className="input"
                    value={credentials.password}
                    onChange={handleChange}
                    size="20"
                />
                <input
                    value="Entrar"
                    type="button"
                    className="estilo1"
                    onClick={handleLogin}
                />
                </form>
            </div>
            </article>
        </div>
        </section>
    );
};
