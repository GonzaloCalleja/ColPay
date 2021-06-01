import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Last Payment
    </Typography>
      <Typography component="p" variant="h3">
        30 Eth
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 1 June, 2021
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View transactions
        </Link>
      </div>
    </React.Fragment>
  );
}