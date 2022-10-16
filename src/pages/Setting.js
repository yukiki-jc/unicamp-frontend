import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
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
    padding: theme.spacing(2, "10vw"),
  },
}));

const Title = styled('div')(({ theme }) => ({

}));

const FormItem = styled('div')(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down('sm')]: {
    flexDirection: "column",
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: "row",
  },
  padding: theme.spacing(2, 0),
}));

const LeftFormItem = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: "100%",
  },
  [theme.breakpoints.up('sm')]: {
    width: "30%",
  },
}));

const RightFormItem = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: "100%",
  },
  [theme.breakpoints.up('sm')]: {
    width: "70%",
  },
  display: "flex",
  flexDirection: "column",
}));

const SubformItem = styled('div')(({ theme }) => ({
  paddingBottom: "16px",
  display: "flex",
  [theme.breakpoints.down('md')]: {
    flexDirection: "column",
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: "row",
  },
}));

const Caption = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  paddingBottom: "32px",
}));

const SingleTextField = styled(FormControl)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: "100%",
  },
  [theme.breakpoints.only('sm')]: {
    width: "100%",
    maxWidth: "350px",
  },
  [theme.breakpoints.up('md')]: {
    width: "75%",
  },
}));

const HalfTextField = styled(FormControl)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: "100%",
  },
  [theme.breakpoints.only('sm')]: {
    width: "100%",
    maxWidth: "350px",
  },
  [theme.breakpoints.up('md')]: {
    width: "50%",
  },
}));

const NoneFormHelperText = styled(FormHelperText)(({ theme }) => ({
  userSelect: "none"
}));

const SettingPage = props => {
  return (
    <Base>
      <div>
        <Typography variant='h2' children='Profile & Setting' />
        <Caption variant='subtitle2'>
          Click Apply Button to Save Changes
        </Caption>
      </div>
      <FormItem>
        <LeftFormItem>
          <Typography variant='h6' children='Account' />
          <Caption variant='subtitle2'>
            Account Data
          </Caption>
        </LeftFormItem>
        <RightFormItem>
          <SubformItem>
            <SingleTextField variant="outlined">
              <OutlinedInput
                disabled
                value="abc@xyz.com"
              />
              <NoneFormHelperText> Email Address </NoneFormHelperText>
            </SingleTextField>
          </SubformItem>
          <SubformItem>
            <HalfTextField variant="outlined" sx={{ paddingRight: { sm: 0, md: "6px" } }}>
              <OutlinedInput placeholder='这个 Placeholder 里要写些啥呢'/>
              <NoneFormHelperText> Old Password </NoneFormHelperText>
            </HalfTextField>
            <HalfTextField variant="outlined" sx={{ paddingLeft: { sm: 0, md: "6px" } }}>
              <OutlinedInput placeholder='这个 Placeholder 里又要写些啥呢'/>
              <NoneFormHelperText> New Password </NoneFormHelperText>
            </HalfTextField>
          </SubformItem>
        </RightFormItem>
      </FormItem>
      <FormItem>
        <LeftFormItem>
          <Typography variant='h6' children='Personal Information' />
          <Caption variant='subtitle2'>
            About You
          </Caption>
        </LeftFormItem>
        <RightFormItem>
          <SubformItem>
            <SingleTextField variant="outlined">
              <OutlinedInput
                multiline
                rows={6}
                placeholder="Write something about yourself ..."
              />
              <NoneFormHelperText> About </NoneFormHelperText>
            </SingleTextField>
          </SubformItem>
        </RightFormItem>
      </FormItem>
    </Base>
  );
};

export default SettingPage;
