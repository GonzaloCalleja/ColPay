import { Grid, TextField, Paper, FormHelperText, InputLabel, Select, FormControl, MenuItem, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'

import Title from '../smallComponents/Title'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    mainGrid: {
        flexGrow: 1,
        marginTop: '50px'
    },
    textField: {
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(3),
      },
      button: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(3),
      },
      title:{
        marginTop: 5,
        marginBottom: 2,
    },
    formControl: {
        minWidth: 200,
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(3),
      },
      buttonGrid: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
      },
  }))


const RequestTransaction = ({onTransaction, contracts, statusValues }) => {
    const classes = useStyles()

    const [contractId, setContractId] = useState('')
    const [value, setValue] = useState('')

    const onSubmit = (e) => {

        e.preventDefault()

        if(value ===0 ){
            alert('Please complete the form to make a new transaction.')
            return
        }

        const etherValue = window.web3.utils.toWei(value.toString(), 'Ether')
    
        onTransaction(contractId, etherValue)

        setContractId('')
        setValue(0)
    }


    return (
        <div className={classes.root}>
            <Grid container direction='column' className={classes.mainGrid} spacing={2}>
                <Title title={'Request a Payment'}/>
                    <Grid item sm={12} md={12} container>
                        <Grid item sm={false} md={1}/>
                        <Grid item sm={10} md={10} >
                            <Paper className={classes.root}>
                                <Grid className={classes.title} container spacing={8}>
                                    <Grid item xs={12} md={4}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel >Contract</InputLabel>
                                            <Select
                                                required id="Contract Recipient"
                                                onChange={(e) => setContractId(e.target.value)}
                                                >
                                                {
                                                contracts.map((contract, key) => {
                                                    if(statusValues[0].Accepted === contract.statusName || statusValues.MissingPayments === contract.statusName){
                                                        return <MenuItem key={key} value={contract.id}>{contract.name}</MenuItem>
                                                    } else return null
                                                }
                                                )
                                                }
                                            </Select>
                                            <FormHelperText>Please select from the list of ColPay your ColPay Contracts</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField 
                                            required id="ConractName" 
                                            label="Value of Payment"
                                            placeholder='Enter the contract name' 
                                            value={value} 
                                            onChange={ (e) => setValue(e.target.value) }
                                            fullWidth 
                                            className={classes.textField}
                                            autoComplete="cc-number" />
                                    </Grid>
                                    <Grid item xs={12} md={4} className={classes.buttonGrid}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={ onSubmit }
                                            className={classes.button}
                                        >
                                        Create
                                        </Button>
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

export default RequestTransaction
