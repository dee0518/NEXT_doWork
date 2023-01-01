import { useContext } from 'react';
import { SnackbarContext } from 'components/Common/SnackBar';

// Custom hook to trigger the snackbar on function components
const useSnackbar = () => {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);

  const open = (text: string) => {
    const style = {};
    console.log(openSnackbar);
    openSnackbar(text, style);
  };

  // Returns methods in hooks array way
  return [open, closeSnackbar];
};

export default useSnackbar;
