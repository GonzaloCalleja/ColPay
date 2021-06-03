import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Title from '../smallComponents/Title'
import ContractCreateStepper from '../smallComponents/ContractCreateStepper'

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

const ContractCreate = ({onCreateContract, AccountsToName, account}) => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid container direction='column' className={classes.mainGrid} spacing={2}>
                <Title title={'Crate a Contract'}/>
                    <Grid item sm={12} md={12} container>
                        <Grid item sm={false} md={1}/>
                        <Grid item sm={10} md={10}><ContractCreateStepper AccountsToName={AccountsToName} account={account} onCreateContract={onCreateContract}/></Grid>
                        <Grid item sm={false} md={1}/>
                    </Grid>
                </Grid>
        </div>
    )
}

export default ContractCreate