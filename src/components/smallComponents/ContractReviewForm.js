import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  sectionTitle: {
    marginTop: 20,
  },
}));

export default function ContractReviewForm({contractArguments, AccountsToName}) {
  const classes = useStyles();

  const recipientName = AccountsToName[0][contractArguments.recipient]

  return (
    <React.Fragment>
      <Typography classsName={classes.sectionTitle} variant="h6" gutterBottom>
        Contract Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4}>
          <Typography variant="button" gutterBottom className={classes.title}>
            Contract Name
          </Typography>
          <Typography variant='body1' gutterBottom>{contractArguments.name}</Typography>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Typography variant="button" gutterBottom className={classes.title}>
            Recipient
          </Typography>
          <Typography variant='body1' gutterBottom>{recipientName}</Typography>
        </Grid><Grid item xs={6} sm={4}>
          <Typography variant="button" gutterBottom className={classes.title}>
            Contract Value
          </Typography>
          <Typography variant='body1' gutterBottom>{contractArguments.totalAmount} Eth</Typography>
        </Grid><Grid item xs={6} sm={4}>
          <Typography variant="button" gutterBottom className={classes.title}>
            Start Date
          </Typography>
          <Typography variant='body1' gutterBottom>{contractArguments.startDate}</Typography>
        </Grid>
        <Grid item xs={6} sm={8}>
          <Typography variant="button" gutterBottom className={classes.title}>
            Expiry Date
          </Typography>
          <Typography variant='body1' gutterBottom>{contractArguments.expiryDate}</Typography>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Typography variant="button" gutterBottom className={classes.title}>
            Days To Open
          </Typography>
          <Typography variant='body1' gutterBottom>{contractArguments.daysToOpen}</Typography>
        </Grid>
        <Grid item xs={6} sm={8}>
          <Typography variant="button" gutterBottom className={classes.title}>
            Speed
          </Typography>
          <Typography variant='body1' gutterBottom>{contractArguments.speed} %</Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
        <Typography variant="button" gutterBottom className={classes.title}>
            Statement
          </Typography>
          {
            contractArguments.createdBySeller
            ?  <Typography variant='body1' gutterBottom>The creator of the contract is owed {contractArguments.totalAmount} Eth by {recipientName}.</Typography>
            :  <Typography variant='body1' gutterBottom>The creator of the contract owes {contractArguments.totalAmount} Eth to {recipientName}.</Typography>}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}