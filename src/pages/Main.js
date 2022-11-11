import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CourseMenu from '../components/CourseMenu'
import { styled } from '@mui/material/styles'
import { Button, Divider, Grid, Link as MUILink } from '@mui/material'
import { courseList } from '../utils/testData'
import Typed from "typed.js";
import { LatoFont } from '../utils/commonData'

const jobTitles = ["Web Developer", "UI/UX Designer", "Data Scienctist", "Project Manager", "DevOps Engineer", "Systems Architect", "Software Developer"];

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
      shuffle: true,
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
  display: "block",
  height: "fit-content",
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

const MainPage = props => {
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
        <CourseMenu courseList={courseList} />

        <HeroContainer sx={{ marginTop: 5, alignItems: "center" }}>
          <Box sx={{ paddingRight: { md: "4vw" } }}>
            <HeroTitleText sx={{ marginBottom: 1 }}>
              An online <span style={{ color: "#5A49E3" }}>self-taught</span> curriculum, dedicated for <span style={{ color: "#b27c66" }}>Computer Science</span>
            </HeroTitleText>
            <Typography sx={{
              color: "#777",
              marginBottom: 4,
              fontSize: "1.4rem",
            }}>
              featured the best universities around the world
            </Typography>
            <Box sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginBottom: 1.5,
              overflow: "hidden",
              height: "9rem"
            }}>
              {logos.map((name) => (
                <img height={24} src={`${process.env.PUBLIC_URL}/logos/${name}`} style={{ marginRight: "max(3rem, 3vw)", marginBottom: "2.4rem" }} alt={name} />
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
          UR Collection
        </MenuTitle>
        <CourseMenu courseList={courseList} />

        <HeroContainer sx={{ marginTop: 5, alignItems: "center" }}>
          <Box sx={{ paddingRight: { md: "6.4vw" } }}>
            <HeroTitleText sx={{ marginBottom: 1 }}>
              We're all in this together
            </HeroTitleText>
            <Typography sx={{
              color: "#777",
              marginBottom: 4,
              fontSize: "1.4rem",
            }}>
              Hey, you are not alone on this journey! Share anything you find helpful. Ideas, notes, puzzles, mindmaps, ANYTHING.
              <p>Please do note that sharing your answers directly is strictly prohibited on Unicamp. We encourage thoughtful discussions.</p>
            </Typography>
          </Box>
          <HeroImg src={`${process.env.PUBLIC_URL}/discuss.jpg`} maxWidth="min(50rem, 48%)" />
        </HeroContainer>

        <MenuTitle>
          Courses For U
        </MenuTitle>
        <CourseMenu courseList={courseList} />
      </MenuContainer>
    </MainContainer>
  )
};

export default MainPage
