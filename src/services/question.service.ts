import { IAnswerUser } from '../interfaces/questions.interface';
import * as axios from './../helpers/axios';

export async function questions() {
  return await axios.get(`private/questions`);
}

export async function answerUser(form: IAnswerUser) {
  return await axios.post(`private/user-answers`, form);
}

export async function validateAnswers(user_id: number) {
  return await axios.post(`private/user-answers/score`, {user_id});
}
