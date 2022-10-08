import React from 'react'
import { Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import fetchCourseDetail from '../utils/fetchCourseDetail'

export default function CourseThumbnail (props) {
  const { card } = props
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component='img'
        image='https://source.unsplash.com/random'
        alt='random'
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography gutterBottom variant='h6'>
          {card.name}
        </Typography>
        <Stack
          // sx={{ pt: 1 }}
          direction='column'
          // spacing={2}
          justifyContent='left'
        >
          <Typography gutterBottom>Provider: {card.provider}</Typography>
          <Typography gutterBottom>Difficulty: {card.difficulty}</Typography>
          <Typography gutterBottom>Learning Time: {card.est_hour}</Typography>
          <Button size='small' variant='contained' onClick={fetchCourseDetail}>
            View Details
          </Button>
        </Stack>
      </CardContent>
      {/* <CardActions sx={{ flexGrow: 1, pt: 0 }}> 
                
              </CardActions> */}
    </Card>
  )
}
