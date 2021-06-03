import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Title from '../smallComponents/Title'
import Help from '../smallComponents/Help'

const useStyles = makeStyles(() => ({
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
    }
  }))

const AppHelp = () => {

    const classes = useStyles()


    return (
        <div className={classes.root}>
            <Grid container direction='column' className={classes.mainGrid} spacing={2}>
                <Title title={'Help & Support'}/>
                    <Grid item sm={12} md={12} container>
                        <Grid item sm={false} md={1}/>
                        <Grid item sm={10} md={10}><Help/></Grid>
                        <Grid item sm={false} md={1}/>
                    </Grid>
                </Grid>
        </div>
    )
}

export default AppHelp