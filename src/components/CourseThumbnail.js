
import { Card, Chip, Divider, Typography, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles'
import { Link as MUILink } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { alpha, Box, Stack } from '@mui/system';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { apiPath } from '../utils/urls'
import { joinPaths } from '@remix-run/router'
import { LevelMappings } from "../utils/commonData";

const ThumbnailCard = styled((props) => (
    <Card variant='outlined' component={MUILink} underline="none" {...props} />
))(({ theme }) => ({
    textAlign: "left",
    textTransform: "capitalize",
    borderRadius: theme.shape.borderRadius * 5,
    padding: theme.spacing(2.5, 2),
    width: "27rem",
    height: "21rem",
    transition: "all 0.2s",
    margin: theme.spacing(0, 1.5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "&:hover": {
        width: "32rem",
        backgroundColor: alpha(theme.palette.primary.main, 0.12),
    },
}));

const InfoStack = styled((props) => (
    <Stack direction="column" spacing={0.75} {...props} />
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

const LevelColor = ["", "default", "info", "secondary", "warning", "error"];

export default function CourseThumbnail({
    name, href, subcategoryId, provider, voters, estHour, difficulty, subcategoryList, id
}) {
    return (
        <ThumbnailCard href={joinPaths([apiPath.course.info, id.toString()])}>
            <InfoStack direction="row" spacing={1}>
                <Chip
                    sx={{
                        marginBottom: 1,
                        fontSize: '1rem',
                        paddingX: 0.3,
                        paddingY: 1.8,
                    }}
                    size="small"
                    color="primary"
                    label={subcategoryId && subcategoryList && subcategoryList.length > 0 ? (
                        subcategoryList[subcategoryId - 1].subcategoryName
                    ) : (
                        <Skeleton variant='text' width='3rem' />
                    )}
                />
                <Chip
                    sx={{
                        marginBottom: 1,
                        fontSize: '1rem',
                        paddingX: 0.3,
                        paddingY: 1.8,
                    }}
                    size="small"
                    color={LevelColor[difficulty]}
                    label={LevelMappings[difficulty]}

                />
            </InfoStack>
            <Typography sx={(theme) => ({
                fontSize: "1.6rem",
                fontWeight: 600,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                color: 'inherit',
                lineHeight: 1.35,
                marginBottom: 1,
                textDecoration: "none",
            })}>
                {name}
            </Typography>
            <Divider variant="middle" />
            <InfoStack sx={{ marginTop: 1 }}>
                <InfoItem title={provider} icon={<SchoolIcon />} />
                <InfoItem title={`${voters || 0} camper${voters > 1 ? "s" : ""}`} icon={<SupervisorAccountIcon />} />
                <InfoItem title={`${estHour} hrs.`} icon={<AccessAlarmIcon />} />
            </InfoStack>
        </ThumbnailCard>
    );
};