import { useSnackbar } from 'notistack';

const useSnackbarToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (
    message: string,
    variant: 'default' | 'error' | 'success' | 'warning' | 'info'
  ) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 3000,
    });
  };

  return { showSnackbar };
};

export default useSnackbarToast;
