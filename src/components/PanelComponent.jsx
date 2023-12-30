import React, { useEffect, useState } from 'react';
import { getGroups } from '../api/group';
import logo from '../assets/img/logo-essalud-blanco.svg';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import '../assets/css/estilos.css';
import '../assets/css/estilos-responsive.css';

export function PanelComponent() {
  const [grupos, setGrupos] = useState([]);
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [grupoExpandido, setGrupoExpandido] = useState(null);
  const [usuario, setUsuario] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  
        if (currentTime > expirationTime) {
            toast('Sesión expirada', {
                icon: '👏',
              });
          // El token ha expirado, cierra sesión
          handleLogout();
        }
      }
    const fetchGroups = async () => {
      try {
        const response = await getGroups();
        setGrupos(response.data);
      } catch (error) {
        console.error('Error al obtener los grupos:', error);
      }
    };

    fetchGroups();
    const token = localStorage.getItem('access');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsuario(decodedToken.username);
    }
  }, []);

  const toggleGrupo = (grupoId) => {
    setGrupoExpandido(grupoId === grupoExpandido ? null : grupoId);
    setReporteSeleccionado(null);
  };
  const handleLogout = () => {
    // Lógica para cerrar sesión, por ejemplo, eliminar el token y redirigir al inicio de sesión
    localStorage.removeItem('access');
    localStorage.removeItem('expirationTime');
    // Redirige al inicio de sesión u otra página
    toast.success("Sesión terminada");
    navigate("/login");
  };

  return (
    <div>
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;1,300&display=swap" rel="stylesheet" />
        <title>Essalud - Plataforma de analítica de datos</title>
      </head>
      <body>
        <header>
          <img src={logo} className="logo-principal" />
          <div className="login-user">
            <span>{usuario}</span>
            <div className="btn_opciones">
            <ul>
                        {/* Agrega enlaces fuera del menú de cerrar sesión */}
                        <li>
                            <Link to="/panel">Panel</Link>
                        </li>
                        <li>
                            <Link to="/admin/dashboard">Grupos y reportes</Link>
                        </li>
                        <li>
                            <Link to="/admin/grupos">Agregar grupo</Link>
                        </li>
                        <li>
                            <Link to="/admin/reportes">Agregar reporte</Link>
                        </li>
                        <li>
                            <Link to="/admin/usuarios">Usuarios</Link>
                        </li>
                        {/* Menú de cerrar sesión */}
                        <li onClick={handleLogout}>Cerrar Sesión</li>
                    </ul>
            </div>
          </div>
        </header>
        <section className="contenedor-body">
          <nav>
            <ul>
              {grupos.map((grupo) => (
                <li key={grupo.id} className={grupoExpandido === grupo.id ? "active" : ""}>
                  <span onClick={() => toggleGrupo(grupo.id)}>{grupo.nombre}</span>
                  <ul>
                    {grupoExpandido === grupo.id &&
                      grupo.reportes.map((reporte) => (
                        <li
                          key={reporte.id}
                          onClick={() => setReporteSeleccionado(reporte.link)}
                          className={reporte.link === reporteSeleccionado ? "active" : ""}
                        >
                          {reporte.nombre}
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
          <section className="contenedor-principal">
            <div className="t-c presentacion-cont">
              <iframe src={reporteSeleccionado || 'https://app.powerbi.com/view?r=eyJrIjoiZDhkYjJiMDktZGQ5YS00NDFhLTlhNzctMzlkNjJlMDY1NGE3IiwidCI6IjM0ZjMyNDE5LTFjMDUtNDc1Ni04OTZlLTQ1ZDYzMzcyNjU5YiIsImMiOjR9'} className="presentacion"></iframe>
            </div>
          </section>
        </section>
        <footer>
          <p>
            Consultas al 350-0800 Opción 2 para Lima y Callao. Provincias a EsSalud en Línea de la Red de su región{' '}
            <a href="http://www.essalud.gob.pe/prensa-e-imagen/contactenos/" target="_blank">
              (CLICK AQUI)
            </a>
          </p>
        </footer>
      </body>
    </div>
  );
}
