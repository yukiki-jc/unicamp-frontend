import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright(props) {
  return (
    <Typography color="text.secondary" align="center" fontSize="1.2rem" {...props}>
      Made with 💜 in Fudan · Copyright ©
      <Link color="inherit" href="/">
        Unicamp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
