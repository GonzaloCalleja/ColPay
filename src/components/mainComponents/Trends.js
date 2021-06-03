import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Title from '../smallComponents/Title'
import Chart from '../smallComponents/Chart'
import Deposits from '../smallComponents/Deposits'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    mainGrid: {
        flexGrow: 1,
        marginTop: '50px'
    },
    subtitle:{
        marginTop: '5px',
        fontSize: '1.9rem'
    },
    fixedHeightPaper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 300,
      },
  }))

const Trends = () => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid container direction='column' className={classes.mainGrid} spacing={2}>
                <Title title={'Trends'}/>
                    <Grid item sm={12} md={12} container spacing={2}>
                        <Grid item sm={false} md={1}/>
                        <Grid item sm={8} md={7}>
                            <Paper className={classes.fixedHeightPaper}>
                                <Chart/>
                            </Paper>
                        </Grid>
                        <Grid item sm={2} md={3}>
                            <Paper className={classes.fixedHeightPaper}>
                                <Deposits />
                            </Paper>
                        </Grid>
                        <Grid item sm={false} md={1}/>
                    </Grid>
                </Grid>
        </div>
    )
}

export default Trends