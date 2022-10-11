import { createTheme } from '@mui/material/styles';

const globalTheme = createTheme({
  palette: {
    primary: {
      main: "#5A49E3"
    },
    secondary: {
      main: "#009688"
    },
    background: {
      main: "#EFEFEF"
    }
  },
  typography: {
    htmlFontSize: 10,
  },
});

export default globalTheme;
