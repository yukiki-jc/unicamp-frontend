import MainPage from './pages/Main'
import LoginPage from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
const theme = createTheme();
function App () {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Routes>
      <Route exact path='/' element={<MainPage />} />
      <Route path='login' element={<LoginPage />} />
    </Routes>
    </ThemeProvider>
  )
}

export default App;