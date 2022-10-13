import * as React from 'react'
import Box from '@mui/material/Box'
import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import { LevelMappings } from '../utils/commonData'
import {
  TextField,
  Grid,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material'
export default function CourseInfoModal (props) {
  const {
    subcategoryList,
    courseInfoModal,
    handleCloseModal,
    handleSubmit
  } = props
  const currentCourseDetail = courseInfoModal.currentCourseDetail
  const subCategoryOptions = subcategoryList.map(subcategory => (
    <MenuItem
      key={subcategory.subcategoryName}
      value={subcategory.subcategoryId}
    >
      {subcategory.subcategoryId.toString() +
        ': ' +
        subcategory.subcategoryName}
    </MenuItem>
  ))
  const subCategoryMenuItems = [
    <MenuItem key='none' value=''>
      None
    </MenuItem>
  ].concat(subCategoryOptions)

  const difficultyMenuItems = LevelMappings.map((level, index) => {
    if (index === 0)
      return (
        <MenuItem key='none' value={index}>
          None
        </MenuItem>
      )
    else {
      return (
        <MenuItem key={index} value={index}>
          {index.toString() + ': ' + level}
        </MenuItem>
      )
    }
  })
  const courseIdName =
    courseInfoModal.type === 'Add'
      ? [
          <Grid item xs={12}>
            <TextField
              required
              id='name'
              name='name'
              label='Course Name'
              fullWidth
              defaultValue={currentCourseDetail.name}
              variant='standard'
            />
          </Grid>
        ]
      : [
          <Grid item xs={2}>
            <TextField
              required
              id='courseId'
              name='courseId'
              label='Course ID'
              fullWidth
              defaultValue={currentCourseDetail.id}
              variant='standard'
              disabled
            />
          </Grid>,
          <Grid item xs={10}>
            <TextField
              required
              id='name'
              name='name'
              label='Course Name'
              fullWidth
              defaultValue={currentCourseDetail.name}
              variant='standard'
            />
          </Grid>
        ];
  return (
    <Dialog open={courseInfoModal.show}>
      <DialogTitle>{courseInfoModal.type + ' Course'}</DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {courseIdName}
            <Grid item xs={6}>
              <TextField
                id='subcategoryId'
                select
                fullWidth
                label='Subcategory ID'
                name='subcategoryId'
                defaultValue={currentCourseDetail.subcategoryId}
              >
                {subCategoryMenuItems}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id='difficulty'
                select
                fullWidth
                label='Difficulty'
                name='difficulty'
                defaultValue={currentCourseDetail.difficulty}
              >
                {difficultyMenuItems}
              </TextField>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                id='provider'
                name='provider'
                label='Provider'
                fullWidth
                defaultValue={currentCourseDetail.provider}
                variant='standard'
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                required
                id='estHour'
                name='estHour'
                label='Hours'
                fullWidth
                defaultValue={currentCourseDetail.estHour}
                variant='standard'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id='website'
                name='website'
                label='Website'
                fullWidth
                defaultValue={currentCourseDetail.website}
                variant='standard'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id='video'
                name='video'
                label='Video'
                fullWidth
                defaultValue={currentCourseDetail.video}
                variant='standard'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id='assignment'
                name='assignment'
                label='Assignment'
                fullWidth
                defaultValue={currentCourseDetail.assignment}
                variant='standard'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='description'
                label='Description'
                name='description'
                multiline
                fullWidth
                maxRows={5}
                defaultValue={currentCourseDetail.description}
              />
            </Grid>
          </Grid>
          <Stack
            spacing={3}
            justifyContent='right'
            direction='row'
            sx={{ mt: 3 }}
          >
            <Button variant='text' onClick={handleCloseModal}>
              Close
            </Button>
            <Button type='submit' variant='contained'>
              {courseInfoModal.type}
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
