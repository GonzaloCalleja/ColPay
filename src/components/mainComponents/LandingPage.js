import { Typography, Paper, Grid, Container, Avatar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import LandingStepper from '../smallComponents/LandingStepper'
import Help from '../smallComponents/Help'

import backgroundTitle from '../../resources/Frame1.png'
import lockIcon from '../../resources/lock.png'
import speedIcon from '../../resources/speed.png'
import interestIcon from '../../resources/interest.png'
import priceIcon from '../../resources/price.png'

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    heroContent: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(5, 0, 0),
      },
      heroButtons: {
        marginTop: theme.spacing(4),
      },
      imageGrid: {
          display: 'flex',
          justifyContent: 'flex-end'
      },
      textRow: {
        padding: theme.spacing(5, 5, 5),
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1
      },
      textRowReverse: {
        padding: theme.spacing(5, 5, 5),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1
      },
      large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginTop: 10,
        marginBottom: 40,
      },
      side: {
        width: theme.spacing(60),
        height: theme.spacing(40),
        paddingTop: 5,
        paddingLeft: 12,
        marginTop: 80
      },
      column: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
      },  
      section: {
          marginBottom: '60px'
      },
      services: {
        backgroundColor: theme.palette.common.white,
        padding: theme.spacing(5, 0, 0),
      },

      paper: {
        padding: theme.spacing(3),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          padding: theme.spacing(4),
        },
      },

}));

const LandingPage = ({setLoggedIn}) => {

    const classes = useStyles()

    setLoggedIn(false)

    return (
        <Grid container direction='column'>
            <Grid item container className={classes.heroContent} id='home'>
                    <Grid item xs={1}/>
                    <Grid item xs={4}>
                        <Paper elevation={0} square className={classes.heroContent}>
                            <Typography color='secondary' variant='h2'>Achieve financial Health by extracting value out of your supply chain.</Typography>
                        </Paper>
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={6} className={classes.imageGrid}>
                    <img style={{ width: "100%", marginTop: '-145px', marginBottom: '-140px', marginLeft: '180px'}} src={backgroundTitle} alt="backgroundTitle" />
                </Grid>
            </Grid>

            <Grid item>
                <Paper elevation={0} square className={classes.textRow}>
                    <img style={{ width: "10%", marginRight: '20px'}} src={lockIcon} alt="lockIcon" />
                    <Typography color='primary' variant='h2'>Secure your transactions through blockchain</Typography>
                </Paper>
            </Grid>

            <Grid item>
                <Paper elevation={0} square className={classes.textRowReverse}>
                    <Typography color='primary' variant='h2' align='right'>Fragment payments to get the best terms</Typography>
                    <img style={{ width: "10%", marginLeft: '20px'}} src={speedIcon} alt="lockIcon" />
                </Paper>
            </Grid>

            <Grid item>
                <Paper elevation={0} square className={classes.textRow}>
                    <img style={{ width: "10%", marginRight: '20px'}} src={interestIcon} alt="lockIcon" />
                    <Typography color='primary' variant='h2' >Get cash without need for financing</Typography>
                </Paper>
            </Grid>

            <Grid item>
                <Container maxWidth="lg" id='about' className={classes.section}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" style={{marginTop: '65px', marginBottom: '40px'}} gutterBottom>
                        About Us
                    </Typography>
                    <Grid container spacing={10}>
                        <Grid item xs={4} className={classes.column}>
                            <Avatar alt="Transfer" variant='square' className={classes.large} src="https://image.flaticon.com/icons/png/512/2942/2942169.png" />
                            <Typography variant="h4" align="center" gutterBottom >For Manufacturers</Typography>
                            <Typography variant="h5" align="justify" color="textSecondary">Unlock the value of your company sales by having buyers pay your costs instead of waiting 120 days for full payment</Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.column}>
                            <Avatar alt="Transfer" variant='square' className={classes.large} src="https://image.flaticon.com/icons/png/512/3557/3557601.png" />
                            <Typography variant="h4" align="center" gutterBottom>For Everyone</Typography>
                            <Typography variant="h5" align="justify" color="textSecondary">Stop worrying about negotiating payment deadlines, and easily visualize how much capital will be available for future operations</Typography>

                        </Grid>
                        <Grid item xs={4} className={classes.column}>
                            <Avatar alt="Transfer" variant='square' className={classes.large} src="https://image.flaticon.com/icons/png/512/4270/4270090.png" />
                            <Typography variant="h4" align="center" gutterBottom>For Buyers</Typography>
                            <Typography variant="h5" align="justify" color="textSecondary">Automate the management of your Supply Chain disruption risk without limiting your cash reserves</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
            <Grid item className={classes.services}>
                <Container maxWidth="lg" id='services'>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" style={{paddingTop: '15px'}} gutterBottom>
                        Service
                    </Typography>
                    <Grid container spacing={10}>
                        <Grid item xs={6}>
                            <Typography variant="h5" align="left" color="textSecondary" paragraph>
                            ColPay offers an innovative, blockchain based solution for SMEs to address the cash flow problem generated from late payments.
                            </Typography>
                            <LandingStepper/>
                        </Grid>
                        <Grid item xs={6}>
                            <Avatar alt="Transfer" variant='square' className={classes.side} src="https://media.giphy.com/media/rztwmtV6Pitfrec6qt/giphy.gif" />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                    <Typography variant="h2" align="left" color="textSecondary" gutterBottom>
                        all in one single fee:
                    </Typography>
                    <Grid container>
                        <Grid item xs={6}>
                        <img style={{ width: "150%", marginLeft:'-110px', marginTop: '-400px', marginBottom: '-200px'}} src={priceIcon} alt="priceIcon" />
                        </Grid>
                        <Grid item xs={6} container direction='column'>
                            <Grid item xs={2} ></Grid>
                            <Grid item xs={8}><Typography color='primary' variant='h1' align='left' >Commision per Transaction</Typography></Grid>

                        </Grid>
                    </Grid>
                </Container>
            </Grid>
            <Grid item>
                <Help/>
            </Grid>
        </Grid>
    )
}

export default LandingPage
