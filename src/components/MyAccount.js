import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
  }))

const MyAccount = ({ account, contracts, balance, isBlocked, incurredDebt, potentialDebt}) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid container direction='column'>
                <Typography variant='h1'>Hello</Typography>
            </Grid>
        </div>
    )
}

export default MyAccount
