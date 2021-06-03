import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Title from '../smallComponents/Title'
import TransactionsTable from '../smallComponents/TransactionsTable'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    mainGrid: {
        flexGrow: 1,
        marginTop: '50px'
    },
    subtitle:{
        marginTop: '5px',
        fontSize: '1.9rem'
    }
  }))

const TransactionsOverview = ({contracts, account}) => {

    const classes = useStyles()


    return (
        <div className={classes.root}>
            <Grid container direction='column' className={classes.mainGrid} spacing={2}>
                <Title title={'Transactions Overview'}/>
                    <Grid item sm={12} md={12} container>
                        <Grid item sm={false} md={1}/>
                        {
                            contracts.length > 0
                            ? <Grid item sm={10} md={10}><TransactionsTable contracts={contracts} account={account}/></Grid>
                            : <Typography variant='h6'>No Transactions to Show</Typography>
                        }
                        <Grid item sm={false} md={1}/>
                    </Grid>
                </Grid>
        </div>
    )
}

export default TransactionsOverview