import { useState } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  Hidden,
  ListItemText,
  ListItemIcon
} from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import SyncAltOutlinedIcon from '@material-ui/icons/SyncAltOutlined'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined'
import { BorderLeftOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  spacing: {
    minHeight: '12px',
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#1F1F29'
  },
  drawerText:{
    color: '#fff',
    paddingLeft: 35
  },
  hoverList: {
    '&:hover': {
      background: '#35353E',
      borderLeft: "5px solid #c3ddd2"
    },
  },
  accountText:{
    color: '#fff',
    '& span, & svg': {
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.fontWeightMedium
    },
    paddingLeft: 20
  },
  drawerTitle:{
    color: '#c3ddd2',
    '& span, & svg': {
      fontSize: theme.typography.body2.fontSize
    }
  },
  drawerIcon:{
    color: '#c3ddd2',
    minWidth: '35px'
  },
}))

const drawerWidth = 260

const Drawer = ({ window, mobileOpen, handleDrawerToggle, paths }) => {

  let history = useHistory();

  const classes = useStyles()
  const theme = useTheme()
  
  const container = window !== undefined ? () => window().document.body : undefined

  const itemsList = [
    {
      text: 'MY ACCOUNT',
      className: classes.accountText,
      icon: null,
      spacing: null,
      button: true,
      onClick: () => history.push(paths[0].appMyAccount)
    },
    {
      text: 'CONTRACTS',
      className: classes.drawerTitle,
      icon: <ListItemIcon className={classes.drawerIcon}><DescriptionOutlinedIcon /></ListItemIcon>,
      spacing: <div className={classes.spacing} />,
      button: false,
      onClick: null
    },
    {
      text: 'Create a Contract',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      onClick: () => history.push(paths[0].appCreateContract)
    },
    {
      text: 'Review a Contract',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      onClick: () => history.push(paths[0].appReviewContract)
    },
    {
      text: 'TRANSACTIONS',
      className: classes.drawerTitle,
      icon: <ListItemIcon className={classes.drawerIcon}><SyncAltOutlinedIcon /></ListItemIcon>,
      spacing: <div className={classes.spacing} />,
      button: false,
      onClick: null
    },
    {
      text: 'Upload an Invoice',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      onClick: () => history.push(paths[0].appUpload)
    },
    {
      text: 'Request a Payment',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      onClick: () => history.push(paths[0].appRequest)
    },
    {
      text: 'Recurring Transaction',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      onClick: () => history.push(paths[0].appRecurring)
    },
    {
      text: 'MY INFO',
      className: classes.drawerTitle,
      icon: <ListItemIcon className={classes.drawerIcon}><AccountCircleOutlinedIcon /></ListItemIcon>,
      spacing: <div className={classes.spacing} />,
      button: false,
      onClick: null
    },
    {
      text: 'Transactions Overview',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      onClick: () => history.push(paths[0].appTransactions)
    },
    {
      text: 'Recipients',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      onClick: () => history.push(paths[0].appTransactions)
    },
    {
      text: 'My Documents',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      onClick: () => history.push(paths[0].appDocuments)
    },
    {
      text: 'MORE',
      className: classes.drawerTitle,
      icon: <ListItemIcon className={classes.drawerIcon}><MoreHorizOutlinedIcon /></ListItemIcon>,
      spacing: <div className={classes.spacing} />,
      button: false,
      onClick: null
    },
    {
      text: 'Payment Timings & Fees',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      onClick: () => history.push(paths[0].appMore)
    },
  ]

  const ListItems = (
    <div>
      <div className={classes.toolbar} />
      <div className={classes.spacing} />
      <List>
        {itemsList.map((item, index) => { 
          const {text, className, icon, spacing, button, onClick} = item
          return(
            <div>
            {spacing}
            {button 
              ? <ListItem className={classes.hoverList} dense button={button} onClick={onClick}>
                <ListItemText className={className} primary={text}/> 
                </ListItem>
              : <ListItem dense> {icon}
                <ListItemText className={className} primary={text}/> 
                </ListItem>
            }          
            </div>
          )})}
        </List>
      </div>
  )
  
  return (
    <nav className={classes.drawer} >
      <Hidden smUp implementation="css">
        <MUIDrawer 
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true
              }}
              >
                {ListItems}
        </MUIDrawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <MUIDrawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {ListItems}
        </MUIDrawer>
      </Hidden>
    </nav>
  )
}

export default Drawer;