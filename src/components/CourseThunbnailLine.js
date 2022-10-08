import React from 'react'
import Grid from '@mui/material/Grid'

import CourseThumbnail from './CourseThumbnail'



export default function CourseThumbnailLine (props) {
    const { courseList } = props;
    return (

        <Grid container spacing={4}>
          {courseList.map(card => (
            <Grid item key={card.id} xs={12} sm={6} md={3}>
              <CourseThumbnail card={card} />
            </Grid>
          ))}
        </Grid>
    )
  }
  