import axios from 'axios';
import * as Toast from './../helpers/Toast';

const configureInterceptor = () => {
  let info: any = localStorage?.getItem('userProfile');
  let token: string = ''
  if(info) token = JSON.parse(info)?.token
  axios.interceptors.request.use(
    (config: any) => {
      // Agregar el header personalizado a la configuración de la solicitud
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
};

export default configureInterceptor;

