import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import { lightTheme, darkTheme } from 'styles/theme';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isLightTheme, setIsLightTheme] = useState<boolean>(true);

  const changeTheme = () => {
    setIsLightTheme(prevTheme => !prevTheme);
  };
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
          <GlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
