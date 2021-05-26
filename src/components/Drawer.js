import { useState } from 'react'
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  Hidden,
  ListItemText,
  Divider
} from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"

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
  drawerPaper: {
    width: drawerWidth,
  },
}))

const drawerWidth = 260

const Drawer = (props) => {

  const { window, mobileOpen, handleDrawerToggle } = props
  const classes = useStyles()
  const theme = useTheme()
  
  const container = window !== undefined ? () => window().document.body : undefined
  
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem button>
          <ListItemText primary='My Account'/> 
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary='CONTRACTS'/> 
        </ListItem>
        {["Create a Contract", "Accept/Reject a Contract", "Recurring Contract"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        <Divider/>
        <ListItem button>
          <ListItemText primary='TRANSACTIONS'/> 
        </ListItem>
        {["Upload an Invoice", "Request a Payment", "Recurring Transactions"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <Divider/>
        <ListItem button>
          <ListItemText primary='MY INFO'/> 
        </ListItem>
        {["Transactions Overview", "Recipients", "My Documents"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
           <Divider/>
        <ListItem button>
          <ListItemText primary='MORE'/> 
        </ListItem>
        {["Payment Timings", "Fees"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
      </List>
    </div>
  );

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
              {drawer}
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
          {drawer}
        </MUIDrawer>
      </Hidden>
    </nav>
  )
}

export default Drawer;