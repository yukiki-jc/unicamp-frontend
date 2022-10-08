import { Card, CardContent, Chip, Grid, Rating, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/system";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const LevelMappings = ["all level", "beginner", "intermediate", "advanced", "expert"];

const CourseCardContainer = styled((props) => (
    <Card variant="outlined" sx={(theme) => ({
        borderRadius: "1.2rem",
        // transition: "transform 0.2s",
        // "&:hover": {
        //     transform: "scale(1.01)",
        //     borderColor: theme.palette.secondary.main,
        // },
    })}>
        <CardContent {...props} />
    </Card>
))(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    display: "flex",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(2.5, 3),
    },
    [theme.breakpoints.up("md")]: {
        padding: theme.spacing(2.5, 3.5),
    },
}));

const CourseCardImage = styled("img")(({ theme }) => ({
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius * 5,
    width: "14.4rem",
    height: "14.4rem",
    display: "block",
    [theme.breakpoints.up("sm")]: {
        width: "16.2rem",
        height: "16.2rem",
    },
    [theme.breakpoints.up("md")]: {
        width: "28.8rem",
        height: "16.2rem",
    },
}));

const CourseCardContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0.25, 0, 0, 1.5),
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    [theme.breakpoints.up("sm")]: {
        paddingLeft: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
        paddingLeft: theme.spacing(2.5),
    },
}));

const CourseCardTitleContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
}));

const CourseCardTitle = styled(Typography)(({ theme }) => ({
    marginRight: theme.spacing(1.5),
    lineHeight: 1.15,
    fontWeight: 700,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
    [theme.breakpoints.up("md")]: {
        fontSize: "1.75rem",
    },
}));

const CourseCardRow = styled((props) => (
    <Grid container columnSpacing={2} {...props} />
))(({ theme }) => ({
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    overflow: "hidden",
    alignItems: "center",
}));

const CourseCardRating = styled((props) => (
    <Grid item xs={12} sm={6.5} md={6} {...props} />
), { shouldForwardProp: (prop) => prop !== "rating" && prop !== "number" })(({ theme, rating, number }) => ({
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    "&::before": {
        content: `"${rating}"`,
        fontWeight: 600,
        fontSize: "1.3rem",
        marginRight: "3px",
    },
    "&::after": {
        content: `"(${number} ratings)"`,
        fontSize: "1.1rem",
        marginLeft: "3px",
        color: "#6a6a6a",
    },
}));

const CourseCardLevel = styled((props) => (
    <Grid item xs={12} sm={4} md={3} {...props} />
))(({ theme }) => ({
    fontSize: "1.1rem",
    textTransform: "capitalize",
    fontWeight: 600,
    whiteSpace: "nowrap",
    "&::before": {
        content: '"level: "',
        fontWeight: 400,
    },
}));

const CourseCardDescription = styled(Typography)(({ theme }) => ({
    fontSize: "1.1rem",
    color: "#555",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
    [theme.breakpoints.up("sm")]: {
        fontSize: "1.2rem",
    },
}));

const CourseCardTimeChip = styled((props) => (
    <Chip color="primary" {...props} />
))(({ theme }) => ({
    fontWeight: 800,
}));

export default function CourseCard({
    src, title, rating, voters, difficulty, time, description,
}) {
    return (
        <CourseCardContainer>
            <CourseCardImage src={src} />
            <CourseCardContent>
                <CourseCardTitleContainer>
                    <CourseCardTitle>{title}</CourseCardTitle>
                    <CourseCardTimeChip label={(
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <AccessAlarmIcon sx={{ marginRight: 0.5 }} /> {time} hrs.
                        </Box>
                    )} />
                </CourseCardTitleContainer>
                <CourseCardRow>
                    <CourseCardRating rating={rating} number={voters}>
                        <Rating
                            size="small"
                            value={rating}
                            precision={0.5}
                            readOnly
                        />
                    </CourseCardRating>
                    <CourseCardLevel>{LevelMappings[difficulty - 1]}</CourseCardLevel>
                </CourseCardRow>
                <CourseCardDescription className="course-description">
                    {description}
                </CourseCardDescription>
            </CourseCardContent>
        </CourseCardContainer>
    );
};