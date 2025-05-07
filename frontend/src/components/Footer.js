import React, { useState, useEffect } from 'react';
import Weather from './Weather';

const Footer = () => {
  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setFechaHora(new Date());
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(timer); // Limpieza del temporizador
  }, []);

  return (
 
    <footer style={{ textAlign: 'center', padding: '1rem' }}>
      <p>{fechaHora.toLocaleString('es-ES')}</p>
      <Weather />
      <p>© 2025 Escuela de Aviación Flying</p>


    </footer>
  );
};

export default Footer;
