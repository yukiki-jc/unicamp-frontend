import Avatar from '@mui/material/Avatar'
import { getUser } from '../utils/storeUser';

const RoundAvatar = props => {
  const { sx, displayName, src = null } = props;
  // this chain stands for priviledge of displaying
  const name = displayName ?? getUser()?.name ?? '✕'
  const avatarSrc = src ?? getUser()?.avatar ?? '/'
  return (<Avatar alt={name} sx={sx} src={avatarSrc} />)
}

export default RoundAvatar;
