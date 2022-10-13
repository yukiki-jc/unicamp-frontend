import { createTheme } from '@mui/material/styles';
import { InterFont } from './utils/commonData';

const globalTheme = createTheme({
  palette: {
    primary: {
      main: "#5A49E3",
      light: "#3e339e",
    },
    secondary: {
      main: "#b27c66"
    },
    background: {
      main: "#EFEFEF"
    },
    info: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "1565c0",
      contrastText: "#fff",
    }
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: InterFont,
  },
});

export default globalTheme;
