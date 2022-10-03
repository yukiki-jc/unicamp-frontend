import './App.css';
import MainPage from './MainPage';
import LoginPage from './LoginPage'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      Hello World!
      
      <Routes>
          <Route
            exact
            path='/'
            element={<MainPage />}
          />
          <Route
            path='login'
            element={<LoginPage />}
          />
        </Routes>
      {/* <MainPage></MainPage> */}
      
    </div>
    
  );
}

export default App;
