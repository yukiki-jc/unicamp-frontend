import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import TitleBox from '../components/TitleBox'
import { Divider } from '@mui/material'
import { Container, Button, Typography } from '@mui/material'
import { Stack } from '@mui/material'
import { postRequest } from '../utils/requests'
import { joinPaths } from '@remix-run/router'
import { apiPath, backend } from '../utils/urls'
import { PageContext } from '../App'
import CourseInfoModal from '../components/CourseInfoModal'
import { emptyCourse, emptyCourseThumbnail } from '../utils/commonData'
import { getRequest } from '../utils/requests'
import { reStylizeObject, stylizeObject } from '../utils/functions'
const columns = [
  {
    field: 'id',
    headerName: '#',
    type: 'number',
    width: 20,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'subcategoryId',
    headerName: 'Category',
    type: 'string',
    width: 100,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'name',
    headerName: 'Course Name',
    type: 'string',
    width: 130,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'provider',
    headerName: 'Provider',
    type: 'string',
    width: 150,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'difficulty',
    headerName: 'Diff.',
    type: 'string',
    width: 70,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'estHour',
    headerName: 'Hour',
    type: 'number',
    width: 70,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'description',
    headerName: 'Description',
    type: 'string',
    width: 500,
    align: 'center',
    headerAlign: 'center'
  }
]

export default function CourseManagementPage (props) {
  const { subcategoryList, courseList, setCourseList } = props

  const [selectedCourses, setSelectedCourses] = React.useState([])
 
  const pageContextValue = React.useContext(PageContext)

  const [courseInfoModal, setCourseInfoModal] = React.useState({
    show: false,
    type: 'Add Course',
    currentCourseDetail: { ...emptyCourse }
  })
  const handleCloseModal = () => {
    setCourseInfoModal({
      ...courseInfoModal,
      show: false
    })
  }
  const handleAddCourse = () => {
    setCourseInfoModal({
      show: true,
      type: 'Add',
      currentCourseDetail: { ...emptyCourse }
    })
  }
  const handleEditCourse = () => {
    if (selectedCourses.length === 0) {
      pageContextValue.handler.setInfoBox('No course is selected.')
    } else if (selectedCourses.length > 1) {
      pageContextValue.handler.setInfoBox(
        'You can only edit one course at a time.'
      )
    } else {
      const currentCourseId = selectedCourses[0]
      const currentCourse = courseList.filter(course => {
        return course.id === currentCourseId
      })[0]
      pageContextValue.handler.setLoading(true)
      const courseDetailURL = joinPaths([
        backend,
        apiPath.course.info,
        currentCourse.id
      ])
      getRequest(courseDetailURL)
        .then(json => {
          const currentCourseDetail = stylizeObject(json)
          pageContextValue.handler.setLoading(false)
          setCourseInfoModal({
            show: true,
            type: 'Edit',
            currentCourseDetail: currentCourseDetail
          })
        })
        .catch(e => {
          pageContextValue.handler.setErrorBox(e)
          pageContextValue.handler.setLoading(false)
        })
    }
  }
  const handleDeleteCourse = () => {
    const newCourseList = courseList.filter(course => {
      if (selectedCourses.indexOf(course.id) > -1) return false
      return true
    })
    pageContextValue.handler.setLoading(true)
    Promise.all(
      selectedCourses.map(courseId => {
        const deleteBody = {
          id: courseId
        }
        const deleteURL = joinPaths([backend, apiPath.course.delete])
        return postRequest(deleteBody, deleteURL)
      })
    )
      .then(results => {
        let state = true
        let message = ''
        results.forEach(result => {
          if (result.state === false) {
            state = false
            message = result.message
          }
        })
        if (state === false) {
          pageContextValue.handler.setErrorBox(message)
          pageContextValue.handler.setLoading(false)
        } else {
          pageContextValue.handler.setSuccessBox("successfully deleted")
          pageContextValue.handler.setLoading(false)
          setCourseList(newCourseList)
        }
      })
      .catch(e => {
        pageContextValue.handler.setErrorBox(e)
        pageContextValue.handler.setLoading(false)
      })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    let todoCourse = { ...emptyCourse }
    let todoCourseThumbnail = { ...emptyCourseThumbnail }
    data.forEach(function (value, key) {
      todoCourse[key] = value
    })
    Object.keys(todoCourseThumbnail).forEach(key => {
      todoCourseThumbnail[key] = data.get(key)
    })
    let addEditURL = ''
    pageContextValue.handler.setLoading(true)
    if (courseInfoModal.type === 'Add') {
      addEditURL = joinPaths([backend, apiPath.course.add])
      delete todoCourse['id'];
    } else {
      addEditURL = joinPaths([backend, apiPath.course.update])
    }
    todoCourse = reStylizeObject(todoCourse);
    postRequest(todoCourse, addEditURL)
      .then(json => {
        if (json.state === true) {
          const courseListURL = joinPaths([backend, apiPath.course.list]);
          pageContextValue.handler.setSuccessBox(json.message);
          return getRequest(courseListURL)
        } else {
          pageContextValue.handler.setErrorBox(json.message)
        }
      }).then(json => {
        setCourseList(stylizeObject(json));
        setCourseInfoModal({
          ...courseInfoModal,
          show: false
        })
        pageContextValue.handler.setLoading(false)
      })
      .catch(e => {
        console.log(e)
        pageContextValue.handler.setErrorBox(e)
        pageContextValue.handler.setLoading(false)
      })
  }

  return (
    <main>
      <TitleBox>
        <Container maxWidth='lg'>
          <Typography
            component='h1'
            variant='h2'
            align='left'
            color='text.primary'
            gutterBottom
          >
            Course Management
          </Typography>

          <Divider />
        </Container>
      </TitleBox>

      <Container maxWidth='lg' sx={{ height: 1050 }}>
        <Stack sx={{ m: 1 }} direction='row' spacing={10} justifyContent='center'>
          <Button size='small' onClick={handleAddCourse} variant='contained'>
            Add New Course
          </Button>
          <Button size='small' onClick={handleDeleteCourse} variant='contained'>
            Delete Course
          </Button>
          <Button size='small' onClick={handleEditCourse} variant='contained'>
            Edit Course
          </Button>
        </Stack>

        <DataGrid
          rows={courseList}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowHeight={() => 'auto'}
          onSelectionModelChange={newSelectedCourses => {
            setSelectedCourses(newSelectedCourses)
          }}
          selectionModel={selectedCourses}
          checkboxSelection
        />
      </Container>
      <CourseInfoModal
        subcategoryList={subcategoryList}
        courseInfoModal={courseInfoModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />
    </main>
  )
}
