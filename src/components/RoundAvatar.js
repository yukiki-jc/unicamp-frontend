import Avatar from '@mui/material/Avatar'
import { getUser } from '../utils/storeUser';

const RoundAvatar = props => {
  const { sx } = props;
  const user = getUser();
  let name = 'X';
  if (user !== null) 
    name = user.name
  {/* TODO: change `alt` prop to username */}
  {/* TODO: change `src` prop to user avatar path */}
  return (<Avatar alt={name} src='/' sx={sx} />)
}

export default RoundAvatar;
