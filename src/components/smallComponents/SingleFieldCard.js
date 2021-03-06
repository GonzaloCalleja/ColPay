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
    width: '100%'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginLeft: 10
  },
  description: {
    marginTop: 20
  },
});

export default function SingleFieldCard({title, value, unit, description, action, onClick}) {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {title}
        </Typography>
        <Typography display="inline" variant="h5" component="h2">
          {value} 
        </Typography>
        <Typography display="inline" className={classes.pos} color="textSecondary">
         {unit}
        </Typography>
        <Typography className={classes.description} variant="body2" component="p">
        {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClick}>{action}</Button>
      </CardActions>
    </Card>
  );
}
