import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(1),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
  <Typography variant="h5" align="left" color="textPrimary">Create a contract</Typography>, 
  <Typography variant="h5" align="left" color="textPrimary">Get your contract accepted</Typography>,
  <Typography variant="h5" align="left" color="textPrimary">Execute Payments when needed</Typography>
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Upload all the information about the payment terms on the ColPay Platform.`;
    case 1:
      return 'Send the contract to your business partner, so they can review the contract, and accept it. Until then, the contract will not activate.';
    case 2:
      return `The seller will be able to request payments from the smart contract by uploading an invoice to the platform.`;
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper  orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label} active = {true} >
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}