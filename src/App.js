import MainPage from './pages/Main'
import LoginPage from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import CourseListPage from './pages/CourseList';
import { CssBaseline, ThemeProvider } from '@mui/material';
import globalTheme from './Theme';

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline enableColorScheme />
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path="list" element={<CourseListPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App;