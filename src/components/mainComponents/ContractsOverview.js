import { Grid, Typography, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'

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

const ContractsOverview = ({contracts, statusValues}) => {

    const classes = useStyles()

    const [selectedStatus, setSelectedStatus] = useState([statusValues[0].NotReviewed, statusValues[0].Rejected, statusValues[0].Accepted, statusValues[0].Fulfilled, statusValues[0].MissingPayments])

    const [state, setState] = useState({
        Accepted: true,
        Rejected: true,
        MissingPayments: true,
        Fulfilled: true,
        NotReviewed: true,
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })

        let statuses = selectedStatus

        let name = event.target.name
        if (name === 'NotReviewed') name = statusValues[0].NotReviewed
        if (name === 'MissingPayments') name = statusValues[0].MissingPayments

        if (event.target.checked){
            statuses.push(name)
        }else{
            statuses.splice(statuses.indexOf(name), 1)
        }

        setSelectedStatus(statuses)

        console.log(selectedStatus)

      };

    return (
        <div className={classes.root}>
            <Grid container direction='column' className={classes.mainGrid} spacing={2}>
                <Title title={'Contracts Overview'}/>
                <Grid item sm={12} md={12} container>
                    <Grid item sm={false} md={1}/>
                    <Grid item sm={10}>
                        <Typography variant='body1' gutterBottom>You can filter Contracts by Status:</Typography>
                    <FormGroup row>
                    <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.NotReviewed}
                                onChange={handleChange}
                                name="NotReviewed"
                                color="primary"
                            />
                            }
                            label='Not Reviewed'
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.Accepted}
                                onChange={handleChange}
                                name="Accepted"
                                color="primary"
                            />
                            }
                            label='Accepted'
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.Rejected}
                                onChange={handleChange}
                                name="Rejected"
                                color="primary"
                            />
                            }
                            label='Rejected'
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.MissingPayments}
                                onChange={handleChange}
                                name="MissingPayments"
                                color="primary"
                            />
                            }
                            label='Missing a Payment'
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                checked={state.Fulfilled}
                                onChange={handleChange}
                                name="Fulfilled"
                                color="primary"
                            />
                            }
                            label='Fulfilled'
                        />
                        </FormGroup>
                    </Grid>
                </Grid>
                    <Grid item sm={12} md={12} container>
                        <Grid item sm={false} md={1}/>
                        {
                            contracts.length > 0
                            ? <Grid item sm={10} md={10}><ContractsAndTransactionsTable contracts={contracts} statusValues={selectedStatus} reviewTable={false} allStatusValues={statusValues}/></Grid>
                            : <Typography variant='h6'>No Contracts to Show</Typography>
                        }
                        <Grid item sm={false} md={1}/>
                    </Grid>
                </Grid>
        </div>
    )
}

export default ContractsOverview
