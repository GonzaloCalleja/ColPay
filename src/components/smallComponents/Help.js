import { Typography, Paper, Grid, Container, TextField, Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import HeadsetIcon from '@material-ui/icons/Headset';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


const useStyles = makeStyles((theme) => ({

    paper: {
        padding: theme.spacing(3),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          padding: theme.spacing(4),
        },
      },

}))

const Help = () => {

    const classes = useStyles()

    return (
        <Container maxWidth="lg" id='contact' style={{paddingTop: '60px'}}>
                    <Paper className={classes.paper}>
                    <Typography component="h1" variant="h3" align="left" color="textSecondary" gutterBottom>
                        Get in touch
                    </Typography>
                        <Grid container spacing={10}>
                            <Grid item xs={8} container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="Name"
                                        name="lastName"
                                        label="Name"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        required
                                        variant="outlined"
                                        id="email"
                                        name="lastName"
                                        label="Email"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                        required
                                        variant="outlined"
                                        id="message"
                                        name="lastName"
                                        label="Subject"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Message"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    defaultValue="I would like to share "
                                    variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Button color='primary' variant='contained' size="large">
                                        Send Message
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={4} container spacing={5}>
                                <Grid item xs={2}><HeadsetIcon fontSize="large"/></Grid>
                                <Grid item xs={10}><Typography>Call:</Typography><Typography>012-345-6789</Typography></Grid>
                                <Grid item xs={2}><MailOutlineIcon fontSize="large"/></Grid>
                                <Grid item xs={10}><Typography>Email:</Typography> <Typography>helpcenter@colpay.com</Typography></Grid>
                                <Grid item xs={2}><LocationOnIcon fontSize="large"/></Grid>
                                <Grid item xs={10}><Typography>Location:</Typography> <Typography>Pseo Rios, Madrid, 28225, Spain</Typography></Grid>
                                <Grid item xs={12}>
                                <Typography variant="h5" align="left" color="textSecondary" gutterBottom>
                                    Follow
                                </Typography>
                                <IconButton style={{marginRight: '15'}}><InstagramIcon /></IconButton>
                                <IconButton style={{marginRight: '10'}}><FacebookIcon /></IconButton>
                                <IconButton style={{marginRight: '10'}}><TwitterIcon /></IconButton>
                                <IconButton style={{marginRight: '0'}}><LinkedInIcon /></IconButton>
                                </Grid>
                            </Grid>
                            
                        </Grid>
                    </Paper>
                </Container>
    )
}

export default Help
