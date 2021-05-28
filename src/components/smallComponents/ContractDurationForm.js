import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography, Grid} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  title:{
    marginTop: 20
}
}));

const ContractDurationForm = ({handleChange, contractArguments}) => {

    const classes = useStyles()

    return (
        <React.Fragment>
            <Typography className={classes.title} variant="h6" gutterBottom>Contract Duration Informaion</Typography>
            <Grid className={classes.container} container spacing={3}>
                <Grid item xs={12} md={6}>
                <TextField
                    id="datetime-local"
                    label="Contract Start Time"
                    type="datetime-local"
                    defaultValue={contractArguments.startDate}
                    className={classes.textField}
                    onChange={handleChange('startDate')}
                    InputLabelProps={{
                    shrink: true,
                    required: true,
                    }}
                />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                    id="datetime-local"
                    label="Contract Expiry Time"
                    type="datetime-local"
                    defaultValue={contractArguments.expiryDate}
                    onChange={handleChange('expiryDate')}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    required: true,
                    }}
                />
                </Grid>
               
            </Grid>
        </React.Fragment>
    )
}

export default ContractDurationForm