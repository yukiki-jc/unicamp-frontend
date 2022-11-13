
import { Fragment, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CourseMenu from '../components/CourseMenu'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import Typed from "typed.js";
import { LatoFont } from '../utils/commonData'

import React, { useContext, useLayoutEffect, useState } from 'react'
import { getUser } from '../utils/storeUser'
import { joinPaths } from '@remix-run/router'
import { apiPath, backend } from '../utils/urls'
import { errorHandler, stylizeObject } from '../utils/functions'
import { PageContext } from '../App'
import { getRequest } from '../utils/requests'

const jobTitles = ["Web Developer", "UI/UX Designer", "Data Scienctist", "Product Manager", "DevOps Engineer", "Systems Architect", "Game Developer", "Quantitative Analyst"];

const HeroTitleText = styled((props) => (
  <Typography variant="h1" {...props} />
))(({ theme }) => ({
  fontFamily: LatoFont,
  fontSize: "2.4rem",
  color: "#3a3a3a",
  [theme.breakpoints.up("sm")]: {
    fontSize: "3.2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "3rem",
  },
}));

const HeroTitle = () => {
  useEffect(() => {
    const typingTitle = new Typed(`#hero-job-title`, {
      strings: jobTitles,
      typeSpeed: 39,
      backSpeed: 24,
      loop: true,
      backDelay: 3200,
      cursorChar: "_",
    });

    return () => typingTitle.destroy();
  }, []);

  return (
    <Box sx={{ width: { md: "50%" }, paddingLeft: { md: "4vw" } }}>
      <HeroTitleText sx={{
        paddingTop: { xs: "3.6rem", md: "1.6rem" },
      }}>
        Hello, future
      </HeroTitleText>
      <Box sx={(theme) => ({
        fontSize: "min(9vw, 6.4rem)",
        fontFamily: "Roboto Condensed",
        lineHeight: 1.44,
        color: theme.palette.primary.main,
        "& .typed-cursor": {
          color: "inherit",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "min(5vw, 6.4rem)",
        },
      })}>
        <Typography
          id="hero-job-title"
          variant="span"
          sx={{ whiteSpace: "nowrap" }}
        />
      </Box>
      <HeroTitleText sx={{ fontSize: { xs: "min(2rem, 4vw)", md: "min(2.4rem, 2vw)", lg: "2.4rem" }, color: "#777" }}>
        your journey to the tech <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>industry starts here.</span>
      </HeroTitleText>
      <HeroButtonStack>
        <HeroButton>Browse Courses</HeroButton>
        <HeroButton color="inherit" sx={{ filter: "invert(1)" }}>Sign Up</HeroButton>
      </HeroButtonStack>
    </Box>
  );
};

const HeroContainer = styled((props) => (
  <Box component="section" {...props} />
))(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  padding: theme.spacing(2),
}));

const HeroImg = styled("img", {
  shouldForwardProp: (prop) => prop !== "maxWidth"
})(({ theme, maxWidth }) => ({
  maxWidth: "100%",
  borderRadius: theme.shape.borderRadius * 5,
  [theme.breakpoints.up("md")]: {
    maxWidth: maxWidth || "48%",
  },
}));

const HeroButtonStack = styled((props) => (
  <Stack spacing={2.5} direction={{ xs: "column", sm: "row", lg: "column" }} {...props} />
))(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const HeroButton = styled((props) => (
  <Button variant="contained" {...props} />
))(({ theme }) => ({
  borderRadius: "10rem",
  paddingTop: "1.3rem",
  paddingBottom: "1.3rem",
  width: "92%",
  fontWeight: 600,
  [theme.breakpoints.up("lg")]: {
    maxWidth: "48rem",
  },
}));

const MainContainer = styled((props) => (
  <Box component="main" {...props} />
))(({ theme }) => ({
  padding: theme.spacing(0, "4vw"),
}));

const MenuContainer = styled(Box)(({ theme }) => ({
}));

const MenuTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto Condensed",
  fontSize: "2.7rem",
  margin: theme.spacing(4, 0, 2, 4),
}));

const logos = [
  "stanford.png", "mit.png", "uiuc.svg", "harvard.png", "cmu.jpeg",
  "cornell.png", "berkeley.png", "ucsd.png", "gatech.png",
];

const logoHeight = (theme, line) => ({
  maxHeight: `calc(${2.8 * line}vw + ${2.4 * (line - 1)}rem)`,
  [theme.breakpoints.up("lg")]: {
    maxHeight: `calc(${2.4 * line}vw + ${2.4 * (line - 1)}rem)`,
  },
  [theme.breakpoints.up("md")]: {
    maxHeight: `calc(${1.8 * line}vw + ${2.4 * (line - 1)}rem)`,
  },
});

