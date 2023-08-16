import { toast } from 'react-toastify';

export function success(Message : string){
  toast.success(Message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
}
export function error(Message : string){
  toast.error(Message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
}
export function warning(Message : string){
  toast.warning(Message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
}
export function info(Message : string){
  toast.info(Message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
}
