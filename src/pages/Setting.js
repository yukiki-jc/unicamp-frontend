import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';

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
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  [theme.breakpoints.down('md')]: {
    flexDirection: "column",
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  paddingBottom: "32px",
}));

const Confirm = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginTop: "8px",
    display: "flex",
    flexDirection: "row-reverse",
  },
  [theme.breakpoints.up('md')]: {
  },
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
  const [showPassword, setShowPassword] = React.useState(false);
  const [form, dispatchForm] = React.useReducer((form, action) => {
    switch (action.type) {
      case "oldPassword":
        return {
          ...form,
          account: {
            ...form.account,
            password: {
              ...form.account.password,
              oldValue: action.value,
            }
          }
        };

      case "newPassword":
        return {
          ...form,
          account: {
            ...form.account,
            password: {
              ...form.account.password,
              newValue: action.value,
            }
          }
        };

      case "about":
        return {
          ...form,
          info: {
            ...form.info,
            about: {
              ...form.info.about,
              value: action.value,
            }
          }
        };

      default:
        throw new Error();
    }
  }, {
    // TODO: fill correct initial value
    account: {
      password: {
        oldValue: "",
        newValue: "",
      }
    },
    info: {
      about: {
        initValue: "",
        value: "",
      }
    }
  });

  const applyChange = React.useCallback(() => {
    console.log(JSON.stringify(form));
    // TODO: fill this function
    window.history.back();
  }, [form]);

  return (
    <Base>
      <Title>
        <div>
          <Typography variant='h2' children='Profile & Setting' />
          <Caption variant='subtitle2'>
            Click APPLY Button to Save Changes
          </Caption>
        </div>
        <Confirm>
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => window.history.back()}
            >
              CANCEL
            </Button>
            <Button
              variant="outlined"
              onClick={applyChange}
            >
              APPLY
            </Button>
          </Stack>
        </Confirm>
      </Title>
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
              <NoneFormHelperText> Email Address (Immutable) </NoneFormHelperText>
            </SingleTextField>
          </SubformItem>
          <SubformItem>
            <HalfTextField variant="outlined" sx={{ paddingRight: { sm: 0, md: "6px" } }}>
              <OutlinedInput
                placeholder='这个 Placeholder 里要写些啥呢'
                type="password"
                value={form.account.password.oldValue}
                onChange={ event => dispatchForm({ type: "oldPassword", value: event.target.value }) }
              />
              <NoneFormHelperText> Old Password </NoneFormHelperText>
            </HalfTextField>
            <HalfTextField variant="outlined" sx={{ paddingLeft: { sm: 0, md: "6px" } }}>
              <OutlinedInput
                placeholder='这个 Placeholder 里又要写些啥呢'
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((showPassword) => !showPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={form.account.password.newValue}
                onChange={ event => dispatchForm({ type: "newPassword", value: event.target.value }) }
              />
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
                value={form.info.about.value}
                onChange={ event => dispatchForm({ type: "about", value: event.target.value }) }
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
