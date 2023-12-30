import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/estilos.css';
import '../assets/css/estilos-responsive.css';
import logo from '../assets/img/logo-essalud-blanco.svg';
import { jwtDecode } from "jwt-decode";

export function AdminNavbar() {
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
        
        const token = localStorage.getItem('access');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsuario(decodedToken.username);
        }
    }, []);

    const handleLogout = () => {
        // Lógica para cerrar sesión, por ejemplo, eliminar el token y redirigir al inicio de sesión
        localStorage.removeItem('access');
        localStorage.removeItem('expirationTime');
        // Redirige al inicio de sesión u otra página
        toast.success("Sesión terminada");
        navigate('/login');
    };

    return (
        <header>
            <Link to="/panel">
                <img src={logo} className="logo-principal" alt="Logo" />
            </Link>
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
    );
};