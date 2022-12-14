import { Routes, Route, useNavigate } from 'react-router-dom'
import {
  ThemeProvider,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress
} from '@mui/material'
import globalTheme from './Theme'
import { createContext, useEffect, useState, useLayoutEffect } from 'react'
import { deleteUser, getUser, saveUser } from './utils/storeUser'
import CourseDetailPage from './pages/CourseDetail'
import NavBar from './components/NavBar'
import { backend, apiPath } from './utils/urls'
import { joinPaths } from '@remix-run/router'
import { getRequest } from './utils/requests'
import { styled } from "@mui/material/styles";
import { stylizeObject, reStylizeObject } from './utils/functions'
import SignUpPage from './pages/SignUp'
import SettingPage from './pages/Setting'
import Copyright from './components/Copyright'
import CourseManagementPage from './pages/CourseManagement'
import Panel from './Panels'
export const PageContext = createContext({})
const Offset = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
  margin: theme.spacing(1, 0),
}));

export default function App() {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [messageBox, setMessageBox] = useState({
    show: false,
    type: 'success',
    message: 'Test'
  })
  const setSuccessBox = message => {
    setMessageBox({
      show: true,
      type: 'success',
      message: message
    })
  }
  const setInfoBox = message => {
    setMessageBox({
      show: true,
      type: 'info',
      message: message
    })
  }
  const setWarningBox = message => {
    setMessageBox({
      show: true,
      type: 'warning',
      message: message
    })
  }
  const setErrorBox = message => {
    setMessageBox({
      show: true,
      type: 'error',
      message: message
    })
  }

  const messageBoxClose = () => {
    setMessageBox({
      ...messageBox,
      show: false
    })
  }

  const navigate = useNavigate()
  const handleLoginSuccess = user => {
    saveUser(user);
    setLogin(true);
    setAdmin(user.admin);
    navigate('/')
  }


  const handleLogout = () => {
    deleteUser();
    setLogin(false);
    setAdmin(false);
    navigate('/')
  }


  useLayoutEffect(() => {
    const user = getUser()
    if (user !== null) {
      setLogin(true);
      setAdmin(user.admin);
    }
    const categoryListURL = joinPaths([backend, apiPath.category.list]);
    setLoading(true);
    getRequest(categoryListURL)
      .then(data => {
        const stylizedCategoryList = stylizeObject(data);
        let stylizedSubcategoryList = [];
        for (let i = 0; i < stylizedCategoryList.length; i++) {
          stylizedSubcategoryList = stylizedSubcategoryList.concat(stylizedCategoryList[i].subcategory);
        }
        setCategoryList(stylizedCategoryList);
        setSubcategoryList(stylizedSubcategoryList);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setErrorBox('Connect Error');
        setLoading(false);
      })
  }, [])



  return (
    <ThemeProvider theme={globalTheme}>
      <PageContext.Provider
        value={{
          state: {
            loading: loading,
            messageBox: messageBox,
            login: login
          },
          handler: {
            "setLoading": setLoading,
            "setSuccessBox": setSuccessBox,
            "setInfoBox": setInfoBox,
            "setWarningBox": setWarningBox,
            "setErrorBox": setErrorBox,
            "setLogin": setLogin
          }
        }}
      >
        <NavBar handleLogout={handleLogout} categoryList={categoryList} admin={admin} />
        <Offset />

        <Panel state={{
          subcategoryList: subcategoryList,
          categoryList: categoryList
        }} handler={{
          handleLoginSuccess: handleLoginSuccess
        }} />

        <Snackbar
          open={messageBox.show}
          autoHideDuration={6000}
          onClose={messageBoxClose}
          sx={{
            zIndex: 3000
          }}
        >
          <Alert
            onClose={messageBoxClose}
            severity={messageBox.type}
            sx={{ width: '100%' }}
          >
            {messageBox.message}
          </Alert>
        </Snackbar>

        <Backdrop
          sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
        <Copyright sx={{ marginTop: 3.5, marginBottom: 2.5 }} />
      </PageContext.Provider>
    </ThemeProvider>
  )
}

// export default App
