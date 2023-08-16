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

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSendAnswer = (score: number) => {
    setScore(score)
    setAnswerSend(true);
    setShowModal(true)
  };

  const closeModal = () => {
    setShowModal(false)
  }

  const progress = answerSend
    ? 100
    : ((currentStep + 1) / (steps ? steps.length : 1)) * 100;

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const fetchedSteps = await serviceQuestion.questions();
        setSteps(fetchedSteps);
      } catch (error) {
        console.error('Error fetching steps:', error);
      }
    };
    fetchSteps();
  }, []);

  return (
    <>
      <Header />
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
