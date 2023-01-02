import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import { lightTheme, darkTheme } from 'styles/theme';

function MyApp({ Component, pageProps: { session, ...rest } }: AppProps) {
  const [storage, setStorage] = useState<Storage | null>(null);
  const isLightTheme =
    storage && storage.getItem('doWork_theme') ? JSON.parse(storage.getItem('doWork_theme') as string) : true;

  useEffect(() => {
    setStorage(window.localStorage);
  }, []);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Component {...rest} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
