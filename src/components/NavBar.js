import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
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
import { Pageview } from '@mui/icons-material'

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

const NavbarLinkButton = styled(props => (
  <Button disableFocusRipple disableTouchRipple {...props} />
))(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 700,
  fontSize: '1.75rem',
  fontFamily: LatoFont,
  textTransform: 'capitalize',
  margin: theme.spacing(0, 1)
}))

const NavBar = props => {
  const [anchorElCategory, setAnchorElCategory] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const { admin, handleLogout, categoryList } = props;
  const handleOpenCategoryMenu = event => {
    setAnchorElCategory(event.currentTarget)
  }
  const handleCloseCategoryMenu = () => {
    setAnchorElCategory(null)
  }

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const pageContextValue = React.useContext(PageContext)
  const loginMenuItem = pageContextValue.state.login
    ? [
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign='center'> Profile </Typography>
        </MenuItem>,
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign='center'> Setting </Typography>
        </MenuItem>,
        <MenuItem onClick={handleLogout}>
          <Typography textAlign='center'> Logout </Typography>
        </MenuItem>
      ]
    : [
        <MenuItem onClick={handleCloseUserMenu}>
          <MUILink href='/login' underline='none'>
            <Typography textAlign='center' color='gray'>
              {' '}
              Login{' '}
            </Typography>
          </MUILink>
        </MenuItem>
      ]

  const categoryMenuItems = categoryList.map(category => {
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
            <Typography textAlign='center' color='gray'>
              {subCate.subcategoryName}
            </Typography>
          </MUILink>
        </MenuItem>
      )
    })
    return (
      <NestedMenuItem
        label={category.categoryName}
        parentMenuOpen={!!anchorElCategory}
      >
        {subcategoryMenuItems}
      </NestedMenuItem>
    )
  })
  const collectionMenuForXs = pageContextValue.state.login ? (
    <MenuItem onClick={handleCloseCategoryMenu}>
      <Typography textAlign='center'> Collection </Typography>
    </MenuItem>
  ) : null
  const collectionMenuForMd = pageContextValue.state.login ? (
    <NavbarLinkButton onMouseOver={handleCloseCategoryMenu}>
      Collection
    </NavbarLinkButton>
  ) : null

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
      <Toolbar>
        <MUILink href='/' children={<SideLogo src={UnicampIcon} alt='' />} />
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenCategoryMenu}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElCategory}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={!!anchorElCategory}
            onClose={handleCloseCategoryMenu}
            sx={{
              display: { xs: 'block', md: 'none' }
            }}
          >
            <MenuItem onClick={handleCloseCategoryMenu}>
              <Typography textAlign='center'> Category </Typography>
            </MenuItem>
            {collectionMenuForXs}
            {managementForXs}
          </Menu>
        </Box>
        <MUILink href='/' children={<CenterLogo src={UnicampIcon} alt='' />} />
        <CenterBox />
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            marginLeft: 1
          }}
        >
          <NavbarLinkButton onMouseOver={handleOpenCategoryMenu}>
            Category
          </NavbarLinkButton>
          {collectionMenuForMd}
          {managementForMd}
        </Box>
        <Menu
          open={!!anchorElCategory}
          anchorEl={anchorElCategory}
          onClose={handleCloseCategoryMenu}
          MenuListProps={{ onMouseLeave: handleCloseCategoryMenu }}
        >
          {categoryMenuItems}
        </Menu>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton onMouseOver={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt='Remy Sharp'
              src='/static/images/avatar/2.jpg'
              sx={{
                height: '3.6rem',
                width: '3.6rem'
              }}
            />
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
            onClose={handleCloseUserMenu}
            MenuListProps={{ onMouseLeave: handleCloseUserMenu }}
          >
            {loginMenuItem}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
