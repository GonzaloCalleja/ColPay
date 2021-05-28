import { Grid, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Title from '../smallComponents/Title'
import ContractsAndTransactionsTable from '../smallComponents/ContractsAndTransactionsTable'

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

const ContractsReview = ({contracts, statusValues, account, onAccept, onReject}) => {

    const classes = useStyles()


    return (
        <div className={classes.root}>
            <Grid container direction='column' className={classes.mainGrid} spacing={2}>
                <Title title={'Contracts Not yet Reviewed'}/>
                    <Grid item sm={12} md={12} container>
                        <Grid item sm={false} md={1}/>
                        {
                            contracts.length > 0
                            ? <Grid item sm={10} md={10}><ContractsAndTransactionsTable onReject={onReject} onAccept={onAccept} account={account} contracts={contracts} statusValues={[statusValues[0].NotReviewed]} allStatusValues={statusValues} reviewTable={true}/></Grid>
                            : <Typography variant='h6'>No Contracts to Show</Typography>
                        }
                        <Grid item sm={false} md={1}/>
                    </Grid>
                </Grid>
        </div>
    )
}

export default ContractsReview
