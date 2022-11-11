import MainPage from './pages/Main'
import LoginPage from './pages/Login'

import { Routes, Route } from 'react-router-dom'
import CourseListPage from './pages/CourseList'
import CourseDetailPage from './pages/CourseDetail'
import SignUpPage from './pages/SignUp'
import SettingPage from './pages/Setting'
import CourseManagementPage from './pages/CourseManagement'

export default function Panel (props) {
  const { state, handler } = props;
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route
          path='login'
          element={<LoginPage handleLoginSuccess={handler.handleLoginSuccess} />}
        />
        <Route
          path='signup'
          element={<SignUpPage handleLoginSuccess={handler.handleLoginSuccess} />}
        />
        <Route path='setting' element={<SettingPage />} />
        <Route path='list' element={<CourseListPage />} />
        <Route path='/course/info/:courseId' element={<CourseDetailPage subcategoryList={state.subcategoryList} />} />
        <Route
          path='/category/info/:subcategoryId'
          element={
            <CourseListPage
              title='Category'
              subcategoryList={state.subcategoryList}
              courseList={state.courseList}
            />
          }
        />
        <Route
          path='/search'
          element={
            <CourseListPage title='Search Results' courseList={state.courseList} />
          }
        />
        <Route
          path='/favorites'
          element={
            <CourseListPage title='My Favorites' courseList={state.courseList} />
          }
        />
        <Route
          path='/coursemanagement'
          element={
            <CourseManagementPage
              courseList={state.courseList}
              setCourseList={handler.setCourseList}
              subcategoryList={state.subcategoryList}
            />
          }
        />
      </Routes>
    </div>
  )
}

// export default App
