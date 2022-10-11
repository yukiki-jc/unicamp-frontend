import React from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CourseThumbnailLine from '../components/CourseThunbnailLine'
import { styled } from '@mui/material/styles'
import { Link as MUILink } from '@mui/material'
import { courseList } from '../utils/testData'


const MainPageCardContainer = styled(props => (
  <Container maxWidth='md' {...props} />
))(({ theme }) => ({
  padding: theme.spacing(4, 0)
}))

const MainPage = props => {
  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6
        }}
      >
        <Container maxWidth='md'>
          <Typography
            component='h1'
            variant='h2'
            align='left'
            color='text.primary'
            gutterBottom
          >
            Hello, CJC!
          </Typography>
        </Container>
      </Box>
      <MainPageCardContainer>
        <Stack
          // sx={{ pt: 1 }}
          direction='row'
          spacing={85}
          justifyContent='left'
        >
          <Typography gutterBottom variant='h6' zIndex={1}>
            Hot Courses
          </Typography>
          <MUILink href='#' underline='hover' sx={{ pt: 1 }} zIndex={1}>
            More
          </MUILink>
        </Stack>
        <CourseThumbnailLine courseList={courseList} />
      </MainPageCardContainer>

      <MainPageCardContainer>
        <Stack
          // sx={{ pt: 1 }}
          direction='row'
          spacing={85}
          justifyContent='left'
        >
          <Typography gutterBottom variant='h6' zIndex={1}>
            My Favorites
          </Typography>
          <MUILink href='#' underline='hover' sx={{ pt: 1 }} zIndex={1}>
            More
          </MUILink>
        </Stack>
        <CourseThumbnailLine courseList={courseList} />
      </MainPageCardContainer>
    </main>
  );
}

export default MainPage
