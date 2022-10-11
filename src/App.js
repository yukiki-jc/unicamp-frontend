import MainPage from './pages/Main'
import LoginPage from './pages/Login'

import { Routes, Route, useNavigate } from 'react-router-dom'
import CourseListPage from './pages/CourseList'
import {
  CssBaseline,
  ThemeProvider,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress
} from '@mui/material'
import globalTheme from './Theme'
import { createContext, useEffect, useState, useLayoutEffect } from 'react'
import { deleteUser, saveUser } from './utils/storeUser'
import CourseDetailPage from './pages/CourseDetail'
import NavBar from './components/NavBar'
import { backend, apiPath } from './utils/urls'
import { joinPaths } from '@remix-run/router'
import { getRequest } from './utils/requests'
import { courseList } from './utils/testData'
import { styled } from "@mui/material/styles";
import stylizeObject from './utils/functions'
import SignUpPage from './pages/SignUp'

export const PageContext = createContext({})
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function App() {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  // const [pageNo, setPageNo] = useState(0);
  // 0: mainpage
  // 1:
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

  const handleLoginSuccess = user => {
    saveUser(user)
    console.log(user)
    setLogin(true)
  }

  const handleLogout = user => {
    deleteUser()
    setLogin(false)
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (login) {
      navigate('/')
    }
  }, [login])

  useLayoutEffect(() => {
    const categoryListURL = joinPaths([backend, apiPath.category.list]);
    const courseListURL = joinPaths([backend, apiPath.course.list]);
    setLoading(true);
    console.log("Loading App");
    Promise.all([
      getRequest(categoryListURL),
      getRequest(courseListURL)
    ])
      .then(datas => {
        // console.log(datas);
        const stylizedCategoryList = stylizeObject(datas[0]);
        let stylizedSubCategoryList = [];
        for (let i = 0; i < stylizedCategoryList.length; i++) {
          stylizedSubCategoryList = stylizedSubCategoryList.concat(stylizedCategoryList[i].subCategory);
        }
        setCategoryList(stylizedCategoryList);
        setCourseList(stylizeObject(datas[1]));
        setSubCategoryList(stylizedSubCategoryList);
        setLoading(false);
      })
      .catch(e => {
        setErrorBox(e);
        setLoading(false);
      })
  }, [])
  console.log(messageBox);

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
        <CssBaseline enableColorScheme />
        <NavBar handleLogout={handleLogout} categoryList={categoryList} />
        <Offset />
        <Routes>
          <Route
            exact
            path='/'
            element={<MainPage />}
          />
          <Route
            path='login'
            element={<LoginPage handleLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path='signup'
            element={<SignUpPage handleLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path='list'
            element={<CourseListPage />}
          />
          <Route
            path='/course/info/:courseId'
            element={<CourseDetailPage />}
          />
          <Route
            path='/category/info/:categoryId'
            element={<CourseListPage title='Category' categoryList={subCategoryList} courseList={courseList} />}
          />
          <Route
            path='/search'
            element={<CourseListPage title='Search Results' courseList={courseList} />}
          />
        </Routes>
        <Snackbar
          open={messageBox.show}
          autoHideDuration={6000}
          onClose={messageBoxClose}
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
      </PageContext.Provider>
    </ThemeProvider>
  )
}

// export default App
