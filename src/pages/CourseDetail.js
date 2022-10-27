
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

const CommentsField = styled("div")(({ theme }) => ({
    width: "100%",
    maxWidth: "1200px",
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(4, 0, 0, 0),
    },
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4, 2, 0, 2),
    },
}));

const Comment = styled(Card)(({ theme }) => ({
    marginBottom: 16,
    borderRadius: 12,
    "&:hover": {
        borderColor: theme.palette.primary.main,
    },                                  
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
            
            <CommentsField>
                <Comment variant="outlined">
                    <CardHeader
                        avatar={<Avatar>您</Avatar>}
                        title="陈璟璨"
                        action={<IconButton color="error"> <ClearIcon /> </IconButton>}
                    />
                    <CardContent>
                        <Typography>
                            天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。
                            云腾致雨，露结为霜。金生丽水，玉出昆冈。剑号巨阙，珠称夜光。果珍李柰，菜重芥姜。
                            海咸河淡，鳞潜羽翔。龙师火帝，鸟官人皇。始制文字，乃服衣裳。推位让国，有虞陶唐。
                            吊民伐罪，周发殷汤。坐朝问道，垂拱平章。爱育黎首，臣伏戎羌。遐迩一体，率宾归王。
                            鸣凤在竹，白驹食场。化被草木，赖及万方。盖此身发，四大五常。恭惟鞠养，岂敢毁伤。
                            女慕贞洁，男效才良。知过必改，得能莫忘。罔谈彼短，靡恃己长。信使可覆，器欲难量。
                            墨悲丝染，诗赞羔羊。景行维贤，克念作圣。德建名立，形端表正。空谷传声，虚堂习听。
                            祸因恶积，福缘善庆。尺璧非宝，寸阴是竞。资父事君，曰严与敬。孝当竭力，忠则尽命。
                            临深履薄，夙兴温凊。似兰斯馨，如松之盛。川流不息，渊澄取映。容止若思，言辞安定。
                            笃初诚美，慎终宜令。荣业所基，籍甚无竟。学优登仕，摄职从政。存以甘棠，去而益咏。
                            乐殊贵贱，礼别尊卑。上和下睦，夫唱妇随。外受傅训，入奉母仪。诸姑伯叔，犹子比儿。
                            孔怀兄弟，同气连枝。交友投分，切磨箴规。仁慈隐恻，造次弗离。节义廉退，颠沛匪亏。
                        </Typography>
                    </CardContent>
                </Comment>
                <Comment variant="outlined" sx={{ cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
                    <CardHeader
                        avatar={<Avatar>哈</Avatar>}
                        title="正义的伙伴"
                        action={<IconButton color="error"> <ClearIcon /> </IconButton>}
                    />
                    <CardContent>
                        <Typography>
                            人之初，性本善。性相近，习相远。苟不教，性乃迁。教之道，贵以专。昔孟母，择邻处。子不学，断机杼。
                            窦燕山，有义方。教五子，名俱扬。养不教，父之过。教不严，师之惰。子不学，非所宜。幼不学，老何为。
                            玉不琢，不成器。人不学，不知义。为人子，方少时。亲师友，习礼仪。香九龄，能温席。孝于亲，所当执。
                            融四岁，能让梨。弟于长，宜先知。首孝悌，次见闻。知某数，识某文。一而十，十而百。百而千，千而万。
                            三才者，天地人。三光者，日月星。三纲者，君臣义。父子亲，夫妇顺。曰春夏，曰秋冬。此四时，运不穷。
                            曰南北，曰西东。此四方，应乎中。曰水火，木金土。此五行，本乎数。十干者，甲至癸。十二支，子至亥。
                            曰黄道，日所躔。曰赤道，当中权。赤道下，温暖极。我中华，在东北。曰江河，曰淮济。此四渎，水之纪。
                            曰岱华，嵩恒衡。此五岳，山之名。曰士农，曰工商。此四民，国之良。曰仁义，礼智信。此五常，不容紊。
                            地所生，有草木。此植物，遍水陆。有虫鱼，有鸟兽。此动物，能飞走。稻粱菽，麦黍稷。此六谷，人所食。
                        </Typography>
                        <Typography
                            variant="body2"
                            align="right"
                            sx={{ marginTop: 1, display: expanded ? "none" : "block", }}
                            children={"(114514 Replies)"}
                        />
                    </CardContent>
                    <Collapse in={expanded} unmountOnExit>
                        <CardContent sx={{ paddingTop: 0 }}>
                            人之初，性本善。性相近，习相远。苟不教，性乃迁。教之道，贵以专。昔孟母，择邻处。子不学，断机杼。
                            窦燕山，有义方。教五子，名俱扬。养不教，父之过。教不严，师之惰。子不学，非所宜。幼不学，老何为。
                            玉不琢，不成器。人不学，不知义。为人子，方少时。亲师友，习礼仪。香九龄，能温席。孝于亲，所当执。
                            融四岁，能让梨。弟于长，宜先知。首孝悌，次见闻。知某数，识某文。一而十，十而百。百而千，千而万。
                            三才者，天地人。三光者，日月星。三纲者，君臣义。父子亲，夫妇顺。曰春夏，曰秋冬。此四时，运不穷。
                            曰南北，曰西东。此四方，应乎中。曰水火，木金土。此五行，本乎数。十干者，甲至癸。十二支，子至亥。
                            曰黄道，日所躔。曰赤道，当中权。赤道下，温暖极。我中华，在东北。曰江河，曰淮济。此四渎，水之纪。
                            曰岱华，嵩恒衡。此五岳，山之名。曰士农，曰工商。此四民，国之良。曰仁义，礼智信。此五常，不容紊。
                            地所生，有草木。此植物，遍水陆。有虫鱼，有鸟兽。此动物，能飞走。稻粱菽，麦黍稷。此六谷，人所食。
                        </CardContent>
                    </Collapse>
                </Comment>
            </CommentsField>
        </MainContainer >
    )
};
