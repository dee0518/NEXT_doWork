import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from 'styles/theme';
import GlobalStyles from 'styles/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLightTheme, setIsLightTheme] = useState<boolean>(true);

  const changeTheme = () => {
    setIsLightTheme(prevTheme => !prevTheme);
  };
  return (
    <Provider store={store}>
      <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
