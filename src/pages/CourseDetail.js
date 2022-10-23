
import React, { useContext, useLayoutEffect, useState } from 'react';
import { PageContext } from '../App';
import { apiPath, backend } from '../utils/urls';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getRequest } from '../utils/requests';
import { joinPaths } from '@remix-run/router';
import { styled } from "@mui/material/styles";
import Iframe from 'react-iframe';
import { Box } from '@mui/system';
import { Breadcrumbs, Button, Grid, LinearProgress, Link, Rating, Skeleton, Stack, Typography } from '@mui/material';
import { LatoFont, LevelMappings } from '../utils/commonData';
import { stylizeObject, reStylizeObject } from '../utils/functions';

const MainContainer = styled((props) => (
    <Box component="main" {...props} />
))(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(2, "4vw"),
    [theme.breakpoints.up("md")]: {
        alignItems: "start",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
}));

const EmbedContainer = styled(Box)(({ theme }) => ({
    width: "90vw",
    height: "52vw",
    border: "0.8px solid #ddd",
    backgroundColor: "#ddd",
    borderRadius: theme.shape.borderRadius * 3,
    overflow: "hidden",
    marginBottom: theme.spacing(3.5),
    cursor: "default",
    [theme.breakpoints.up("md")]: {
        width: "43vw",
        height: "32vw",
    },
    [theme.breakpoints.up("lg")]: {
        height: "26vw",
    },
    "&:hover": {
        borderColor: theme.palette.primary.main,
    },
}));

const EmbedContent = styled((props) => (
    <Iframe allowFullScreen={false} scrolling="yes" {...props} />
))(({ theme }) => ({
    width: "calc(90vw + 1.8rem)",
    height: "calc(52vw + 1.8rem)",
    border: "none",
    [theme.breakpoints.up("md")]: {
        width: "calc(43vw + 1.9rem)",
        height: "calc(32vw + 1.8rem)",
    },
    [theme.breakpoints.up("lg")]: {
        height: "calc(26vw + 1.8rem)",
    },
}));

const IntroContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0, 1),
    width: "100%",
    textAlign: "start",
    [theme.breakpoints.up("md")]: {
        width: "44vw",
    },
}));

const LinkRouter = styled((props) => (
    <Link
        component={RouterLink}
        color="GrayText"
        underline="hover"
        {...props}
    />
))(({ theme }) => ({
    fontSize: "1.3rem",
}));

const CourseDetailTitle = styled((props) => (
    <Typography component="h1" {...props} />
))(({ theme }) => ({
    fontFamily: LatoFont,
    fontSize: "2.7rem",
    fontWeight: 900,
    lineHeight: 1.15,
    whiteSpace: "pre-line",
    [theme.breakpoints.up("sm")]: {
        fontSize: "3.2rem",
    },
    [theme.breakpoints.up("md")]: {
        fontSize: "3.6rem",
    },
    [theme.breakpoints.up("lg")]: {
        fontSize: "4.8rem",
    },
}));

const CourseTagGrid = styled((props) => (
    <Grid container spacing={0.5} {...props} />
))(({ theme }) => ({
    margin: theme.spacing(2, 0, 3),
}));

const CourseTagGridItem = styled((props) => (
    <Grid item xs={12} sm={6} md={12} lg={6} {...props} />
), { shouldForwardProp: (prop) => prop !== "label" })(({ theme, label }) => ({
    fontSize: "1.5rem",
    fontWeight: 500,
    "&::before": {
        content: `"${label}: "`,
        color: "#777",
        fontWeight: 400,
    },
}));

const CourseDetailButtonStack = styled((props) => (
    <Stack spacing={2} {...props} />
))(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const CourseDetailButton = styled((props) => (
    <Button variant="contained" {...props} />
))(({ theme }) => ({
    borderRadius: "20rem",
    padding: theme.spacing(1.5, 2),
    width: "90%",
    maxWidth: "48rem",
    fontWeight: 600,
}));

const CourseDetailSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: "2.2rem",
    fontWeight: 700,
}));

const RatingStar = ({ sx, ...props }) => (
    <Rating
        readOnly
        precision={0.5}
        sx={(theme) => ({
            ...sx,
            // "& .MuiRating-iconFilled": {
            //     color: theme.palette.secondary.main,
            // },
        })}
        {...props}
    />
)

const RatingBar = ({ rating, value, maxValue }) => {
    return (
        <Box sx={{
            display: "flex",
            fontSize: "1.3rem",
            fontWeight: 700,
            alignItems: "center",
        }}>
            <RatingStar max={1} value={1} sx={{ marginRight: 0.5, }} />
            {rating}
            <LinearProgress
                variant="determinate"
                value={value / maxValue * 100}
                sx={{
                    height: "1.2rem",
                    flexGrow: 1,
                    marginX: 1.5,
                    borderRadius: "1rem",
                    "&.MuiLinearProgress-root": {
                        backgroundColor: "#f1f1f1",
                    },
                }}
            />
            {value}
        </Box>
    );
};

