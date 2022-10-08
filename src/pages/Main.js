import React from 'react'
import { Button } from '@mui/material'

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CourseThumbnailLine from '../components/CourseThunbnailLine';
import { styled } from '@mui/material/styles'
import { Link as MUILink } from '@mui/material';
const courseList = [
  {
    "id": 29,
    "category_id": 6,
    "name": "Course 1",
    "provider": "83",
    "difficulty": 63,
    "est_hour": 3
  },
  {
    "id": 95,
    "category_id": 97,
    "name": "Course 2",
    "provider": "5",
    "difficulty": 24,
    "est_hour": 54
  },
  {
    "id": 84,
    "category_id": 26,
    "name": "Course 3",
    "provider": "97",
    "difficulty": 3,
    "est_hour": 68
  },
  {
    "id": 80,
    "category_id": 75,
    "name": "Course 4",
    "provider": "20",
    "difficulty": 57,
    "est_hour": 98
  }
]

const MainPageCardContainer = styled(props => (
  <Container maxWidth='md' {...props} />
))(({ theme }) => ({
  padding: theme.spacing(4, 0)
}))


const MainPage = (props) => {
    return (
      <div>
      {/* <div>
        Main Page
        <br/>
        <Link
          className={classNames('nav-link')}
          to={'/login'} 
        > 
          <Button variant="contained">
          Turn to Login Page
          </Button>
        </Link>
      </div> */}
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Hello, CJC!
            </Typography>
          </Container>
        </Box>
        <MainPageCardContainer>
        <Stack
          // sx={{ pt: 1 }}
          direction='row'
          spacing={85}
          justifyContent='left'
        >
          <Typography gutterBottom variant="h6">Hot Courses</Typography>
          <MUILink href="#" underline="hover" sx={{pt:1}}>
            More
          </MUILink>
        </Stack>
        <CourseThumbnailLine courseList={courseList} />
        </MainPageCardContainer>
        
        <MainPageCardContainer>
        <Stack
          // sx={{ pt: 1 }}
          direction='row'
          spacing={85}
          justifyContent='left'
        >
          <Typography gutterBottom variant="h6">My Favorites</Typography>
          <MUILink href="#" underline="hover" sx={{pt:1}}>
            More
          </MUILink>
        </Stack>
        <CourseThumbnailLine courseList={courseList} />
        </MainPageCardContainer>

      </main>
    
    </div>
      
    )
 }

export default MainPage
