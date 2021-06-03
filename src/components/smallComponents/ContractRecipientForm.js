import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography, Grid, FormControlLabel, FormControl, Checkbox, MenuItem, FormHelperText, Select, InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
    },
    title:{
        marginTop: 20
    }
  }));

const ContractRecipientForm = ({handleChange, AccountsToName, contractArguments, account}) => {

    const classes = useStyles()

    return (
        <React.Fragment>
            <Typography className={classes.title} variant="h6" gutterBottom>Basic Contract Informaion</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                <TextField 
                    required id="ConractName" 
                    label="Conract Name"
                    placeholder='Enter the contract name' 
                    onChange={handleChange('name')}
                    defaultValue={contractArguments.name}
                    fullWidth 
                    autoComplete="cc-name" />
                </Grid>
                <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                    <InputLabel >Recipient</InputLabel>
                    <Select
                    required id="Contract Recipient"
                    defaultValue={contractArguments.recipient}
                    onChange={handleChange('recipient')}
                    >
                    {
                        Object.entries(AccountsToName[0]).map(([address, name], key) => {
                            if (account !== address ){
                                return (<MenuItem key={key} value={address}>{name}</MenuItem>)
                            } else return null
                        })
                    }
                    </Select>
                    <FormHelperText>Please select from the list of ColPay Members</FormHelperText>
                </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                    required id="ContractValue" 
                    label="Conract Value (Eth)"
                    placeholder='Enter the contract value in Ether' 
                    onChange={handleChange('totalAmount')}
                    defaultValue={contractArguments.totalAmount}
                    fullWidth 
                    autoComplete="cc-number"
                />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox color="primary" name="saveCard" value="yes" />}
                    label="Please select if you are the seller in this contract *"
                    onChange={handleChange('createdBySeller')}
                />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ContractRecipientForm
