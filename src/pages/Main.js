import React, { useState } from 'react'
import { Button } from '@mui/material'
import {styled} from "@mui/material/styles";
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const MainPageCardContainer = styled((props) => (
  <Container maxWidth="xl" {...props} />))(({theme,}) => ({
  padding: "128px 0",
}));

const MainPageCard = props => {
  const {courseList} = props;
  return (
    <MainPageCardContainer>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {courseList.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </MainPageCardContainer>
  )
}


class MainPage extends React.Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
      <div>
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
      </div>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="left"
              color="text.primary"
              gutterBottom
            >
              Hello, CJC!
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <MainPageCard courseList={[1, 2, 3]} />
      </main>
    
    </ThemeProvider>
      
    )
  }
}

export default MainPage
