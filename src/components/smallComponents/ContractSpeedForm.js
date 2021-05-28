import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography, Grid} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    marginTop: 20
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  rightText: {
    textAlign: "right",
    fontWeight: theme.typography.fontWeightBold
  },
  title:{
    marginTop: 20
}
}));

const ContractSpeedForm = ({handleChange, contractArguments}) => {

    const classes = useStyles()

    return (
        <React.Fragment>
            <Typography className={classes.title} variant="h6" gutterBottom>Payment Process Details</Typography>
            <Grid className={classes.container} container spacing={2}>
                <Grid item xs={2} md={2}><Typography  color='primary' className={classes.rightText} variant="body2" >DAYS TO OPEN</Typography></Grid>
                <Grid item xs={8} md={10}><Typography   variant="body2" >Indicates how many days will pass before the seller is allowed to request a payment</Typography></Grid>
                <Grid item xs={2} md={2}><Typography  color='primary' className={classes.rightText} variant="body2" >SPEED</Typography></Grid>
                <Grid item xs={8} md={8}><Typography   variant="body2" >Indicates what percentage of the contract value the seller will be allowed to request every day (i.e.: if it is set at 90%, when half of the contract time has passed, the seller will be able to request 45% of the full contract value)</Typography></Grid>
            </Grid>
            <Grid className={classes.container} container spacing={3}>
                
                <Grid item xs={12} md={6}>
                <TextField
                    required id="ContractDaysToOpen" 
                    label="Days to Open the Contract"
                    placeholder='Enter number of Days to Open the Contract' 
                    onChange={handleChange('daysToOpen')}
                    defaultValue={contractArguments.daysToOpen}
                    fullWidth 
                    autoComplete="cc-number"
                />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                    required id="ContractSpeed" 
                    label="Conract Speed (%)"
                    placeholder='Enter the contract speed' 
                    onChange={handleChange('speed')}
                    defaultValue={contractArguments.speed}
                    fullWidth 
                    autoComplete="cc-number"
                />
                </Grid>
               
            </Grid>
        </React.Fragment>
    )
}

export default ContractSpeedForm