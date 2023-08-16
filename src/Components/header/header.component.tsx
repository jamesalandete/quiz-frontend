import React, { useState, useEffect } from 'react';
import './header.component.css'
import * as serviceQuestion from '../../services/question.service';

type StepProps = {
  answerSend: any;
};


const Header = ({answerSend} : StepProps) => {
  const [userName, setUserName] = useState('');
  const [remainingTime, setRemainingTime] = useState(30);
  const [userInfo, setUserInfo] = useState(undefined)
  const [sendQuiz, setSendQuiz] = useState(false)

  useEffect(() => {
    // Obtener el nombre de usuario de localStorage u otra fuente
    let info: any = localStorage?.getItem('userProfile')
    info = JSON.parse(info);
    if (info) {
      setUserInfo(info.user)
      setUserName(info.user.name);
    }
    let score: any = localStorage?.getItem('userAnswerValidate')
    if(score){
      setSendQuiz(true)
    }

    // -----> Actualizar el tiempo restante cada segundo
    const intervalId = setInterval(() => {
      if(!sendQuiz){
        setRemainingTime(prevTime => prevTime - 1);
      }else{
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const submitQuiz = async () => {
    try {
      const user: any = userInfo
      const validate = await serviceQuestion.validateAnswers(user?.id)
      setSendQuiz(true)
      window.location.reload();
      window.localStorage.setItem('userAnswerValidate', JSON.stringify(validate))
    } catch(error){
    }
  };

  // -----> convertidor de tiempo a contador de cuenta regresiva de quiz
  const formatTime = (seconds: number) => {
    if(!sendQuiz) {
      if(remainingTime == 0){
        // ----->Envia culmino el quiz
        submitQuiz();
      }
      const minutes = Math.floor(seconds / 60);
      const formattedTime = `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
      return formattedTime;
    }
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
