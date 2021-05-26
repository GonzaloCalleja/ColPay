import React from "react"
import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link as ScrollLink} from "react-scroll";
import { AppBar, Toolbar, MenuItem, Menu, Link, Button, Tabs, Tab, Collapse, Typography, IconButton } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames'


const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
  zIndex: {
    zIndex: 1300,
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
  },
  button: {
    display: 'flex',
  },
  idMenuItem:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
}));

const Navbar = ({account, accountName, handleDrawerToggle}) => {

  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    const path = window.location.pathname
    if(path==='/app'){
      setShowLandingPage(false)
    }else{
      setShowLandingPage(true)
    }
  }, [])

  
  const [showLandingPage, setShowLandingPage] = useState(()=>{
    const path = window.location.pathname
    if(path==='/app'){
      return false
    }else{
      return true
    }
  })

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

  const handleLogOut = () => {
    handleMenuClose();
    setShowLandingPage(!showLandingPage)
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      TransitionComponent={Collapse}
      className={classes.dropDown}
      style={{marginTop: '53px'}}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem disabled className={classes.idMenuItem}>
        <Typography variant='caption'>ColPay ID</Typography>
        <Typography variant='overline'>{account}</Typography>
        </MenuItem>
      <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
      <MenuItem component={RouterLink} to= '/' onClick={handleLogOut}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <div className={classes.toolbar} />
      <AppBar position='fixed' elevation={0} className={classes.zIndex}>
        <Toolbar >
          <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          <Link component={RouterLink} to= '/' variant='h4' color="inherit" className={classes.title} style={{ color: 'inherit', textDecoration: 'inherit'}} onClick={()=>{setSelectedTab(0); setShowLandingPage(!showLandingPage)}}>
            COLPAY
          </Link>
          <div className={classes.grow}>
            {showLandingPage
            ?
              <div className={classes.sectionDesktop}>
                <Tabs value={selectedTab} onChange={handleChange}>
                  <Tab label='Home' className={classes.hide} component={ScrollLink} to="home" activeClass="active" spy={true} smooth={true} offset={-100} duration={500} style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                  <Tab label='About' component={ScrollLink} to="about" activeClass="active" spy={true} smooth={true} offset={-100} duration={500} style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                  <Tab label='Services' component={ScrollLink} to="services" activeClass="active" spy={true} smooth={true} offset={-100} duration={500} style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                  <Tab label='Contact' component={ScrollLink} to="contact" activeClass="active" spy={true} smooth={true} offset={-100} duration={500} style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                </Tabs>
                <div className={classNames(classes.grow, classes.sectionDesktop)}>
                  <Button component={RouterLink} to='/app'  size='large' color="inherit" variant="outlined" className={classes.navLink} onClick={()=>{setShowLandingPage(!showLandingPage)}}>
                    Log In
                  </Button>
                  <Button component={RouterLink} to='/app'  size='large' color="secondary" variant="contained" className={classes.navLink} onClick={()=>{setShowLandingPage(!showLandingPage)}}>
                    Sign Up
                  </Button>
                </div>
              </div>
            :
              <div className={classes.sectionDesktop}>
                <Tabs value={selectedTab} onChange={handleChange}>
                <Tab label='Home' className={classes.hide} component={ScrollLink} to="home" activeClass="active" spy={true} smooth={true} offset={-100} duration={500} style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                  <Tab label='Help & Support' component={ScrollLink} to="" activeClass="active" spy={true} smooth={true} offset={-100} duration={500} style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                  <Tab label='Trends' component={ScrollLink} to="" activeClass="active" spy={true} smooth={true} offset={-100} duration={500} style={{ color: 'inherit', textDecoration: 'inherit'}} 
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                    labelContainer: classes.labelContainer
                  }}/>
                </Tabs>
                <div className={classNames(classes.grow, classes.sectionDesktop)}>
                  <Button
                    className={classNames(classes.navLink, classes.button)}
                    variant="outlined"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                    endIcon={<ArrowDropDownIcon/>}
                  >
                    {accountName}
                  </Button>
                </div>
              </div>
            }
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
    );
}

export default Navbar;