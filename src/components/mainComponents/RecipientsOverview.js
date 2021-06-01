import { Grid, FormGroup, FormControl, Checkbox, FormControlLabel, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'

import Title from '../smallComponents/Title'
import RecipientCard from '../smallComponents/RecipientCard'

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

const RecipientsOverview = ({contracts, statusValues}) => {

    const classes = useStyles()

    const [state, setState] = useState({
        Accepted: true,
        Rejected: true,
        MissingPayments: true,
        Fulfilled: true,
        NotReviewed: true,
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    let recipients = []
    let recipientNumber = 0

    for (let i=0; i < contracts.length; i++){

        let status = statusValues[contracts[i].status]

        if(state[status]){

            let recipientIncludedId = -1

            for (let j=0; j < recipientNumber; j++){
                if (recipients[j].id === contracts[i].partner){
                    recipientIncludedId = j
                }
            }

            if(recipientIncludedId == -1){
                let recipient = {
                    name: contracts[i].partnerName,
                    id: contracts[i].partner,
                    contracts: 1,
                    value: contracts[i].totalEther
                }
                recipients[recipientNumber] = recipient
                recipientNumber++
            }
            else {
                recipients[recipientIncludedId].contracts ++
                recipients[recipientIncludedId].value += contracts[i].totalEther
            }
        }
    }

    return (
        <div className={classes.root}>
            <Grid container direction='column' className={classes.mainGrid} spacing={2}>
                <Title title={'Partners'}/>
                <Grid item sm={12} md={12} container>
                    <Grid item sm={false} md={1}/>
                    <Grid item sm={10}>
                        <Typography variant='body1' gutterBottom>You can filter your Partners by the Status of the Contracs you have with them:</Typography>
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
                    <Grid item sm={12} md={10} container spacing={3}>
                            {
                            recipients.map((recipient, key) => (
                                <Grid item sm={12} lg={6}><RecipientCard recipient={recipient}/></Grid>
                            ))
                            }
                    </Grid>
                    <Grid item sm={false} md={1}/>
                </Grid>

            </Grid>
        </div>
    )
}

export default RecipientsOverview