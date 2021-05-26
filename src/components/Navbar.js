import React from "react"
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Toolbar, MenuItem, Menu, Link, Button, Tabs, Tab } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'


const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-flex',
    },

    flexGrow: 0,
    width: 'auto',
    marginRight: theme.spacing(8),
    marginLeft: theme.spacing(6),

  },
  sectionDesktop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  navLink: {
    textAlign: 'center',
    marginRight: theme.spacing(4),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      minWidth: '100px',
      display: 'block'
    }
  }
}));

const Navbar = () => {

  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)

  const [selectedTab, setSelectedTab] = useState(0)

  const isMenuOpen = Boolean(anchorEl)

  const handleChange = (event, newSelectedTab) => {
    setSelectedTab(newSelectedTab)
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <div className={classes.toolbar} />
      <AppBar position='fixed' elevation={0} className="not-scrolled">
        <Toolbar>
          <Link component={RouterLink} to= '/' variant='h4' color="inherit" className={classes.title} style={{ color: 'inherit', textDecoration: 'inherit'}} onClick={()=>{setSelectedTab(0)}}>
            COLPAY
          </Link>
          <div className={classes.grow}>
            <div className={classes.sectionDesktop}>
              <Tabs value={selectedTab} onChange={handleChange}>
                <Tab label='Home' className={classes.hide} style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                <Tab label='About' component={Link} to={window.location.pathname} href="/#about" style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                <Tab label='Services' component={Link} to={window.location.pathname} href="/#services" style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                <Tab label='Contact' component={Link} to={window.location.pathname} href="/#contact" style={{ color: 'inherit', textDecoration: 'inherit'}}/>
              </Tabs>
              <div className={classNames(classes.grow, classes.sectionDesktop)}>
                <Button component={RouterLink} to='/account'  size='large' color="inherit" variant="outlined" className={classes.navLink}>
                  Log In
                </Button>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
    );
}

export default Navbar;

/*
                    <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                </IconButton>


*/