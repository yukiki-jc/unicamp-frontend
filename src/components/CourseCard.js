import { Card, Chip, Link, Rating, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SchoolIcon from '@mui/icons-material/School';
import StartIcon from '@mui/icons-material/East';
import { LatoFont, LevelMappings } from "../utils/commonData";
import { Link as RouterLink } from "react-router-dom";
import { joinPaths } from "@remix-run/router";
import { apiPath } from "../utils/urls";

const CourseCardContainer = styled((props) => (
    <Card elevation={0} {...props} />
))(({ theme }) => ({
    cursor: "default",
    borderRadius: 0,
    padding: theme.spacing(2.5, 1),
    borderBottom: "1px solid #dadada",
    "&:hover": {
        "& .course-description": {
            transition: "max-height 1s",
            maxHeight: "64rem",
            color: "#5a5a5a",
            "&::after": {
                bottom: "-50%",
            },
        },
    },
}));

const CourseCardStack = styled((props) => (
    <Stack direction="row" spacing={2.5} {...props} />
))(({ theme }) => ({
    fontWeight: 500,
}));

const CourseCardStackItem = styled(({ icon, title, ...props }) => (
    <Box {...props}>
        {icon} {title}
    </Box>
))(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    fontSize: "1.2rem",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    "& svg": {
        fontSize: "1.8rem",
        marginRight: theme.spacing(0.5),
    },
}));

const CourseCardStackChip = styled((props) => (
    <Chip color="primary" variant="outlined" size="small" {...props} />
))(({ theme }) => ({
    fontSize: "1.2rem",
    padding: theme.spacing(1.7, 0.5),
}));

export default function CourseCard({
    name, rating, voters, difficulty, time, description, provider, href, id
}) {
    return (
        <CourseCardContainer>
            <CourseCardStack sx={{ marginBottom: 1.3 }}>
                <CourseCardStackItem title={provider} icon={<SchoolIcon />} />
                <CourseCardStackItem title={`${voters} camper${voters > 1 ? "s" : ""}`} icon={<SupervisorAccountIcon />} />
            </CourseCardStack>
            <Typography sx={{
                fontSize: "1.8rem",
                fontWeight: 700,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                lineHeight: 1.3,
                marginBottom: 1,
                fontFamily: LatoFont,
                color: "inherit",
                textDecoration: "none",
            }} component={RouterLink} to={href}>
                {name}
            </Typography>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.3rem",
                fontWeight: 600,
                marginBottom: 1.5,
            }}>
                <Typography sx={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#666",
                }}>
                    {rating}
                </Typography>
                <Rating
                    size="small"
                    value={rating}
                    precision={0.5}
                    readOnly
                    sx={{
                        marginLeft: 0.5,
                        '& .MuiRating-iconFilled': {
                            color: '#b27c66',
                        },
                    }}
                />
            </Box>
            <Box sx={(theme) => ({
                height: "100%",
                maxHeight: "6.4rem",
                overflow: "hidden",
                fontSize: "1.4rem",
                lineHeight: 1.5,
                color: "#777",
                transition: "max-height 0.2s",
                position: "relative",
                marginBottom: 2,
                display: "-webkit-box",
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: "50%",
                    bottom: 0,
                    background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                },
            })} className="course-description">
                {description}
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <CourseCardStack>
                    <CourseCardStackItem icon={<CourseCardStackChip label={LevelMappings[difficulty]} />} />
                    <CourseCardStackItem icon={<CourseCardStackChip label={`${time} hrs.`} />} />
                </CourseCardStack>
                <Link
                    // color="inherit"
                    href={joinPaths([apiPath.course.info, id.toString()])}
                    sx={{
                        textTransform: "capitalize",
                        fontWeight: 500,
                        fontSize: "1.3rem",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    Learn more
                    <StartIcon sx={{ fontSize: "1.6rem", marginLeft: 0.5 }} />
                </Link>
            </Box>
        </CourseCardContainer>
    );
};