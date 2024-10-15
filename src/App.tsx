// There are no issues for you to fix in this file
// Please ignore this file
import React from 'react';
import { Container, createTheme } from '@mui/material';
import CurrencyTable from './components/CurrentyTable';
import { ThemeProvider as ThemeProviderMui } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: 'rgb(247, 56, 39)' },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Courier New',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: '0.55px',
        },
        h1: {
          fontSize: '22px',
          lineHeight: '36px',
        },
        body2: {
          fontSize: '13px',
          lineHeight: '20px',
          fontFamily: 'Courier New, Monospace, serif',
        },
      },
    },
  },
});
function App() {
  return (
    <ThemeProviderMui theme={theme}>
      <Container maxWidth='md' sx={{ p: 5 }}>
        <CurrencyTable />
      </Container>
    </ThemeProviderMui>
  );
}

export default App;
