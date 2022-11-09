import Avatar from '@mui/material/Avatar'
import { getUser } from '../utils/storeUser';

const RoundAvatar = props => {
  const { sx, displayName } = props;
  // this chain stands for priviledge of displaying
  let name = displayName ?? getUser()?.name ?? 'X'
  let src = getUser()?.img ?? '/'
  return (<Avatar alt={name} sx={sx} src={src} />)
}

export default RoundAvatar;
