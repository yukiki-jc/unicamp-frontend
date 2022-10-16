import Avatar from '@mui/material/Avatar'

const RoundAvatar = props => {
  const { sx } = props;

  {/* TODO: change `alt` prop to username */}
  {/* TODO: change `src` prop to user avatar path */}
  return (<Avatar alt={'换'} src='/' sx={sx} />)
}

export default RoundAvatar;
