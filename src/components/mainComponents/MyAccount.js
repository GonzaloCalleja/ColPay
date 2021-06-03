import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import Title from '../smallComponents/Title'
import SingleFieldCard from '../smallComponents/SingleFieldCard'
import TwoFieldCard from '../smallComponents/TwoFieldCard'
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

const MyAccount = ({ contracts, balance, isBlocked, incurredDebt, potentialDebt, statusValues, paths}) => {

    const classes = useStyles()
    let history = useHistory();

    let activeContracts = 0

    for(let i=0; i<contracts.length; i++){
        if(contracts[i].statusName === statusValues[0].Accepted){
            activeContracts ++
        }
    }

    const cards = [
        {
            title: 'BALANCE',
            value: balance,
            unit: 'Eth',
            description: 'ColPay Tokens used in transactions in the Platform',
            action: 'TOP UP',
            onClick: () => history.push(paths[0].appMore)
        },
        {
            title: 'CONTRACTS',
            value: activeContracts,
            unit: 'Active Contracts',
            description: 'Currently active contracts you have with other ColPay users',
            action: 'CREATE A CONTRACT',
            onClick: () => history.push(paths[0].appCreateContract)
        },
    ]

    return (
        <div className={classes.root}>
            <Grid container direction='column' className={classes.mainGrid} spacing={2}>
                <Title title={'My Account'}/>
                <Grid item sm={12} md={12} container>
                    <Grid item sm={false} md={1}/>
                    <Grid item sm={12} md={10} container spacing={3}>
                        {cards.map((card, index)=>{
                            return(<Grid key={index} item sm={6} md={8/cards.length}><SingleFieldCard {...card}/></Grid>)
                        })}
                        <Grid item sm={6} md={4}>
                            <TwoFieldCard incurredDebt={incurredDebt} potentialDebt={potentialDebt} isBlocked={isBlocked}/>
                        </Grid>
                    </Grid>
                    <Grid item sm={false} md={1}/>
                </Grid>
                <Grid item sm={false} md={1}/>
                <Grid item sm={12} md={12} container>
                    <Grid item sm={false} md={1}/>
                    <Grid>
                        <Typography variant='h4'gutterBottom className={classes.subtitle}>
                            Active Contracts
                        </Typography>
                    </Grid>
                </Grid>
                    <Grid item sm={12} md={12} container>
                        <Grid item sm={false} md={1}/>
                        {
                            contracts.length > 0
                            ? <Grid item sm={10} md={10}><ContractsAndTransactionsTable contracts={contracts} statusValues={[statusValues[0].Accepted ]} allStatusValues={statusValues} reviewTable={false}/></Grid>
                            : <Typography variant='h6'>No Active Contracts to Show</Typography>
                        }
                        <Grid item sm={false} md={1}/>
                    </Grid>
                </Grid>
        </div>
    )
}

export default MyAccount
