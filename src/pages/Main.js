import React from 'react'
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
      spacing={85}
      justifyContent='left'
    >
      <Typography gutterBottom variant='h6' zIndex={1}>
        {props.title}
      </Typography>
      <MUILink href='#' underline='hover' sx={{ pt: 1 }} zIndex={1}>
        More
      </MUILink>
    </Stack>
  )
}

const MainPage = props => {

  const user = getUser();
  let name = 'Future Engineer';
  if (user !== null)
    name = user.name;
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
        <MainPageCardHeadline title='Hot Courses' />
        <CourseThumbnailLine courseList={courseList} />
      </MainPageCardContainer>

      <MainPageCardContainer>
        <MainPageCardHeadline title='My Favorites' />
        <CourseThumbnailLine courseList={courseList} />
      </MainPageCardContainer>
    </main>
  )
}

export default MainPage
