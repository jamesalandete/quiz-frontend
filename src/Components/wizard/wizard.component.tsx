import React, { useEffect, useState } from 'react';
import Step from '../step/step.component';
import './wizard.component.css';
import * as serviceQuestion from '../../services/question.service';
import { IQuestions } from '../../interfaces/questions.interface';
import Header from '../header/header.component';
import Modal from '../../utils/modal/modal.component';

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<IQuestions[]>([]);
  const [answerSend, setAnswerSend] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [score, setScore] = useState(0)

  // -----> Function contadora hacia adelante
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  // -----> Function contadora hacia atras
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  // -----> Function recibe si termino el quiz
  const handleSendAnswer = (score: number) => {
    setScore(score)
    setAnswerSend(true);
    setShowModal(true)
  };
  // -----> Recibe si se dio cerrar modal y cambia estado
  const closeModal = () => {
    setShowModal(false)
  }
  // -----> Contador pasos
  const progress = answerSend
    ? 100
    : ((currentStep + 1) / (steps ? steps.length : 1)) * 100;

  useEffect(() => {
    // -----> Consultar informacion para saber si el usuario ya termino quiz
    let infoUser: any = localStorage!.getItem('userProfile')
    if(infoUser) infoUser = JSON.parse(infoUser)
    const userScore = async () => {
      try {
        const dataScore = await serviceQuestion.scoreUser(infoUser?.user?.id);
        if(dataScore.length > 0){
          localStorage.setItem('answerUser', JSON.stringify(dataScore?.UserAnswwer))
          localStorage.setItem('userAnswerValidate', JSON.stringify(dataScore?.score))
        }
      } catch (error) {
        console.error('Error data score:', error);
      }
    };
    // -----> Obtener todas las question
    const fetchSteps = async () => {
      try {
        const fetchedSteps = await serviceQuestion.questions();
        setSteps(fetchedSteps);
      } catch (error) {
        console.error('Error fetching steps:', error);
      }
    };
    userScore();
    fetchSteps();
  }, []);

  return (
    <>
      <Header answerSend={handleSendAnswer} />
      <div className='wizard-container'>
        <div className='progress-bar-container'>
          <div className='progress-bar'>
            <div className='progress' style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <Step
          question={steps ? steps[currentStep] : undefined}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
          isFirstStep={currentStep === 0}
          answerSend={handleSendAnswer}
          isLastStep={currentStep === (steps ? steps.length - 1 : 1)}
        />
      </div>
      <Modal showModal={showModal} closeModal={closeModal}>
        <div className="score">
          Puntaje: {score}
        </div>
        { score < 100 &&
          <div className='score-description'>
          <p> Cierre esta ventana y verifique las respuestas erradas </p>
          </div>
        }
      </Modal>
    </>
  );
};

export default Wizard;
