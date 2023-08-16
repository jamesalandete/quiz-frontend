import * as axios from './../helpers/axios';

export async function validateToken() {
  const token = window.localStorage.getItem('userProfile');

  if (!token) return false;

  const parsedToken  = JSON.parse(token)[0]?.token;
  const tokenValue = parsedToken?.[0]?.token;

  if (!tokenValue) return false;
  debugger
  const data = await axios.get(`login/Validate/${tokenValue}`);
  console.log(data);
  return true
}
