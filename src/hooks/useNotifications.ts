import { toast } from 'react-toastify';

export const useNotifications = () => {
  const success = (message: string) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      closeButton: true,
    });
  };

  const error = (message: string) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      closeButton: true,
    });
  };

  const warning = (message: string) => {
    toast.warning(message, {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      closeButton: true,
    });
  };

  const info = (message: string) => {
    toast.info(message, {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      closeButton: true,
    });
  };

  return {
    success,
    error,
    warning,
    info,
  };
};
