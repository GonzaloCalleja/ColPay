import { Grid, Typography, Divider, Paper, Button, Avatar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Title from '../smallComponents/Title'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    mainGrid: {
        flexGrow: 1,
        marginTop: '50px'
    },
    subtitle: {
        marginTop: '10px',
        marginLeft: '15px'
    },
    low: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginTop: 10,
        marginBottom: 10,
      },

    stepper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
  }))

const RecurringTransaction = () => {

    const classes = useStyles()

    const steps = [
        {
            icon: <Avatar alt="Details" variant='square' className={classes.large} src="https://image.flaticon.com/icons/png/512/1484/1484924.png" />,
            title: '1. Details',
            description: 'Tell us how much you want to transfer, and to which contract you want to assign it.'
        },
        {
            icon: <Avatar alt="Set Up" variant='square' className={classes.large} src="https://image.flaticon.com/icons/png/512/4220/4220467.png" />,
            title: '2. Set Up',
            description: 'Set up a Standing Order from your Bank Account, so the funds are made available in the Platform.'
        },
        {
            icon: <Avatar alt="Transfer" variant='square' className={classes.large} src="https://image.flaticon.com/icons/png/512/2879/2879440.png" />,
            title: '3. We Transfer',
            description: 'Each month, we transfer money for you, until your contract gets paid.'
        },
        {
            icon: <Avatar alt="Fulfill" variant='square' className={classes.large} src="https://image.flaticon.com/icons/png/512/1505/1505471.png" />,
            title: '4. Fulfillment',
            description: 'After all payments are made your supplier will have received the full amount specified on the contract, and you only had to set it up once!'
        },
    ]

    return (
        <div className={classes.root}>
            <Grid container direction='column' className={classes.mainGrid} spacing={2}>
                <Title title={'Recurring Transactions'}/>
                    <Grid item sm={12} md={12} container>
                        <Grid item sm={false} md={1}/>
                        <Grid item item sm={10} md={10} >
                        <Paper>
                        <Grid container spacing={2}>
                            <Grid item sm={12}><Typography className ={classes.subtitle}>Save time and hassle by setting up a Recurring Transaction. Here's how it works.</Typography></Grid>
                            <Grid item sm={12}><Divider variant='middle'/></Grid>
                            <Grid item sm={12} container spacing={4}>
                            
                                {
                                    steps.map((step, key) =>(
                                        <Grid key={key} item sm={3}>
                                            <div className={classes.stepper}>
                                                {step.icon}
                                                <Typography align='center' color='primary' variant='h6' gutterBottom>{step.title}</Typography>
                                                <Typography variant='body2' align='center'>{step.description}</Typography>
                                            </div>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                            <Grid item sm={12}><Divider variant='middle'/></Grid>
                            <Grid item sm={12} >
                                <div className={classes.low}>
                                <Button className={classes.subtitle} variant="contained" color="primary" disabled >Get Started</Button>
                                <Typography className={classes.subtitle} variant="caption" color='textSecondary'>* This feature is not available in the prototype</Typography>
                                </div>
                            </Grid>
                        </Grid>
                        </Paper>
                        </Grid>
                        <Grid item sm={false} md={1}/>
                    </Grid>
                </Grid>
        </div>
    )
}

export default RecurringTransaction