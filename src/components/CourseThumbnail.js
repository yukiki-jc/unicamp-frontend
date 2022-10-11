import React from 'react'
import { Button } from '@mui/material'
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

const StyledTypography = styled(props => (
  <Typography gutterBottom {...props} />
))(({ theme }) => ({
  fontSize: '1.1rem',
  textTransform: 'capitalize',
  fontWeight: 600,
  whiteSpace: 'nowrap'
}))

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
      <CardMedia
        component='img'
        image='https://source.unsplash.com/random'
        alt='random'
      />
      <CardContent sx={{ mb: 0, pb: 0 }}>
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
      </CardContent>
      {/* <CardActions sx={{ flexGrow: 1, pt: 0, alignSelf: 'center' }} > 
          
      </CardActions> */}
    </Card>
  )
}
