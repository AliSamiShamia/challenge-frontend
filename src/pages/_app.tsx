import { createTheme, ThemeProvider } from '@mui/material';
import { SessionProvider } from "next-auth/react"
import CssBaseline from '@mui/material/CssBaseline';
import AuthMiddleware from '../../@core/auth';
import './../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextComponentType } from 'next';

const customTheme = createTheme({
  typography: {
    "fontFamily": `"Apis-Regular", "Helvetica", "Arial", sans-serif`,
  },
  
  palette: {
    secondary: {
      main: '#1BACE4'//#0A2C58
    },
    primary: {
      main: '#0A2C58'
    },
  }
});

//Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean } // add auth type
}

const App = ({ Component, pageProps }: CustomAppProps) => {
  return <>
    <ThemeProvider theme={customTheme}>
      <SessionProvider session={pageProps.session}>
        <CssBaseline />
        {Component.auth ? (
          <AuthMiddleware>
            <Component {...pageProps} />
          </AuthMiddleware>
        ) : (<Component {...pageProps} />
        )}
      </SessionProvider>
    </ThemeProvider>
  </>
}
export default App;