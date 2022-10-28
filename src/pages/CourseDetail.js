
import React, { useContext, useLayoutEffect, useState } from 'react';
import { PageContext } from '../App';
import { apiPath, backend } from '../utils/urls';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getRequest } from '../utils/requests';
import { joinPaths } from '@remix-run/router';
import { styled } from "@mui/material/styles";
import Iframe from 'react-iframe';
import { Box } from '@mui/system';
import { Avatar, Card, CardHeader, Collapse, CardContent, IconButton } from '@mui/material';
import { Breadcrumbs, Button, Grid, LinearProgress, Link, Rating, Skeleton, Stack, Typography } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab/';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { LatoFont, LevelMappings } from '../utils/commonData';
import { stylizeObject, reStylizeObject } from '../utils/functions';
import ClearIcon from '@mui/icons-material/Clear';

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

const CommentsTitle = styled(Typography)(({ theme }) => ({
    fontSize: "2.2rem",
    fontWeight: 700,
    marginTop: 12,
    marginLeft: 1,
    width: "100%"
}));

const CommentsField = styled("div")(({ theme }) => ({
    width: "100%",
    maxWidth: "1200px",
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 0, 0, 0),
    },
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(1, 2, 0, 2),
    },
}));

const Comment = styled(Card)(({ theme }) => ({
    marginBottom: 16,
    borderRadius: 12,
    "&:hover": {
        borderColor: theme.palette.primary.main,
    },
}));

const PointerContent = styled(CardContent)(({ theme }) => ({
    paddingTop: 0,
    cursor: "pointer",
}));

const CollapseField = styled(Typography)(({ theme }) => ({
    paddingTop: 0,
    paddingBottom: "0px !important",
}));

const ReplyField = styled(Timeline)(({ theme }) => ({
    paddingBottom: 0,
    [`& .${timelineItemClasses.root}:before`]: {
        flex: 0,
        padding: 0,
    },
}));

const ReplyItem = styled(TimelineContent)(({ theme }) => ({
    paddingTop: 0,
}));

const ReplyText = styled(Typography)(({ theme }) => ({
    paddingBottom: 8,
}));

const UnifiedHeader = styled((props) => (
    <CardHeader avatar={<div></div>} {...props} />
))(({ theme }) => ({
    padding: theme.spacing(0, 0, 0.75, 0),
    "& .MuiCardHeader-avatar": {
        display: "none"
    }
}));


const replayAt = (name) => {
    return <span>Reply <Link underline="none">{`@${name}`}</Link>: </span>
}

const replyHint = (count) => (<Typography
    variant="body2"
    align="right"
    sx={{ marginTop: 1 }}
    children={`(${count} Replies)`}
/>)

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

    // TODO: remove this afterwards
    const [expanded, setExpanded] = React.useState(false);

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

            <CommentsTitle children={"Comments"} />
            <CommentsField>
                <Comment variant="outlined">
                    <CardHeader
                        avatar={<Avatar>您</Avatar>}
                        title="陈璟璨"
                        action={<IconButton color="primary"> <ClearIcon /> </IconButton>}
                    />
                    <PointerContent>
                        <Typography>
                            你说得对，但是『你说的对』是由你说的对说你说得对的一款全新你说的对。你说的对发生在你说得「你说的对」的你说的对世界，在这里被你说的对选中的你说的对将被授予「你说的对」，引导你说的对之力。你说得对一位名为「你说的对」的你说得对，在你说的对旅行中邂逅你说的对、你说的对的你说的对们，和你说的对一起击败你说的对，寻找失散的你说的对，同时，你说得对「你说的对」的你说的对。
                        </Typography>
                    </PointerContent>
                </Comment>
                <Comment variant="outlined">
                    <CardHeader
                        avatar={<Avatar>蠢</Avatar>}
                        title="永雏塔菲"
                        subheader="12/32/2022 23:59:59"
                        action={<IconButton color="primary"> <ClearIcon /> </IconButton>}
                    />
                    <PointerContent onClick={() => setExpanded(!expanded)}>
                        <Typography>
                            「最最喜欢你，啊喵喵。」
                            <br />「什么程度？」
                            <br />「像勃艮第发射出的核导弹一样。」
                            <br />「核导弹？」啊喵喵再次扬起脸，「什么核导弹？」
                            <br />「繁华的街道，你一个人走在路上，忽然一枚核导弹以20马赫的速度向你奔来，他的光芒映入你的视网膜，温度温暖你的心房，你秀丽的身躯变为气体，最后和他融为一体。接着，光芒、冲击波和辐射开始向四周扩散，他带你走向你熟悉与陌生的每个地方，阻碍你的所有障碍也会被他完全摆平。你说棒不棒？」
                            <br />「太棒了。」
                            <br />「我就这么喜欢你。」
                        </Typography>
                        {replyHint(114514)}
                    </PointerContent>
                    <Collapse in={expanded} unmountOnExit>
                        <CollapseField>
                            <ReplyField>
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <Avatar>您</Avatar>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <ReplyItem>
                                        <UnifiedHeader
                                            title="陈璟璨"
                                            subheader="12/32/2022 23:61:07"
                                        />
                                        <ReplyText>
                                            别在这💈
                                        </ReplyText>
                                    </ReplyItem>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <Avatar>蠢</Avatar>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <ReplyItem>
                                        <UnifiedHeader
                                            title="永雏塔菲"
                                            subheader="12/32/2022 23:99:99"
                                        />
                                        <ReplyText>
                                            {replayAt("陈璟璨")} 好想和啊喵喵结婚啊，他直播养我，我就在家打游戏，像他事业心那么强的人肯定不会放下直播的，嘿嘿🤤🤤这样就能一直花啊喵喵的钱。他要开始直播我就拖着啊喵喵的腿不让他走，让他用他的小脚踹我🤤🤤又踹不动我只能恶狠狠的用性感的嗓音骂我大变态🤤🤤马上要迟到了却只能干着急地用小手砸我脑袋🤤🤤等啊喵喵直播结束我就嚷嚷让他煮饭给我吃🤤🤤睡觉时就抱着啊喵喵睡🤤🤤啊喵喵小小的，凉凉🤤🤤的力气小又挣扎不开​🤤🤤
                                        </ReplyText>
                                    </ReplyItem>
                                </TimelineItem>
                            </ReplyField>
                        </CollapseField>
                    </Collapse>
                </Comment>
            </CommentsField>
        </MainContainer >
    )
};
