
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SchoolIcon from '@mui/icons-material/School';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { postRequest, getRequest } from '../utils/requests';
import { backend, apiPath } from '../utils/urls';
import { PageContext } from '../App';
import { joinPaths } from '@remix-run/router';
import { errorHandler } from '../utils/functions'
export default function LoginPage(props) {
  const pageContextValue = React.useContext(PageContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginBody = {
      name: data.get('email'),
      password: data.get('password'),
    }
    const loginURL = joinPaths([backend, apiPath.login]);
    let userData = { ...loginBody }
    postRequest(loginBody, loginURL).then(json => {
      if (json.state === true) {
        const id = json.id;
        userData.id = id;
        userData.admin = json.admin;
        userData.token = json.token;
        const avatarURL = joinPaths([backend, apiPath.avatar.get, id.toString()])
        return getRequest(avatarURL);
      } else {
        pageContextValue.handler.setErrorBox(json.message);
        return false;
      }
    })
    .then(result => {
      if (result === false) {
        return false;
      }
      else {
        userData.avatar = result.img;
        props.handleLoginSuccess(userData);
      }
    })
    .catch(e => {
      errorHandler(e, pageContextValue);
    });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ userSelect: "none" }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <SchoolIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember my account"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up now!"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

    </Container>
  );
}
