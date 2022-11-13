import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import UnicampIcon from '../unicamp.png'
import RoundAvatar from './RoundAvatar'
import { NestedMenuItem } from 'mui-nested-menu'
import { PageContext } from '../App'
import { Link as MUILink } from '@mui/material'
import { apiPath } from '../utils/urls'
import { joinPaths } from '@remix-run/router'
import { styled } from '@mui/material/styles'
import { LatoFont } from '../utils/commonData'
import { alpha } from '@mui/material'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useSearchParams } from 'react-router-dom'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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
  const [searchValue, setSearchValue] = React.useState("");
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
      <MenuItem key={"1"} onClick={handleCloseUser}>
        <MUILink
          href={"/setting"}
          underline='none'
        >
          <Typography textAlign='center' color='black'>
            Profile & Setting
          </Typography>
        </MUILink>
      </MenuItem>,
      <MenuItem key={"2"} onClick={handleLogout}>
        <Typography textAlign='center'> Logout </Typography>
      </MenuItem>
    ]
    : [
      <MenuItem key={"0"} onClick={handleCloseUser}>
        <MUILink href='/login' underline='none'>
          <Typography textAlign='center' color='gray'>
            {' '}
            Login{' '}
          </Typography>
        </MUILink>
      </MenuItem>
    ]

  const categoryMenuItems = parentOpen => categoryList.map((category, idx) => {
    return (
      <NestedMenuItem
        label={category.categoryName}
        parentMenuOpen={parentOpen}
        key={idx}
      >
        {category.subcategory.map((subCate, idx) => (
          <MenuItem key={`item-${idx}`}>
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
        ))}
      </NestedMenuItem>
    )
  })


  const managementForXs = admin ? (
    <MenuItem onClick={handleCloseMenuCategory}>
      <MUILink href='/coursemanagement' underline='none'><Typography textAlign='center'> Course Management</Typography></MUILink>
    </MenuItem>
  ) : null;
  const managementForMd = admin ? (
    <NavbarLinkButton onMouseOver={handleCloseMenuCategory}>
      <MUILink href='/coursemanagement' underline='none'>Course Management</MUILink>
    </NavbarLinkButton>
  ) : null;

  const collectionMenuForXs = pageContextValue.state.login ? (<AlignMenuItem onClick={handleCloseMenuCategory}>
    <MUILink href='/favorites' underline='none'>
      <Typography textAlign='center'> My Favorites </Typography>
    </MUILink>
  </AlignMenuItem>) : null;
  const collectionMenuForMd = pageContextValue.state.login ? (<NavbarLinkButton onMouseOver={handleCloseMenuCategory}>
    <MUILink href='/favorites' underline='none'>
      My Favorites
    </MUILink>
  </NavbarLinkButton>) : null;

  const navigate = useNavigate()
  const handleSearchSubmit = (event) => {
    if (event.keyCode == 13) {
      console.log(searchValue);
      navigate('/search?value=' + searchValue);
      navigate(0);
    }
  }

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
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onKeyDown={handleSearchSubmit}
            onChange={(event) => { setSearchValue(event.target.value); }}
            value={searchValue}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton onMouseOver={handleOpenUser} sx={{ p: 0 }}>
            <RoundAvatar sx={{ height: "3.6rem", width: "3.6rem" }} />
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
