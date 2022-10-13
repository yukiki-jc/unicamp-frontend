import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import CourseCard from '../components/CourseCard'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import TitleBox from '../components/TitleBox'

const CourseListPage = props => {
  const { title, courseList = [], subcategoryList = [] } = props
  const { subcategoryId } = useParams()
  let newTitle = title;
  let courseListShow = courseList;
  // console.log(categoryList);
  if (title === 'Category') {
    console.log(subcategoryId);
    for (let i = 0; i < subcategoryList.length; i++) {
      if (subcategoryList[i].subcategoryId.toString() === subcategoryId)
        newTitle = subcategoryList[i].subcategoryName
    }
    courseListShow = courseList.filter(course => {
      return (course.subcategoryId.toString() === subcategoryId)
    })
  }

  const courseCards = courseListShow.map(course => {
    return (
      <CourseCard
            src='https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg'
            name={course.name}
            rating={3.7}
            voters={2023}
            difficulty={course.difficulty}
            time={course.estHour}
            description={course.description}
            provider={course.provider}
            id={course.id}
          />
    )
  })
  
  return (
    <div>
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
              {newTitle}
            </Typography>
          </Container>
        </TitleBox>
        <Container maxWidth='lg'>
          {courseCards}
        </Container>
      </main>
    </div>
  )
}

export default CourseListPage