const LogoImg = styled(({ alt, ...props }) => (
  <img {...props} alt={alt} loading="lazy" />
))(({ theme }) => ({
  ...logoHeight(theme, 1),
  marginBottom: "2.4rem",
  marginRight: "3rem"
}));

const MainPage = props => {
  const { subcategoryList } = props
  const [newCourses, setNewCourses] = useState([])
  const [hotCourses, setHotCourses] = useState([])
  const [recCourses, setRecCourses] = useState([])
  const pageContextValue = useContext(PageContext)
  const user = getUser()
  let name = 'Future Engineer'
  if (user !== null) name = user.name
  useLayoutEffect(() => {
    const newCourseURL = joinPaths([backend, apiPath.recommend.new])
    const hotCourseURL = joinPaths([backend, apiPath.recommend.hot])
    pageContextValue.handler.setLoading(true)
    Promise.all([getRequest(newCourseURL), getRequest(hotCourseURL)])
      .then(results => {
        const [newCoursesRaw, hotCoursesRaw] = results
        const newCourses = stylizeObject(newCoursesRaw)
        const hotCourses = stylizeObject(hotCoursesRaw)
        setNewCourses(newCourses)
        setHotCourses(hotCourses)
        if (user != null) {
          const recCourseURL = joinPaths([backend, apiPath.recommend.rec])
          return getRequest(recCourseURL)
        } else return false
      })
      .then(recCourseRaw => {
        if (recCourseRaw === false) {
          pageContextValue.handler.setLoading(false)
          return true
        }
        const recCourses = stylizeObject(recCourseRaw)
        console.log(recCourses)
        setRecCourses(recCourses)
        pageContextValue.handler.setLoading(false)
      })
      .catch(e => {
        errorHandler(e, pageContextValue)
      })
  }, [])

  return (
    <MainContainer>
      <HeroContainer sx={{ marginTop: { md: 1 } }}>
        <HeroImg src={`${process.env.PUBLIC_URL}/hero.jpg`} />
        <HeroTitle />
      </HeroContainer>
      <MenuContainer>
        <MenuTitle>
          Now Trending
        </MenuTitle>
        <CourseMenu courseList={hotCourses} subcategoryList={subcategoryList} />

        <HeroContainer sx={{ marginTop: 5, alignItems: "center" }}>
          <Box sx={{ paddingRight: { md: "4vw" } }}>
            <HeroTitleText sx={{ marginBottom: 1 }}>
              An online <span style={{ color: "#5A49E3" }}>self-taught</span> curriculum, dedicated to <span style={{ color: "#b27c66" }}>Computer Science</span>
            </HeroTitleText>
            <Typography sx={{
              color: "#777",
              marginBottom: 4,
              fontSize: "1.4rem",
            }}>
              enjoy courses from the best universities in the world
            </Typography>
            <Box sx={(theme) => ({
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginBottom: 2,
              overflow: "hidden",
              ...logoHeight(theme, 2),
            })}>
              {logos.map((name) => (
                <LogoImg
                  src={`${process.env.PUBLIC_URL}/logos/${name}`}
                  alt={name}
                  key={`${name}-logo`}
                />
              ))}
            </Box>
            <Typography sx={{
              color: "#777",
              marginBottom: { xs: 5, md: 0 },
              fontSize: "0.8rem",
            }}>
              * Logos are only used to visually refer to certain Universities in our database, and do not indicate any partnership.
            </Typography>
          </Box>
          <HeroImg
            src={`${process.env.PUBLIC_URL}/tutor.jpg`}
            maxWidth="min(50rem, 48%)"
          />
        </HeroContainer>

        <MenuTitle>
          What's New
        </MenuTitle>
        <CourseMenu courseList={newCourses} subcategoryList={subcategoryList} />

        <HeroContainer sx={{ marginTop: 5, alignItems: "center" }}>
          <Box sx={{ paddingRight: { md: "6.4vw" } }}>
            <HeroTitleText sx={{ marginBottom: 1 }}>
              We're all in this together
            </HeroTitleText>
            <Box sx={{
              color: "#777",
              marginBottom: 4,
              fontSize: "1.4rem",
            }}>
              Hey, you are not alone on this journey. Share anything you find helpful. Ideas, notes, puzzles, mindmaps, ANYTHING!
              <p>Please do note that sharing your answers directly is strictly prohibited on Unicamp. We encourage thoughtful discussions.</p>
            </Box>
          </Box>
          <HeroImg src={`${process.env.PUBLIC_URL}/discuss.jpg`} maxWidth="min(50rem, 48%)" />
        </HeroContainer>

        {pageContextValue.state.login && (
          <Fragment>
            <MenuTitle>
              Courses For U
            </MenuTitle>
            <CourseMenu courseList={recCourses.length ? recCourses : newCourses} subcategoryList={subcategoryList} />
          </Fragment>
        )}
      </MenuContainer>
    </MainContainer>
  )
};

export default MainPage
