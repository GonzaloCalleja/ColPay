import { Grid, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    divider:{
        marginBottom: '15px'
    },
}))

const Title = ({title}) => {
    
    const classes = useStyles()

    return (
        <Grid container>
            <Grid item sm={false} md={1}/>
            <Grid item sm={10}>
                <Typography variant='h4' gutterBottom>{title}</Typography>
                <Divider className={classes.divider}/>
            </Grid>
        </Grid>
    )
}

export default Title
