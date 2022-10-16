import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import UnicampIcon from '../unicamp.png'
import { NestedMenuItem } from 'mui-nested-menu'
import { PageContext } from '../App'
import { Link as MUILink } from '@mui/material'
import { apiPath } from '../utils/urls'
import { joinPaths } from '@remix-run/router'
import { styled, alpha } from '@mui/material/styles'
import { LatoFont } from '../utils/commonData'

const SideLogo = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
  [theme.breakpoints.up('sm')]: {
    display: 'block',
    height: 64
  }
}))

const CenterLogo = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    height: 56
  },
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}))

const CenterBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexGrow: 1
  },
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}))


const AlignMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "6px 12px"
}));

const NavbarLinkButton = styled((props) => (
  <Button disableFocusRipple disableTouchRipple {...props} />
))(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 700,
  fontSize: "1.6rem",
  fontFamily: LatoFont,
  textTransform: 'capitalize',
  margin: theme.spacing(0, 1)
}))

const NavBar = props => {
  const [anchorElMenu, setAnchorElMenu] = React.useState(null)
  const [anchorElMenuCategory, setAnchorElMenuCategory] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const { admin, handleLogout, categoryList } = props;

  const handleOpenMenu = event => {
    setAnchorElMenu(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorElMenu(null)
  }

  const handleOpenMenuCategory = event => {
    setAnchorElMenuCategory(event.currentTarget)
  }
  const handleCloseMenuCategory = () => {
    setAnchorElMenuCategory(null)
  }

  const handleOpenUser = event => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUser = () => {
    setAnchorElUser(null)
  }
  const pageContextValue = React.useContext(PageContext)
  const loginMenuItem = pageContextValue.state.login
    ? [
      <MenuItem onClick={handleCloseUser}>
        <Typography textAlign='center'> Profile & Setting </Typography>
      </MenuItem>,
      <MenuItem onClick={props.handleLogout}>
        <Typography textAlign='center'> Logout </Typography>
      </MenuItem>
    ]
    : [
      <MenuItem onClick={handleCloseUser}>
        <MUILink href='/login' underline='none'>
          <Typography textAlign='center' color='gray'>
            {' '}
            Login{' '}
          </Typography>
        </MUILink>
      </MenuItem>
    ]

  const categoryMenuItems = parentOpen => props.categoryList.map(category => {
    const subcategoryMenuItems = category.subcategory.map(subCate => {
      return (
        <MenuItem>
          <MUILink
            href={joinPaths([
              apiPath.category.info,
              subCate.subcategoryId.toString()
            ])}
            underline='none'
          >
            <Typography textAlign='center' color='black'>
              {subCate.subcategoryName}
            </Typography>
          </MUILink>
        </MenuItem>
      )
    })
    return (
      <NestedMenuItem
        label={category.categoryName}
        parentMenuOpen={parentOpen}
      >
        {subcategoryMenuItems}
      </NestedMenuItem>
    )
  })


  const managementForXs = admin ? (
    <MenuItem onClick={handleCloseCategoryMenu}>
      <MUILink href='/coursemanagement' underline='none'><Typography textAlign='center'> Course Management</Typography></MUILink>
    </MenuItem>
  ) : null;
  const managementForMd = admin ? (
    <NavbarLinkButton onMouseOver={handleCloseCategoryMenu}>
      <MUILink href='/coursemanagement' underline='none'>Course Management</MUILink>
    </NavbarLinkButton>
  ) : null;

  return (
    <AppBar
      elevation={0}
      position='fixed'
      color='inherit'
      sx={theme => ({
        userSelect: 'none',
        background:
          'linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,1) 30%)'
      })}
    >

  const collectionMenuForXs = pageContextValue.state.login ? (<AlignMenuItem onClick={handleCloseMenuCategory}>
    <Typography textAlign='center'> Collection </Typography>
  </AlignMenuItem>) : null;
  const collectionMenuForMd = pageContextValue.state.login ? (<NavbarLinkButton onMouseOver={handleCloseMenuCategory}>
    Collection
  </NavbarLinkButton>) : null;
  return (
    <AppBar elevation={0} position="fixed" color="inherit" sx={(theme) => ({
      userSelect: "none",
      background: "linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,1) 30%)",
      paddingX: { xs: 0, md: "1vw", lg: "2vw" },
      paddingY: 1,
    })}>
      <Toolbar>
        <MUILink href='/' children={<SideLogo src={UnicampIcon} alt='' />} />
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={!!anchorElMenu}
            onClose={handleCloseMenu}
            sx={{
              display: { xs: 'block', md: 'none' }
            }}
          >
            <NestedMenuItem
              label={"Category"}
              parentMenuOpen={!!anchorElMenu}
            >
              {categoryMenuItems(!!anchorElMenu)}
            </NestedMenuItem>
            {collectionMenuForXs}
            {managementForXs}
          </Menu>
        </Box>
        <MUILink href='/' children={<CenterLogo src={UnicampIcon} alt='' />} />
        <CenterBox />

        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, marginLeft: 1 }}>
          <NavbarLinkButton onMouseOver={handleOpenMenuCategory}>
            Category
          </NavbarLinkButton>
          {collectionMenuForMd}
          {managementForMd}
        </Box>
        <Menu
          open={!!anchorElMenuCategory}
          anchorEl={anchorElMenuCategory}
          onClose={handleCloseMenuCategory}
          MenuListProps={{ onMouseLeave: handleCloseMenuCategory }}
        >
          {categoryMenuItems(!!anchorElMenuCategory)}
        </Menu>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton onMouseOver={handleOpenUser} sx={{ p: 0 }}>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' sx={{
              height: "3.6rem",
              width: "3.6rem",
            }} />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={!!anchorElUser}
            onClose={handleCloseUser}
            MenuListProps={{ onMouseLeave: handleCloseUser }}
          >
            {loginMenuItem}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
