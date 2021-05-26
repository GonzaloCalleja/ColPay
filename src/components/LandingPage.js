import { Typography, Paper, Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Navbar from './Navbar.js'

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    heroContent: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(5, 0, 10),
      },
      heroButtons: {
        marginTop: theme.spacing(4),
      },
}));

const LandingPage = () => {

    const classes = useStyles()

    return (
        <Grid container direction='column'>
            <Grid item>
                <Navbar/>
            </Grid>
            <Grid item container className={classes.heroContent}>
                    <Grid item xs={1}/>
                    <Grid item xs={4}>
                        <Paper elevation={0} square className={classes.heroContent}>
                            <Typography color='secondary' variant='h2'>Achieve financial Health by extracting value out of your supply chain.</Typography>
                        </Paper>
                </Grid>
            </Grid>
            <Grid item>
                <Container maxWidth="sm" id='about'>
                    <div className={classes.toolbar} />
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Something short and leading about the collection below—its contents, the creator, etc.
                        Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                        entirely.
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Something short and leading about the collection below—its contents, the creator, etc.
                        Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                        entirely.
                    </Typography>
                </Container>
            </Grid>
            <Grid item>
                <Container maxWidth="sm" id='services'>
                <div className={classes.toolbar} />
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Services
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Something short and leading about the collection below—its contents, the creator, etc.
                        Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                        entirely.
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Something short and leading about the collection below—its contents, the creator, etc.
                        Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                        entirely.
                    </Typography>
                </Container>
            </Grid>
            <Grid item>
                <Container maxWidth="sm" id='contact'>
                <div className={classes.toolbar} />
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Contact Us
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Something short and leading about the collection below—its contents, the creator, etc.
                        Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                        entirely.
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Something short and leading about the collection below—its contents, the creator, etc.
                        Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                        entirely.
                    </Typography>
                </Container>
            </Grid>
        </Grid>
    )
}

export default LandingPage
