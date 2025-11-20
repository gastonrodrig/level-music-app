import { Snackbar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { closeSnackbar } from '../../../store';

export const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message } = useSelector((state) => state.ui.snackbar);

  const handleClose = () => {
    dispatch(closeSnackbar()); 
  };

  return (
    <Snackbar
      visible={open}
      onDismiss={handleClose}
      duration={5000} 
      action={{
        label: 'Cerrar',
        onPress: handleClose, 
      }}
    >
      {message}
    </Snackbar>
  );
};
