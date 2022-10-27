import React from 'react'
import { Button, Chip, } from '@mui/material'

import SchoolIcon from '@mui/icons-material/School';
import { Box } from "@mui/system";
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { LevelMappings } from '../utils/commonData'
import { styled } from '@mui/material/styles'
import { Link as MUILink } from '@mui/material'
import { apiPath } from '../utils/urls'
import { joinPaths } from '@remix-run/router'
import CardActions from '@mui/material/CardActions'

const CourseCardStack = styled(props => (
  <Stack direction='row' spacing={2.5} {...props} />
))(({ theme }) => ({
  fontWeight: 500
}))

const CourseCardStackItem = styled(({ icon, title, ...props }) => (
  <Box {...props}>
    {icon} {title}
  </Box>
))(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.2rem',
  color: theme.palette.text.secondary,
  whiteSpace: 'nowrap',
  '& svg': {
    fontSize: '1.8rem',
    marginRight: theme.spacing(0.5)
  }
}))

const CourseCardStackChip = styled(props => (
  <Chip color='primary' variant='outlined' size='small' {...props} />
))(({ theme }) => ({
  fontSize: '1.2rem',
  padding: theme.spacing(1.7, 0.5)
}))

const MyCardContent = ({ card }) => (
  <div>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
      <CourseCardStackItem title={card.provider} icon={<SchoolIcon />} />
      </Typography>
      <Typography variant='h5' component='div'>
        {card.name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color='text.secondary'></Typography>
      <Typography variant='body2'>
        {/* {LevelMappings[card.difficulty]}, {card.estHour} hrs */}
        <CourseCardStack>
          <CourseCardStackItem
            icon={
              <CourseCardStackChip label={LevelMappings[card.difficulty]} />
            }
          />
          <CourseCardStackItem
            icon={<CourseCardStackChip label={`${card.estHour} hrs.`} />}
          />
        </CourseCardStack>
      </Typography>
    </CardContent>
    <CardActions>
      <MUILink
        href={joinPaths([apiPath.course.info, card.id.toString()])}
        underline='none'
      >
        <Button size='small'>Learn More</Button>
      </MUILink>
    </CardActions>
  </div>
)

export default function CourseThumbnail (props) {
  const { card } = props
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      variant='outlined'
    >
      {/* <CardMedia
        component='img'
        image='https://source.unsplash.com/random'
        alt='random'
      /> */}
      {/* <CardContent sx={{ mb: 0, pb: 0 }}>
        <Typography gutterBottom variant='h6'>
          {card.name}
        </Typography>
        <Stack
          sx={{ pb: 0 }}
          direction='column'
          // spacing={2}
          justifyContent='left'
        >
          <StyledTypography>Provider: {card.provider}</StyledTypography>
          <StyledTypography>
            Difficulty: {LevelMappings[card.difficulty]}
          </StyledTypography>
          <StyledTypography>
            Learning Time: {card.est_hour} hrs
          </StyledTypography>
          <MUILink href={joinPaths([apiPath.course.info, card.id.toString()])} underline='none'>
            <Button
              size='small'
              variant='contained'
              sx={{ mt: 2, mb: 0 }}
            >
              View Details
            </Button>
          </MUILink>
        </Stack>
      </CardContent> */}
      <MyCardContent card={card} />
      {/* <CardActions sx={{ flexGrow: 1, pt: 0, alignSelf: 'center' }} > 
          
      </CardActions> */}
    </Card>
  )
}