const RatingChart = ({ sx, rating, voters, distribution }) => {
    const maxValue = Math.max(...distribution) + 1;

    return (
        <Box sx={sx}>
            <CourseDetailSubtitle sx={{ marginTop: 3, }}>
                Ratings and Reviews
            </CourseDetailSubtitle>
            <Box sx={{
                marginTop: 2,
                marginX: 2,
                display: "flex",
                alignItems: "center",
                fontFamily: LatoFont,
                flexWrap: "nowrap",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <Typography sx={{
                        fontSize: "3.6rem",
                        fontWeight: 500,
                    }}>
                        {rating}
                    </Typography>
                    <RatingStar
                        precision={0.5}
                        size="small"
                        value={parseInt(rating)}
                    />
                    <Typography sx={{
                        color: "#777",
                        fontSize: "1.2rem",
                        marginTop: 1,
                    }}>
                        {voters} Ratings
                    </Typography>
                </Box>
                <Box sx={{
                    marginLeft: 5,
                    width: "100%",
                    maxWidth: "32rem",
                }}>
                    {distribution.reverse().map((val, idx) => (
                        <RatingBar
                            key={idx}
                            rating={5 - idx}
                            value={val}
                            maxValue={maxValue}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default function CourseDetailPage({ subcategoryList }) {
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const pageContextValue = useContext(PageContext);

    const {
        subcategoryId = 0,
        name,
        website,
        difficulty,
        estHour,
        provider,
        video,
        assignment,
        description,
    } = courseData || {};

    useLayoutEffect(() => {
        const courseDataURL = joinPaths([backend, apiPath.course.info, courseId]);
        pageContextValue.handler.setLoading(true);
        getRequest(courseDataURL)
            .then((data) => { 
                console.log(data);
                setCourseData(stylizeObject(data))
                pageContextValue.handler.setLoading(false);
            })
            .catch((e) => {
                console.log(e)
                pageContextValue.handler.setErrorBox('Connect Error')
                pageContextValue.handler.setLoading(false);
            });
    }, []);
    
    return (
        <MainContainer>
            <Breadcrumbs sx={{ width: "100%", flexShrink: 0, marginBottom: 3 }}>
                <LinkRouter to="/">
                    Home
                </LinkRouter>
                <LinkRouter to={joinPaths([apiPath.category.info, subcategoryId.toString()])}>
                    {(subcategoryId && subcategoryList.length > 0) ?
                        subcategoryList[subcategoryId - 1].subcategoryName :
                        <Skeleton variant="text" width="5rem" />
                    }
                </LinkRouter>
                <LinkRouter color="primary">
                    {name || <Skeleton variant="text" width="5rem" />}
                </LinkRouter>
            </Breadcrumbs>
            <Box>
                <EmbedContainer>
                    <EmbedContent url={website || "about:blank"} />
                </EmbedContainer>
                <RatingChart
                    rating="4.0"
                    voters={2023}
                    distribution={[0, 1, 3, 9, 5]}
                    sx={(theme) => ({
                        display: "none",
                        [theme.breakpoints.up("md")]: {
                            display: "block",
                            marginX: 1,
                        },
                    })}
                />
            </Box>
            <IntroContainer>
                <CourseDetailTitle>
                    {name || <Skeleton variant="text" />}
                </CourseDetailTitle>
                <CourseTagGrid>
                    <CourseTagGridItem label="Provider" sm={7} lg={7}>
                        {provider}
                    </CourseTagGridItem>
                    <CourseTagGridItem label="Level" sm={5} lg={5}>
                        {LevelMappings[difficulty]}
                    </CourseTagGridItem>
                    <CourseTagGridItem label="Category" sm={7} lg={7}>
                        {subcategoryId && subcategoryList.length && subcategoryList[subcategoryId].subcategoryName}
                    </CourseTagGridItem>
                    <CourseTagGridItem label="Time Cost" sm={5} lg={5}>
                        {estHour} hrs.
                    </CourseTagGridItem>
                </CourseTagGrid>
                <CourseDetailButtonStack>
                <CourseDetailButton href={website}>Course Website</CourseDetailButton>
                    <CourseDetailButton href={video}>Watch Lectures</CourseDetailButton>
                    <CourseDetailButton
                        color="inherit"
                        href={assignment}
                        sx={{ filter: "invert(1)", color: "#000" }}
                    >
                        Assignment
                    </CourseDetailButton>
                </CourseDetailButtonStack>
                <CourseDetailSubtitle sx={{ marginBottom: 0.5 }}>
                    Description
                </CourseDetailSubtitle>
                <Typography sx={{
                    color: "#666",
                    width: "96%",
                }}>
                    {description}
                </Typography>
                <RatingChart
                    rating="4.0"
                    voters={2023}
                    distribution={[0, 1, 3, 9, 5]}
                    sx={(theme) => ({
                        display: "block",
                        [theme.breakpoints.up("md")]: { display: "none" },
                    })}
                />
            </IntroContainer>
        </MainContainer >
    )
};
