import React from "react"
import { useState, useEffect } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
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
  tabs: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-flex',
    },
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
    minWidth: '100px',
    display: 'block'
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

const Navbar = ({account, accountName, handleDrawerToggle, paths, loggedIn, setLoggedIn}) => {

  const classes = useStyles()
  let history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    const path = window.location.pathname
    if(path===paths[0].home){
      setShowLandingPage(true)
    }else{
      setShowLandingPage(false)
    }
  }, [])

  
  const [showLandingPage, setShowLandingPage] = useState(()=>{
    const path = window.location.pathname
    if(path===paths[0].appMain){
      return false
    }else{
      return true
    }
  })

  const [selectedTab, setSelectedTab] = useState(0)

  const isMenuOpen = Boolean(anchorEl)

  const handleChange = (event, newSelectedTab) => {

    if(selectedTab === newSelectedTab){
      setSelectedTab(0)
      history.push(paths[0].appMyAccount)
    }
    else if (newSelectedTab === 1){
      setSelectedTab(newSelectedTab)
      history.push(paths[0].appHelp)
    }
    else if (newSelectedTab === 2){
      setSelectedTab(newSelectedTab)
      history.push(paths[0].appTrends)
    }
  };

  const handleLandingChange = (event, newSelectedTab) => {

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
    setLoggedIn(false)
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
      {/*<MenuItem component={RouterLink} to= {paths[0].appMyProfile} onClick={handleMenuClose}>My Profile</MenuItem>*/}
      <MenuItem component={RouterLink} to= {paths[0].home} onClick={handleLogOut}>Logout</MenuItem>
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
          <Link component={RouterLink} to= {paths[0].home} variant='h4' color="inherit" className={classes.title} style={{ color: 'inherit', textDecoration: 'inherit'}} onClick={()=>{setSelectedTab(0);setShowLandingPage(true)}}>
            COLPAY
          </Link>
          <div className={classes.grow}>
            {showLandingPage
            ?
              <div className={classes.sectionDesktop}>
                <Tabs value={selectedTab} onChange={handleLandingChange}>
                  <Tab label='Home' className={classes.hide} component={ScrollLink} to="home" activeClass="active" spy={true} smooth={true} offset={-100} duration={500} style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                  <Tab label='About' className={classes.tabs} component={ScrollLink} to="about" activeClass="active" spy={true} smooth={true} offset={-100} duration={500} style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                  <Tab label='Service' className={classes.tabs} component={ScrollLink} to="services" activeClass="active" spy={true} smooth={true} offset={-100} duration={500} style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                  <Tab label='Contact' className={classes.tabs} component={ScrollLink} to="contact" activeClass="active" spy={true} smooth={true} offset={-100} duration={500} style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                </Tabs>
                <div className={classNames(classes.grow, classes.sectionDesktop)}>
                  <Button component={RouterLink} to={paths[0].appLogIn}  size='large' color="inherit" variant="outlined" className={classes.navLink} onClick={()=>{setShowLandingPage(!showLandingPage)}}>
                    Log In
                  </Button>
                  <Button component={RouterLink} to={paths[0].appSignUp}  size='large' color="secondary" variant="contained" className={classes.navLink} onClick={()=>{setShowLandingPage(!showLandingPage)}}>
                    Sign Up
                  </Button>
                </div>
              </div>
            :
              <div className={classes.sectionDesktop}>
                {
                <Tabs value={selectedTab} onChange={handleChange}>
                <Tab label='Home' className={classes.hide} component={RouterLink} to={paths[0].appReviewContract} activeClass="active" spy={true} smooth={true} offset={-100} duration={500} style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                  <Tab label='Help & Support' className={classes.tabs} activeClass="active" spy={true} smooth={true} offset={-100} duration={500} style={{ color: 'inherit', textDecoration: 'inherit'}}/>
                  <Tab label='Trends' className={classes.tabs} activeClass="active" spy={true} smooth={true} offset={-100} duration={500} style={{ color: 'inherit', textDecoration: 'inherit'}} 
                  classes={{
                    wrapper: classes.iconLabelWrapper,
                    labelContainer: classes.labelContainer
                  }}/>
                </Tabs>
                }
                {
                  loggedIn &&
                <div className={classNames(classes.grow, classes.sectionDesktop)}>
                  <Button
                    className={classNames(classes.navLink, classes.button)}
                    variant="outlined"
                    size='medium'
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
                }
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