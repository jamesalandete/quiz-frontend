export interface IQuestions {
  id: number,
  question_text: string
  answers: IAnswers[]
}

export interface IAnswers {
  id: number,
  question_id: number,
  answer_text: string
}

export interface IAnswerUser {
  user_id: number,
  question_id: number,
  answer_id: number
}