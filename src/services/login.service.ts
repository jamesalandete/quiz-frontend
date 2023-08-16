import { ILogin, IRegister } from '../interfaces/login.interface';
import * as axios from './../helpers/axios';

export async function login(form: ILogin) {
  return await axios.post(`auth/login`, form);
};

export async function register(form: IRegister) {
  return await axios.post(`auth/register`, form);
};

export async function validateAuth() {
  return await axios.get(`validate`);
}