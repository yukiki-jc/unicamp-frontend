import { styled } from "@mui/material/styles";
import { Typography, Pagination } from "@mui/material";
import { Container } from "@mui/system";
import {
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import React, {
  useContext,
  useLayoutEffect as useEffect,
  useState,
} from "react";
import CourseCard from "../components/CourseCard";
import { useParams, useSearchParams } from "react-router-dom";
import TitleBox from "../components/TitleBox";
import { PageContext } from "../App";
import {
  average,
  reStylizeObject,
  stylizeObject,
  sumArr,
} from "../utils/functions";
import { getRequest, postRequest } from "../utils/requests";
import { joinPaths } from "@remix-run/router";
import { backend, apiPath } from "../utils/urls";
import { errorHandler } from "../utils/functions";
import { emptyCourseCardPost, LevelMappings } from "../utils/commonData";
import { useLayoutEffect } from "react";

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

const CourseListPage = (props) => {
  const { title, subcategoryList = [] } = props;
  const { subcategoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageContextValue = useContext(PageContext);
  const [newTitle, setNewTitle] = useState(title);
  const [courseListShow, setCourseListShow] = useState([]);
  const [sorting, setSorting] = useState("all");
  const [page, setPage] = useState(1);
  const [courseNumber, setCourseNumber] = useState(0);
  const courseCardURL = joinPaths([backend, apiPath.course.card]);
  const perPageNumber = 10;
  const [difficultyFilter, setDifficultyFilter] = useState(0);
  const getCardPostBody = () => {
    const cardPostBody = { ...emptyCourseCardPost };
    if (title === "Category") {
      cardPostBody.filter = {
        subcategoryIds: [parseInt(subcategoryId)],
      };
    } else if (title == "Search Results") {
      const searchValue = searchParams.get("value");
      cardPostBody.key = searchValue.toLowerCase();
    } else if (title == "All Courses") {
      cardPostBody.range = {
        from: (page - 1) * perPageNumber,
        size: perPageNumber,
      };
    }
    if (sorting !== "all") {
      switch (sorting) {
        case "alphabetAscending": {
          cardPostBody.sort = "alphabet";
          cardPostBody.ascending = true;
          break;
        }
        case "alphabetDescending": {
          cardPostBody.sort = "alphabet";
          cardPostBody.ascending = false;
          break;
        }
        case "latest": {
          cardPostBody.sort = "time";
          cardPostBody.ascending = false;
          break;
        }
        case "oldest": {
          cardPostBody.sort = "time";
          cardPostBody.ascending = true;
          break;
        }
        case "difficulty": {
          cardPostBody.sort = "difficulty";
          cardPostBody.ascending = true;
          break;
        }
        case "rating": {
          cardPostBody.sort = "rating";
          cardPostBody.ascending = false;
          break;
        }
        default: {
          break;
        }
      }
    }
    if (difficultyFilter) {
      if (cardPostBody.hasOwnProperty("filter"))
        cardPostBody.filter.difficulty = difficultyFilter;
      else
        cardPostBody.filter = {
          difficulty: difficultyFilter,
        };
    }
    return cardPostBody;
  };
  const requestCourseCard = () => {
    const cardPostBody = getCardPostBody();
    postRequest(reStylizeObject(cardPostBody), courseCardURL)
      .then((data) => {
        const result = stylizeObject(data);
        setCourseNumber(result.num);
        setCourseListShow(result.courseDaoWithGradeList);
        pageContextValue.handler.setLoading(false);
      })
      .catch((e) => {
        errorHandler(e, pageContextValue);
      });
  };
  useLayoutEffect(() => {
    pageContextValue.handler.setLoading(true);
    if (title === "My Favorites") {
      const favoriteURL = joinPaths([backend, apiPath.favorite.query]);
      getRequest(favoriteURL)
        .then((data) => {
          setCourseListShow(stylizeObject(data));
          pageContextValue.handler.setLoading(false);
        })
        .catch((e) => {
          errorHandler(e, pageContextValue);
        });
    } else {
      requestCourseCard();
    }
  }, [subcategoryId, searchParams]);

  useLayoutEffect(() => {
    pageContextValue.handler.setLoading(true);
    if (title === "Category") {
      for (let i = 0; i < subcategoryList.length; i++) {
        if (subcategoryList[i].subcategoryId.toString() === subcategoryId) {
          setNewTitle(subcategoryList[i].subcategoryName);
        }
      }
    }
    pageContextValue.handler.setLoading(false);
  }, [subcategoryList]);

  const courseCards = courseListShow.map((course) => {
    return (
      <CourseCard
        src="https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg"
        name={course.name}
        rating={average(course.ratingDetail)}
        voters={sumArr(course.ratingDetail)}
        difficulty={course.difficulty}
        time={course.estHour}
        description={course.description}
        provider={course.provider}
        id={course.id}
        key={course.id}
      />
    );
  });

  useEffect(() => {
    pageContextValue.handler.setLoading(true);
    if (title === "My Favorites") return;
    requestCourseCard();
  }, [page, sorting, difficultyFilter]);
  // Why using this control function?
  //   - When a checked radio is clicked, its state of checked become false
  //   - When there's no radio checked, it is sorted by inner course ID
  const handleRadio = (event) => {
    let clicked = event.target.value;
    setSorting((sorting) => {
      return sorting === clicked ? "all" : clicked;
    });
  };

  const DifficultyCheckbox = (props) => {
    const { idx } = props;
    return (
      <Checkbox
        checked={difficultyFilter === idx}
        onChange={() => {
          if (difficultyFilter === idx) setDifficultyFilter(0);
          else setDifficultyFilter(idx);
        }}
      />
    );
  };

  const difficultyCheckboxes = LevelMappings.map((level, idx) => {
    if (idx === 0) return null;
    return (
      <FormControlLabel
        control={<DifficultyCheckbox idx={idx} />}
        label={level}
        key={idx}
      />
    );
  });
  return (
    <div>
      <main>
        <TitleBox>
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="left"
              color="text.primary"
              gutterBottom
            >
              {newTitle}
            </Typography>
          </Container>
        </TitleBox>
        {title === "My Favorites" ? null : (
          <FilterPad>
            <FormControl>
              <FormLabel> Difficulty Filter </FormLabel>
              <FormGroup row>{difficultyCheckboxes}</FormGroup>
            </FormControl>
            <FormControl>
              <FormLabel> Sorted by </FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  onClick={handleRadio}
                  value="alphabetAscending"
                  checked={sorting === "alphabetAscending"}
                  control={<Radio />}
                  label="A-Z"
                />
                <FormControlLabel
                  onClick={handleRadio}
                  value="alphabetDescending"
                  checked={sorting === "alphabetDescending"}
                  control={<Radio />}
                  label="Z-A"
                />
                <FormControlLabel
                  onClick={handleRadio}
                  value="latest"
                  checked={sorting === "latest"}
                  control={<Radio />}
                  label="Latest"
                />
                <FormControlLabel
                  onClick={handleRadio}
                  value="oldest"
                  checked={sorting === "oldest"}
                  control={<Radio />}
                  label="Oldest"
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
        )}

        <Container maxWidth="lg">{courseCards}</Container>
        {title === "All Courses" ? (
          <PageEnd maxWidth="lg">
            <Pagination
              count={
                courseNumber
                  ? Math.floor((courseNumber - 1) / perPageNumber) + 1
                  : 1
              }
              color="primary"
              onChange={(event, value) => {
                setPage(value);
              }}
            />
          </PageEnd>
        ) : null}
      </main>
    </div>
  );
};

export default CourseListPage;
