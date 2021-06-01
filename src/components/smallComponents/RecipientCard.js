import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    width: '100%'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginLeft: 10
  },
  description: {
    marginTop: 15
  },
});

export default function RecipientCard({ recipient}) {
  const classes = useStyles();

  const {id, name, contracts,  value } = recipient
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {name}
        </Typography>
        <Typography display="inline" variant="h5" component="h2">
          {contracts} 
        </Typography>
        <Typography display="inline" className={classes.pos} color="textSecondary">
         Total Contracts
        </Typography>
        <br/>
        <br/>
        <Typography display="inline" variant="h5" component="h2">
          {value} 
        </Typography>
        <Typography display="inline" className={classes.pos} color="textSecondary">
         Eth Total Value
        </Typography>
        <Typography className={classes.description} variant="body2" color="textSecondary">
        ColPay ID:
        </Typography>
        <Typography  variant="body2" component="p" color="textSecondary">
        {id}
        </Typography>
      </CardContent>
    </Card>
  );
}