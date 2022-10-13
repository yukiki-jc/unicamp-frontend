import { styled } from '@mui/material/styles'
import { Box } from '@mui/system'

const TitleBox = styled(props => <Box {...props} />)(({ theme }) => ({
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: 'background.paper'
}))
export default TitleBox;