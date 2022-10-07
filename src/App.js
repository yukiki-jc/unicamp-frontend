import MainPage from './pages/Main'
import LoginPage from './pages/Login'
import { Routes, Route } from 'react-router-dom'

function App () {
  return (
    <Routes>
      <Route exact path='/' element={<MainPage />} />
      <Route path='login' element={<LoginPage />} />
    </Routes>
  )
}

export default App;