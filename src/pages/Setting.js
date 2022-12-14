import React, { useContext, useLayoutEffect } from 'react';
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
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { getRequest, postRequest } from '../utils/requests';
import { apiPath, backend } from '../utils/urls';
import { joinPaths } from '@remix-run/router';
import { getUser, saveUser } from '../utils/storeUser';
import { PageContext } from '../App';
import RoundAvatar from '../components/RoundAvatar';
import { errorHandler } from '../utils/functions'

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
    marginBottom: "16px",
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

const SubFormItem = styled('div')(({ theme }) => ({
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

const AvatarSetting = styled('div')(({ theme }) => ({
  display: "flex",
}));

function fileToBase64Async(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      resolve(e.target.result);
    };
  });
}

const uploadAvatar = (pageContextValue, setAvatar, event) => {
  const targetImage = event.target.files;
  if (targetImage?.length > 0 && /image\/.+/.test(targetImage[0].type)) {
    let avatar = targetImage[0];
    if (avatar.size >= 65536) {
      pageContextValue.handler.setErrorBox("File too large!");
      return;
    }
    const userData = getUser();
    let newUserData = { ...userData }
    fileToBase64Async(avatar).then((base64) => {
      const setAvatarURL = joinPaths([backend, apiPath.avatar.set])
      const avatarBody = {
        img: base64
      }
      newUserData.avatar = base64
      return postRequest(avatarBody, setAvatarURL)
    }).then((json => {
      if (json.state === true) {
        pageContextValue.handler.setSuccessBox("Set Successfully");
        saveUser(newUserData);
        setAvatar(newUserData.avatar);
      }
      else {
        pageContextValue.handler.setErrorBox(json.message)
      }
    })).catch(e => {
      console.log(e);
      pageContextValue.handler.setErrorBox("Connect Error");
    });
  } else {
    pageContextValue.handler.setErrorBox("Invalid image file");
  }
}

const SettingPage = props => {
  const [showPassword, setShowPassword] = React.useState(false);
  const user = getUser();
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

      case "applySuccess":
        return {
          ...form,
          account: {
            ...form.account,
            password: {
              ...form.account.password,
              oldValue: '',
              newValue: '',
            }
          },
          info: {
            ...form.info,
            about: {
              ...form.info.about
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

  const pageContextValue = useContext(PageContext);
  useLayoutEffect(() => {
    const profileURL = joinPaths([backend, apiPath.profile.myprofile]);
    getRequest(profileURL).then((json) => {
      dispatchForm({ type: 'about', value: json.description })
    }).catch(e => {
      errorHandler(e, pageContextValue);
    })
  }, []);

  const applyChange = React.useCallback(() => {
    let toPost = []
    pageContextValue.handler.setLoading(true);
    if (form.account.password.oldValue !== "" && form.account.password.newValue !== "") {
      const password = {
        "oldPassword": form.account.password.oldValue,
        'newPassword': form.account.password.newValue
      }
      const changePasswordURL = joinPaths([backend, apiPath.reset.password])
      toPost.push(postRequest(password, changePasswordURL));
    }
    if (form.info.about.initValue !== form.info.about.value) {
      const about = {
        "name": user.name,
        'description': form.info.about.value,
      }
      const changeProfileURL = joinPaths([backend, apiPath.profile.update])
      toPost.push(postRequest(about, changeProfileURL));
    }
    Promise.all(toPost).then((results => {
      let state = true;
      let message = '';
      results.forEach(result => {
        if (result.state === false) {
          state = false;
          message = result.message;
        }
      })
      if (state === false) {
        pageContextValue.handler.setErrorBox(message);
        pageContextValue.handler.setLoading(false);
      }
      else {
        dispatchForm({ type: "applySuccess" });
        pageContextValue.handler.setSuccessBox("Succesfully Updated");
        pageContextValue.handler.setLoading(false);
      }
    })).catch(e => {
      pageContextValue.handler.setErrorBox("Connect Error");
    })
    // window.history.back();
  }, [form]);

  const [avatarNow, setAvatarNow] = React.useState(getUser()?.avatar);
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
          <SubFormItem>
            <SingleTextField variant="outlined">
              <OutlinedInput
                disabled
                value={user.name}
              />
              <NoneFormHelperText> Username </NoneFormHelperText>
            </SingleTextField>
          </SubFormItem>
          <SubFormItem>
            <HalfTextField variant="outlined" sx={{ paddingRight: { sm: 0, md: "6px" } }}>
              <OutlinedInput
                placeholder=''
                type="password"
                value={form.account.password.oldValue}
                onChange={event => dispatchForm({ type: "oldPassword", value: event.target.value })}
              />
              <NoneFormHelperText> Old Password </NoneFormHelperText>
            </HalfTextField>
            <HalfTextField variant="outlined" sx={{ paddingLeft: { sm: 0, md: "6px" } }}>
              <OutlinedInput
                placeholder=''
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
                onChange={event => dispatchForm({ type: "newPassword", value: event.target.value })}
              />
              <NoneFormHelperText> New Password </NoneFormHelperText>
            </HalfTextField>
          </SubFormItem>
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
          <SubFormItem>
            <SingleTextField variant="outlined">
              <AvatarSetting>
                <RoundAvatar sx={{ height: "3.6rem", width: "3.6rem" }} src={avatarNow} />
                <Tooltip title="Less than 64 kB">
                  <Button variant="outlined" sx={{ marginLeft: "16px" }} component="label" >
                    {"Upload"}
                    <input type="file" accept="image/*" onChange={(event) => { uploadAvatar(pageContextValue, setAvatarNow, event) }} hidden />
                  </Button>
                </Tooltip>
              </AvatarSetting>
              <NoneFormHelperText> Avatar </NoneFormHelperText>
            </SingleTextField>
          </SubFormItem>
          <SubFormItem>
            <SingleTextField variant="outlined">
              <OutlinedInput
                multiline
                rows={6}
                placeholder="Write something about yourself ..."
                value={form.info.about.value}
                onChange={event => dispatchForm({ type: "about", value: event.target.value })}
              />
              <NoneFormHelperText> About </NoneFormHelperText>
            </SingleTextField>
          </SubFormItem>
        </RightFormItem>
      </FormItem>
    </Base>
  );
};

export default SettingPage;
