import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ContractDurationForm from '../smallComponents/ContractDurationForm'
import ContractRecipientForm from '../smallComponents/ContractRecipientForm'
import ContractReviewForm from '../smallComponents/ContractReviewForm'
import ContractSpeedForm from '../smallComponents/ContractSpeedForm'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Contract Recipient and Value', 'Define Contract Duration', 'Configure Payment Fragmentation', 'Review the Contract'];
}

export default function StepperContract({onCreateContract, AccountsToName, account}) {
  const classes = useStyles();

  const [contractArguments, setContractArgumentsrguments] = useState(
    {
      name: '',
      totalAmount: '',
      recipient: '',
      startDate: '',
      expiryDate: '',
      daysToOpen: '',
      speed: '',
      createdBySeller: false
    }
  )

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleChange = (input) => e => {
    const values = contractArguments
    
    if (input === 'createdBySeller'){
      values[input] = e.target.checked
    }
    else {
      values[input] = e.target.value
    }
    //setContractArgumentsrguments(values)

    console.log(values)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

        if(!contractArguments.name || contractArguments.totalAmount ===0 || contractArguments.recipient ==='0x0' || contractArguments.startDate ===0 || contractArguments.expiryDate ===0 || contractArguments.daysToOpen ===0 || contractArguments.speed ===0){
            alert('Please complete all fields in the form correctly to submit a new contract.')
            return
        }

        const totalPrice = window.web3.utils.toWei(contractArguments.totalAmount.toString(), 'Ether')

        const start = Math.floor(Date.parse(contractArguments.startDate) / 1000).toString()
        const expire = Math.floor(Date.parse(contractArguments.expiryDate) / 1000).toString()

        onCreateContract(contractArguments.name, totalPrice, contractArguments.recipient, start, expire, contractArguments.daysToOpen, contractArguments.speed, contractArguments.createdBySeller)

        setContractArgumentsrguments(
          {
          name: '',
          totalAmount: 0,
          recipient: '0x0',
          startDate: '',
          expiryDate: '',
          daysToOpen: 0,
          speed: 0,
          createdBySeller: false
        })
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ContractRecipientForm handleChange={handleChange} AccountsToName={AccountsToName} contractArguments={contractArguments} account={account}/>;
      case 1:
        return <ContractDurationForm handleChange={handleChange} contractArguments={contractArguments}/>;
      case 2:
        return <ContractSpeedForm handleChange={handleChange} contractArguments={contractArguments}/>;
      case 3:
        return <ContractReviewForm contractArguments={contractArguments} AccountsToName={AccountsToName}/>;
      default:
        return 'Unknown step';
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={ activeStep === steps.length - 1 ? handleSubmit : handleNext }
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
