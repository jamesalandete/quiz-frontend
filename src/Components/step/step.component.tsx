import React, { useEffect, useState } from 'react';
import { IAnswerUser, IQuestions } from '../../interfaces/questions.interface';
import './step.component.css';
import { answerUser, validateAnswers } from '../../services/question.service';
import * as toast from './../../helpers/Toast'

type StepProps = {
  question: IQuestions | undefined;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  answerSend: any;
};

const Step: React.FC<StepProps> = ({
  question,
  onNext,
  onPrev,
  isFirstStep,
  isLastStep,
  answerSend
}) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userId, setUserId] = useState(0);

  // -----> Optiene opcion seleccionada
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(Number(event.target.value));
  };

  // ----->Envia culmino el quiz
  const handleSubmit = async () => {
    try {
      const resp = await saveAnswer()
      if(!resp) return
      const validate = await validateAnswers(userId)
      setAnswered(true)
      answerSend(validate.score)
      window.localStorage.setItem('userAnswerValidate', JSON.stringify(validate))
    } catch(error){
      toast.error('Se presento un error al enviar')
    }
  };

  // -----> Guarda informacion al presionar siguiente y enviar contador al padre component
  const handleNext = async () => {
    try {
      const resp = await saveAnswer()
      if(!resp) return
      onNext(); // Avanzar a la siguiente pregunta
      setSelectedOption(0); // Reiniciar selección de opción
    } catch (error) {
      console.log(error);
      toast.error('Se presento un error al actualizar')
    }
  };
  // -----> Metodo para guardar cada opcion
  const saveAnswer = async () => {
    if(answered) return true
    let info: any = localStorage?.getItem('userProfile')
    if(info) info = JSON.parse(info)
    else { toast.error('No se encontro session activa'); return;}

    setUserId(info?.user?.id)

    let answer: any = localStorage?.getItem('answerUser')
    if(answer) answer = JSON.parse(answer)
    else answer = []

    const form: IAnswerUser = {user_id: info?.user?.id, question_id: question!.id, answer_id: selectedOption}
    try {
      const resp = await answerUser(form)
      if(!resp) return false;
      answer = answer.filter((sel: any) => sel?.id != resp.id)
      // Agregar la nueva respuesta a la lista actualizada
      answer.push(resp);
      localStorage.setItem('answerUser', JSON.stringify(answer))
      return true
    } catch (error) {
      console.log(error);
      toast.error('Se presento un error al actualizar')
    }
  }
  // -----> Funcion para mostrar las correctas
  const validateAnswer = (option: number) => {
    let validate: any = localStorage?.getItem('userAnswerValidate')
    let  correct = 0
    if (validate) {
      validate = JSON.parse(validate);
      const respCorrect = validate.answerCorrect.find((sel: any) => sel?.question_id === question?.id && sel.correct);
      correct = respCorrect.id
    }
    return correct == option
  }

  useEffect(()=> {
    // -----> Detesta si existe un score ya de este quiz
    let score: any = localStorage?.getItem('userAnswerValidate')
    if(score != undefined && score != 'undefined'){
      score = JSON.parse(score)
      setAnswered(true)
      answerSend(score.score)
    }
  }, [!answered])

  useEffect(() => {
    let info: any = localStorage?.getItem('answerUser')
    if(info != undefined && info != 'undefined'){
      info = JSON.parse(info);
      const resp = info.find((sel: any) => sel?.question_id === question?.id);
      if (resp) {
        setSelectedOption(resp.answer_id);
      }
    }
  }, [question, selectedOption == 0])

  return (
    <div className='step-page'>
      <div className='step-container'>
        <h2>{question?.question_text}</h2>
        <form>
          {question?.answers.map((option, index) => (
            <label key={index} className={`${
              answered
                ? validateAnswer(option.id)
                  ? 'correct-option'
                  : ''
                : ''
            } ${selectedOption === option.id ? 'selected-option' : ''}`} >
              <input
                type='radio'
                name='option'
                value={option.id}
                checked={selectedOption === option.id}
                onChange={handleOptionChange}
                disabled={answered}
              />
              {option?.answer_text}
            </label>
          ))}
        </form>
        <div className='button-container'>
          <div className='btn-prev'>
            {!isFirstStep && <button onClick={onPrev}>Anterior</button>}
          </div>
          <div className='btn-next'>
            {!isLastStep && (
              <button onClick={handleNext} >
                Siguiente
              </button>
            )}
            {isLastStep && !isFirstStep && (
              <button onClick={handleSubmit} disabled={answered}>Enviar</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step;
