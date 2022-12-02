import { styled } from "@mui/material/styles";
import { Typography, Pagination } from '@mui/material'
import { Container } from '@mui/system'
import {
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';
import React, { useContext, useLayoutEffect as useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import { useParams, useSearchParams } from 'react-router-dom'
import TitleBox from '../components/TitleBox'
import { PageContext } from '../App'
import { average, reStylizeObject, stylizeObject, sumArr } from '../utils/functions'
import { getRequest, postRequest } from '../utils/requests'
import { joinPaths } from '@remix-run/router';
import { backend, apiPath } from '../utils/urls'
import { errorHandler } from '../utils/functions'
import { emptyCourseCardPost } from '../utils/commonData'

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
  const { title, subcategoryList = [] } = props
  const { subcategoryId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  const pageContextValue = useContext(PageContext);
  const [newTitle, setNewTitle] = useState(title);
  const [courseListShow, setCourseListShow] = useState([]);
  const [sorting, setSorting] = useState("all");

  useEffect(() => {
    pageContextValue.handler.setLoading(true);
    const cardPostBody = { ...emptyCourseCardPost };
    const courseCardURL = joinPaths([backend, apiPath.course.card])
    if (title === 'Category') {
      for (let i = 0; i < subcategoryList.length; i++) {
        if (subcategoryList[i].subcategoryId.toString() === subcategoryId)
        {
          setNewTitle(subcategoryList[i].subcategoryName);
        }
      }
      
      cardPostBody.filter = {
        'subcategoryIds': [parseInt(subcategoryId)]
      }
      console.log('Here');
      postRequest(reStylizeObject(cardPostBody), courseCardURL)
        .then(data => {
          console.log('posted');
          console.log(reStylizeObject(cardPostBody));
          setCourseListShow(stylizeObject(data));
          pageContextValue.handler.setLoading(false);
        }
      ).catch((e) => {
        errorHandler(e, pageContextValue);
      });
      
    }
    else if (title === 'Search Results') {
      const searchValue = searchParams.get('value');
      cardPostBody.key = searchValue.toLowerCase()
      postRequest(reStylizeObject(cardPostBody), courseCardURL)
        .then(data => {
          setCourseListShow(stylizeObject(data));
          pageContextValue.handler.setLoading(false);
        }
      ).catch((e) => {
        errorHandler(e, pageContextValue);
      });
    }
    else if (title === 'My Favorites') {
      const favoriteURL = joinPaths([backend, apiPath.favorite.query]);
      getRequest(favoriteURL)
        .then((data) => {
          setCourseListShow(stylizeObject(data));
          pageContextValue.handler.setLoading(false);
        })
        .catch((e) => {
          errorHandler(e, pageContextValue);
        });
      
    }
    else if (title === 'All Courses') {
      postRequest(reStylizeObject(cardPostBody), courseCardURL)
        .then(data => {
          setCourseListShow(stylizeObject(data));
          pageContextValue.handler.setLoading(false);
        }
      ).catch((e) => {
        errorHandler(e, pageContextValue);
      });
    }
  }, [subcategoryId, searchParams])
  const courseCards = courseListShow.map(course => {

    return (
      <CourseCard
        src='https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg'
        name={course.name}
        rating={average(course.ratings)}
        voters={sumArr(course.ratings)}
        difficulty={course.difficulty}
        time={course.estHour}
        description={course.description}
        provider={course.provider}
        id={course.id}
        key={course.id}
      />
    )
  })

  // Why using this control function?
  //   - When a checked radio is clicked, its state of checked become false
  //   - When there's no radio checked, it is sorted by inner course ID
  const handleRadio = (event) => {
    let clicked = event.target.value;
    setSorting((sorting) => {
      return sorting === clicked
        ? "all"
        : clicked
    });
  }

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
            <FormLabel> Difficulty Filter </FormLabel>
            <FormGroup row>
              <FormControlLabel control={<Checkbox />} label="All Level" />
              <FormControlLabel control={<Checkbox />} label="Beginner" />
              <FormControlLabel control={<Checkbox />} label="Intermediate" />
              <FormControlLabel control={<Checkbox />} label="Advanced" />
              <FormControlLabel control={<Checkbox />} label="Expert" />
            </FormGroup>
          </FormControl>
          <FormControl>
            <FormLabel> Sorted by </FormLabel>
            <RadioGroup row>
              <FormControlLabel
                onClick={handleRadio}
                value="alphabet"
                checked={sorting === "alphabet"}
                control={<Radio />}
                label="Alphabet"
              />
              <FormControlLabel
                onClick={handleRadio}
                value="time"
                checked={sorting === "time"}
                control={<Radio />}
                label="Time"
              />
              <FormControlLabel
                onClick={handleRadio}
                value="difficulty"
                checked={sorting === "difficulty"}
                control={<Radio />}
                label="Difficulty"
              />
              <FormControlLabel
                onClick={handleRadio}
                value="rating"
                checked={sorting === "rating"}
                control={<Radio />}
                label="Rating"
              />
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
