import { styled } from "@mui/material/styles";
import { Typography, Pagination } from '@mui/material'
import { Container } from '@mui/system'
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import React, { useContext, useLayoutEffect as useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import { useParams, useSearchParams } from 'react-router-dom'
import TitleBox from '../components/TitleBox'
import { PageContext } from '../App'
import { stylizeObject } from '../utils/functions'
import { getRequest } from '../utils/requests'
import { joinPaths } from '@remix-run/router';
import { backend, apiPath } from '../utils/urls'
import { errorHandler } from '../utils/functions'

const FilterPad = styled(Container)(({ theme }) => ({
  paddingBottom: 12,
  display: "flex",
  flexDirection: "column",
}));

const PageEnd = styled(Container)(({ theme }) => ({
  paddingTop: 16,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
}));

const CourseListPage = props => {
  const { title, courseList = [], subcategoryList = [] } = props
  const { subcategoryId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  const pageContextValue = useContext(PageContext);
  const [newTitle, setNewTitle] = useState(title);
  const [courseListShow, setCourseListShow] = useState([]);

  useEffect(() => {
    if (title === 'Category') {
      for (let i = 0; i < subcategoryList.length; i++) {
        if (subcategoryList[i].subcategoryId.toString() === subcategoryId)
          setNewTitle(subcategoryList[i].subcategoryName);
      }
      const toShow = courseList.filter(course => {
        return (course.subcategoryId.toString() === subcategoryId)
      })
      setCourseListShow(toShow);
    }
    else if (title === 'Search Results') {
      const searchValue = searchParams.get('value');
      const searchReg = RegExp(searchValue.toLowerCase());
      const searchResults = courseList.filter(course => {
        const courseString = JSON.stringify(course).toLowerCase();
        return searchReg.test(courseString);
      })
      setCourseListShow(searchResults);
    }
    else if (title === 'My Favorites') {
      const favoriteURL = joinPaths([backend, apiPath.favorite.query]);
      pageContextValue.handler.setLoading(true);
      getRequest(favoriteURL)
        .then((data) => {
          setCourseListShow(stylizeObject(data))
          console.log(courseListShow)
          pageContextValue.handler.setLoading(false);
        })
        .catch((e) => {
          errorHandler(e, pageContextValue);
        });
    }
    else if (title === 'All Courses') {
      setCourseListShow(courseList);
    }
  }, [subcategoryId, searchParams, courseList])
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
        <FilterPad>
          <FormControl>
            <FormLabel> Sorted by </FormLabel>
            <RadioGroup row>
              <FormControlLabel value="alphabet" control={<Radio />} label="Alphabet" />
              <FormControlLabel value="time" control={<Radio />} label="Time" />
              <FormControlLabel value="difficulty" control={<Radio />} label="Difficulty" />
              <FormControlLabel value="rating" control={<Radio />} label="Rating" />
            </RadioGroup>
          </FormControl>
        </FilterPad>
        <Container maxWidth='lg'>
          {courseCards}
        </Container>
        <PageEnd maxWidth='lg'>
          <Pagination count={114514} color="primary" />
        </PageEnd>
      </main>
    </div>
  )
}

export default CourseListPage
