import { Card, Chip, Divider, Rating, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'
import { LatoFont } from '../utils/commonData';
import { Link as RouterLink } from "react-router-dom";
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { alpha, Box, Stack } from '@mui/system';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const LevelEmoji = ["👌", "🐣", "👨‍💻", "👩🏼‍🎓", "🤯"];

const ThumbnailCard = styled((props) => (
    <Card variant='outlined' {...props} />
))(({ theme }) => ({
    textAlign: "left",
    textTransform: "capitalize",
    borderRadius: theme.shape.borderRadius * 5,
    cursor: 'pointer',
    padding: theme.spacing(2.5, 2),
    width: "27rem",
    height: "23rem",
    transition: "all 0.2s",
    margin: theme.spacing(0, 1.5),
    "&:hover": {
        width: "32rem",
        backgroundColor: alpha(theme.palette.primary.main, 0.36),
    },
}));

const InfoStack = styled((props) => (
    <Stack direction="column" spacing={0.5} {...props} />
))(({ theme }) => ({
    fontWeight: 500,
}));

const InfoItem = styled(({ icon, title, ...props }) => (
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

export default function CourseThumbnail({
    name, href, category_id, provider, voters, rating, est_hour, difficulty,
}) {
    return (
        <ThumbnailCard>
            <InfoStack direction="row" spacing={1}>
                <Chip
                    sx={{
                        marginBottom: 1,
                        fontSize: '2rem',
                        paddingX: 0.3,
                        paddingY: 1.8,
                    }}
                    size="small"
                    color="primary"
                    label={LevelEmoji[difficulty - 1]}
                />
                <Chip
                    sx={{
                        marginBottom: 1,
                        fontSize: '1rem',
                        paddingX: 0.3,
                        paddingY: 1.8,
                    }}
                    size="small"
                    color="secondary"
                    label={category_id}
                />
            </InfoStack>
            <Typography sx={(theme) => ({
                fontSize: "1.6rem",
                fontWeight: 800,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                color: 'inherit',
                lineHeight: 1.35,
                marginBottom: 1,
                fontFamily: LatoFont,
                textDecoration: "none",
            })} component={RouterLink} to={href}>
                {name}
            </Typography>
            <Divider variant="middle" />
            <InfoStack sx={{ marginTop: 1 }}>
                <InfoItem title={provider} icon={<SchoolIcon />} />
                <InfoItem title={`${voters} camper${voters > 1 ? "s" : ""}`} icon={<SupervisorAccountIcon />} />
                <InfoItem title={`${est_hour} hrs.`} icon={<AccessAlarmIcon />} />
            </InfoStack>
            <Box sx={{
                marginTop: 1.5,
                display: "flex",
                alignItems: "center",
                fontWeight: 600,
            }}>
                <Typography sx={{
                    fontSize: "1.3rem",
                    fontWeight: 500,
                    color: "#6a6a6a",
                }}>
                    {rating}
                </Typography>
                <Rating
                    size="small"
                    value={rating}
                    precision={0.5}
                    readOnly
                    sx={(theme) => ({
                        marginLeft: 0.5,
                        "& .MuiRating-iconFilled": {
                            color: theme.palette.secondary.main,
                        },
                    })}
                />
                <Typography sx={{
                    fontSize: "1.1rem",
                    color: "#666",
                    marginLeft: 0.25,
                }}>
                    ({voters})
                </Typography>
            </Box>
        </ThumbnailCard>
    );
};