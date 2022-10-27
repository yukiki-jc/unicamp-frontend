import React, { useContext, useLayoutEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CourseThumbnailLine from '../components/CourseThunbnailLine'
import { styled } from '@mui/material/styles'
import { Link as MUILink } from '@mui/material'
import { courseList } from '../utils/testData'
import { getUser } from '../utils/storeUser'
import TitleBox from '../components/TitleBox'
import { joinPaths } from '@remix-run/router'
import { apiPath, backend } from '../utils/urls'
import { errorHandler, stylizeObject } from '../utils/functions'
import { PageContext } from '../App'
import { getRequest } from '../utils/requests'

const MainPageCardContainer = styled(props => (
  <Container maxWidth='md' {...props} />
))(({ theme }) => ({
  padding: theme.spacing(4, 0)
}))

const MainPageCardHeadline = props => {
  return (
    <Stack
      // sx={{ pt: 1 }}
      direction='row'
      justifyContent='space-between'
    >
      <Typography gutterBottom variant='h6' zIndex={1} align='left'>
        {props.title}
      </Typography>
      <Stack
      // sx={{ pt: 1 }}
      direction='row'
      justifyContent='flex-end'
    >
      <MUILink href='#' underline='hover' sx={{ pt: 1 }} zIndex={1} justifyContent='flex-end'>
        More
      </MUILink>
      </Stack>
    </Stack>
  )
}

const MainPage = props => {
  const [newCourses, setNewCourses] = useState([]);
  const [hotCourses,setHotCourses] = useState([]);
  const [recCourses, setRecCourses] = useState([]);
  const pageContextValue = useContext(PageContext);
  const user = getUser();
  let name = 'Future Engineer';
  if (user !== null)
    name = user.name;
  useLayoutEffect(() => {
    const newCourseURL = joinPaths([backend, apiPath.recommend.new]);
    const hotCourseURL = joinPaths([backend, apiPath.recommend.hot]);
    pageContextValue.handler.setLoading(true);
    Promise.all([
      getRequest(newCourseURL),
      getRequest(newCourseURL)
    ]).then(results => {
      const [newCoursesRaw, hotCoursesRaw] = results;
      const newCourses = stylizeObject(newCoursesRaw);
      const hotCourses = stylizeObject(hotCoursesRaw);
      setNewCourses(newCourses);
      setHotCourses(hotCourses);
      if (user != null) {
        const recCourseURL = joinPaths([backend, apiPath.recommend.rec]);
        return getRequest(newCourseURL);
      }
      else return false;
    }).then(recCourseRaw => {
      if (recCourseRaw === false) {
        return true;
      }
      const recCourses = stylizeObject(recCourseRaw);
      setRecCourses(recCourses);
      pageContextValue.handler.setLoading(false);
    }).catch(e => {
      errorHandler(e, pageContextValue);
    })
  }, [])
  
  return (
    <main>
      {/* Hero unit */}
      <TitleBox>
        <Container maxWidth='md'>
          <Typography
            component='h1'
            variant='h2'
            align='left'
            color='text.primary'
            gutterBottom
          >
            Hello, {name}!
          </Typography>
          <Typography
            component='h1'
            variant='h5'
            align='left'
            color='text.primary'
            gutterBottom
          >
            Your journey to Computer Science starts here.
          </Typography>
        </Container>
      </TitleBox>
      <MainPageCardContainer>
        <MainPageCardHeadline title='Newest Courses' />
        <CourseThumbnailLine thisCourseList={newCourses} />
      </MainPageCardContainer>

      <MainPageCardContainer>
        <MainPageCardHeadline title='Hot Courses' />
        <CourseThumbnailLine thisCourseList={newCourses} />
      </MainPageCardContainer>
      {
        user === null ? null : <MainPageCardContainer>
        <MainPageCardHeadline title='Recommendations for You' />
        <CourseThumbnailLine thisCourseList={newCourses} />
      </MainPageCardContainer>
      }
      
    </main>
  )
}

export default MainPage
