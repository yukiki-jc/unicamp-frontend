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
import SchoolIcon from '@mui/icons-material/School'
import { NestedMenuItem } from 'mui-nested-menu'
import { PageContext } from '../App'
import { Link as MUILink } from '@mui/material'
import { apiPath } from '../utils/urls'
import { joinPaths } from '@remix-run/router'

const NavBar = props => {
  const [anchorElCategory, setAnchorElCategory] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

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
        <MenuItem onClick={props.handleLogout}>
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

  const categoryMenuItems = props.categoryList.map(category => {
    const subCategoryMenuItems = category.subCategory.map(subCate => {
      return (
        <MenuItem>
          <MUILink
            href={joinPaths([
              apiPath.category.info,
              subCate.subCategoryId.toString()
            ])}
            underline='none'
          >
            <Typography textAlign='center' color='gray'>
              {subCate.subCategoryName}
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
        {subCategoryMenuItems}
      </NestedMenuItem>
    )
  })

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 500,
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            UNICAMP
          </Typography>

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
                <Typography textAlign='center'> CATEGORY </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseCategoryMenu}>
                <Typography textAlign='center'> COLLECTION </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 500,
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            UNICAMP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                marginLeft: '8px'
              }}
              onMouseOver={handleOpenCategoryMenu}
            >
              CATEGORY
            </Button>
            <Button
              onClick={handleCloseCategoryMenu}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                marginLeft: '8px'
              }}
            >
              COLLECTION
            </Button>
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
              <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
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
      </Container>
    </AppBar>
  )
}

export default NavBar
