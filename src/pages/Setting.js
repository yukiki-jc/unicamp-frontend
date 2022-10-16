import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles'

const Base = styled('main')(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 3.5),
  },
  [theme.breakpoints.only('sm')]: {
    padding: theme.spacing(2, 9.5),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, "20vw"),
  },
}));

const FormItem = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

const Caption = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  paddingBottom: "16px",
}));

const SingleTextField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: "100%",
  },
  [theme.breakpoints.only('sm')]: {
    width: "380px",
  },
  [theme.breakpoints.up('md')]: {
    width: "75%",
  },
}));

const SettingPage = props => {
  return (
    <Base>
    <Typography variant='h2' children='Profile & Setting' />
    <Caption variant='subtitle2' sx={{  }}>
      Click 'APPLY' to Save the Change 
    </Caption>
    <FormItem>
      <SingleTextField
        disabled
        label="Email Address"
        value="abc@xyz.com"
      />
    </FormItem>
    </Base>
  );
};

export default SettingPage;
