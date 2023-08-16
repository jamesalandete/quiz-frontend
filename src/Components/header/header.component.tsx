import React, { useState, useEffect } from 'react';
import './header.component.css'

const Header = () => {
  const [userName, setUserName] = useState('');
  const [remainingTime, setRemainingTime] = useState(5 * 60);

  useEffect(() => {
    // Obtener el nombre de usuario de localStorage u otra fuente
    let info: any = localStorage?.getItem('userProfile')
    info = JSON.parse(info);
    if (info) {
      setUserName(info.user.name);
    }

      // Actualizar el tiempo restante cada segundo
      const intervalId = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(intervalId);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const formattedTime = `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
    return formattedTime;
  };

  const handleLogout = () => {
    localStorage?.removeItem('userProfile')
    localStorage?.removeItem('userAnswerValidate')
    localStorage?.removeItem('answerUser')
    window.location.replace('/login');
  };

  return (
    <header className='header'>
      <div className='user-info'>
        <p>Bienvenido, {userName}</p>
      </div>
      <div className='current-time'>
        {formatTime(remainingTime)}
      </div>
      <button className='logout-button' onClick={handleLogout}>Cerrar sesión</button>
    </header>
  );
};

export default Header;
