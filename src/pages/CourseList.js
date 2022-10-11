import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import CourseCard from '../components/CourseCard'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'

const CourseListPage = props => {
  const { title, courseList = [], categoryList = [] } = props
  const { categoryId } = useParams()
  let newTitle = title;
  let courseListShow = courseList;
  // console.log(categoryList);
  if (title === 'Category') {
    console.log(categoryId);
    for (let i = 0; i < categoryList.length; i++) {
      if (categoryList[i].subCategoryId.toString() === categoryId)
        newTitle = categoryList[i].subCategoryName
    }
    courseListShow = courseList.filter(course => {
      return (course.subcategoryId.toString() === categoryId)
    })
  }

  const courseCards = courseListShow.map(course => {
    return (
      <CourseCard
        src='https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg'
        title={course.name}
        rating={3.7}
        voters={2023}
        difficulty={course.difficulty}
        time={course.estHour}
        description={course.description}
      />
    )
  })
  return (
    <div>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6
          }}
        >
          <Container maxWidth='lg'>
            <Typography
              component='h1'
              variant='h2'
              align='left'
              color='text.primary'
              gutterBottom
            >
              {newTitle}
            </Typography>
          </Container>
        </Box>
        <Container maxWidth='lg'>
          <div style={{ padding: '8px 4vw' }}>
            {courseCards}
          </div>
        </Container>
      </main>
    </div>
  )
}

export default CourseListPage
