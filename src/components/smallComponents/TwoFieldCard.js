import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    height: "100%",
    width: '100%'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginLeft: 10
  },
  description: {
    marginTop: 25
  }
});

export default function TwoFieldCard ({potentialDebt, incurredDebt}) {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography component="h2" variant="h6" noWrap color="primary" >
            CURRENT DEBT
        </Typography>
        <Typography display="inline" variant="h5" component="h2">
          {incurredDebt} 
        </Typography>
        <Typography display="inline" className={classes.pos} color="textSecondary">
         Eth
        </Typography>
        <Typography component="h2" variant="h6" noWrap color="primary" className={classes.description} >
            NOT REVIEWED DEBT
        </Typography>
        <Typography display="inline" variant="h5" component="h2">
          {potentialDebt} 
        </Typography>
        <Typography display="inline" className={classes.pos} color="textSecondary">
         Eth
        </Typography>
      </CardContent>
    </Card>
  );
}
