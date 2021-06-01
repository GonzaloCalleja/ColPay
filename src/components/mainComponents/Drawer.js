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
  selected: {
    background: '#35353E',
    borderLeft: "5px solid #c3ddd2"
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

  const [accountSelected, setAccountSelected] = useState(true)
  const [createContractSelected, setCreateContractSelected] = useState(false)
  const [reviewSelected, setReviewSelectedSelected] = useState(false)
  const [uploadSelected, setUploadSelectedSelected] = useState(false)
  const [requestPaymentSelected, setRequestPaymentSelected] = useState(false)
  const [recurrentTransactionSelected, setRecurrentTransactionSelected] = useState(false)
  const [transactionOverviewSelected, setTransactionOverviewSelected] = useState(false)
  const [recipientsSelected, setRecipientsSelected] = useState(false)
  const [contractsOverviewSelected, setContractsOverviewSelected] = useState(false)
  const [moreSelected, setMoreSelected] = useState(false)

  const itemsList = [
    {
      text: 'MY ACCOUNT',
      className: classes.accountText,
      icon: null,
      spacing: null,
      button: true,
      state: accountSelected,
      onClick: () =>  {
        history.push(paths[0].appMain)
        setAccountSelected(true)
        setCreateContractSelected(false)
        setReviewSelectedSelected(false)
        setUploadSelectedSelected(false)
        setRequestPaymentSelected(false)
        setRecurrentTransactionSelected(false)
        setTransactionOverviewSelected(false)
        setRecipientsSelected(false)
        setContractsOverviewSelected(false)
        setMoreSelected(false)
      }
    },
    {
      text: 'CONTRACTS',
      className: classes.drawerTitle,
      icon: <ListItemIcon className={classes.drawerIcon}><DescriptionOutlinedIcon /></ListItemIcon>,
      spacing: <div className={classes.spacing} />,
      button: false,
    },
    {
      text: 'Create a Contract',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      state: createContractSelected,
      onClick: () => {
        history.push(paths[0].appCreateContract)
        setAccountSelected(false)
        setCreateContractSelected(true)
        setReviewSelectedSelected(false)
        setUploadSelectedSelected(false)
        setRequestPaymentSelected(false)
        setRecurrentTransactionSelected(false)
        setTransactionOverviewSelected(false)
        setRecipientsSelected(false)
        setContractsOverviewSelected(false)
        setMoreSelected(false)
      }
    },
    {
      text: 'Review a Contract',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      state: reviewSelected,
      onClick: () => {
        history.push(paths[0].appReviewContract)
        setAccountSelected(false)
        setCreateContractSelected(false)
        setReviewSelectedSelected(true)
        setUploadSelectedSelected(false)
        setRequestPaymentSelected(false)
        setRecurrentTransactionSelected(false)
        setTransactionOverviewSelected(false)
        setRecipientsSelected(false)
        setContractsOverviewSelected(false)
        setMoreSelected(false)
      }
    },
    {
      text: 'TRANSACTIONS',
      className: classes.drawerTitle,
      icon: <ListItemIcon className={classes.drawerIcon}><SyncAltOutlinedIcon /></ListItemIcon>,
      spacing: <div className={classes.spacing} />,
      button: false,
    },
    /*
    {
      text: 'Upload an Invoice',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      state: uploadSelected,
      onClick: () => {
        history.push(paths[0].appUpload)
        setAccountSelected(false)
        setCreateContractSelected(false)
        setReviewSelectedSelected(false)
        setUploadSelectedSelected(true)
        setRequestPaymentSelected(false)
        setRecurrentTransactionSelected(false)
        setTransactionOverviewSelected(false)
        setRecipientsSelected(false)
        setContractsOverviewSelected(false)
        setMoreSelected(false)
      }
    },
    */
    {
      text: 'Request a Payment',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      state: requestPaymentSelected,
      onClick: () => {
        history.push(paths[0].appRequest)
        setAccountSelected(false)
        setCreateContractSelected(false)
        setReviewSelectedSelected(false)
        setUploadSelectedSelected(false)
        setRequestPaymentSelected(true)
        setRecurrentTransactionSelected(false)
        setTransactionOverviewSelected(false)
        setRecipientsSelected(false)
        setContractsOverviewSelected(false)
        setMoreSelected(false)
      }
    },
    {
      text: 'Recurring Transaction',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      state: recurrentTransactionSelected,
      onClick: () => {
        history.push(paths[0].appRecurring)
        setAccountSelected(false)
        setCreateContractSelected(false)
        setReviewSelectedSelected(false)
        setUploadSelectedSelected(false)
        setRequestPaymentSelected(false)
        setRecurrentTransactionSelected(true)
        setTransactionOverviewSelected(false)
        setRecipientsSelected(false)
        setContractsOverviewSelected(false)
        setMoreSelected(false)
      }
    },
    {
      text: 'MY INFO',
      className: classes.drawerTitle,
      icon: <ListItemIcon className={classes.drawerIcon}><AccountCircleOutlinedIcon /></ListItemIcon>,
      spacing: <div className={classes.spacing} />,
      button: false,
    },

    {
      text: 'Contracts Overview',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      state: contractsOverviewSelected,
      onClick: () => {
        history.push(paths[0].appContractsOverview)
        setAccountSelected(false)
        setCreateContractSelected(false)
        setReviewSelectedSelected(false)
        setUploadSelectedSelected(false)
        setRequestPaymentSelected(false)
        setRecurrentTransactionSelected(false)
        setTransactionOverviewSelected(false)
        setRecipientsSelected(false)
        setContractsOverviewSelected(true)
        setMoreSelected(false)
      }
    },
    {
      text: 'Transactions Overview',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      state: transactionOverviewSelected,
      onClick: () => {
        history.push(paths[0].appTransactions)
        setAccountSelected(false)
        setCreateContractSelected(false)
        setReviewSelectedSelected(false)
        setUploadSelectedSelected(false)
        setRequestPaymentSelected(false)
        setRecurrentTransactionSelected(false)
        setTransactionOverviewSelected(true)
        setRecipientsSelected(false)
        setContractsOverviewSelected(false)
        setMoreSelected(false)
      }
    },
    {
      text: 'Partners',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      state: recipientsSelected,
      onClick: () => {
        history.push(paths[0].appRecipients)
        setAccountSelected(false)
        setCreateContractSelected(false)
        setReviewSelectedSelected(false)
        setUploadSelectedSelected(false)
        setRequestPaymentSelected(false)
        setRecurrentTransactionSelected(false)
        setTransactionOverviewSelected(false)
        setRecipientsSelected(true)
        setContractsOverviewSelected(false)
        setMoreSelected(false)
      }
    },
    {
      text: 'MORE',
      className: classes.drawerTitle,
      icon: <ListItemIcon className={classes.drawerIcon}><MoreHorizOutlinedIcon /></ListItemIcon>,
      spacing: <div className={classes.spacing} />,
      button: false,
    },
    {
      text: 'Payment Timings & Fees',
      className: classes.drawerText,
      icon: null,
      spacing: null,
      button: true,
      state: moreSelected,
      onClick: () => {
        history.push(paths[0].appMore)
        setAccountSelected(false)
        setCreateContractSelected(false)
        setReviewSelectedSelected(false)
        setUploadSelectedSelected(false)
        setRequestPaymentSelected(false)
        setRecurrentTransactionSelected(false)
        setTransactionOverviewSelected(false)
        setRecipientsSelected(false)
        setContractsOverviewSelected(false)
        setMoreSelected(true)
      }
    },
  ]

  const ListItems = (
    <div>
      <div className={classes.toolbar} />
      <div className={classes.spacing} />
      <List>
        {itemsList.map((item, index) => { 
          return(
            <div key ={index}>
            {item.spacing}
            {item.button 
              ? <ListItem className={ item.state ? classes.selected : classes.hoverList } dense button={item.button} onClick={item.onClick}>
                <ListItemText className={item.className} primary={item.text}/> 
                </ListItem>
              : <ListItem dense> {item.icon}
                <ListItemText className={item.className} primary={item.text}/> 
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