import { createTheme } from '@mui/material/styles';

const globalTheme = createTheme({
  palette: {
    primary: {
      main: "#009688"
    },
    secondary: {
      main: "#ff6977"
    }
  },
  typography: {
    htmlFontSize: 10,
  },
});

export default globalTheme;
