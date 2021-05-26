// Library Elements
import { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

// Components
import LandingPage from './LandingPage.js'
import DashboardColPay from './DashboardColPay.js'
import Navbar from './Navbar.js'
import Footer from './Footer.js'

const App = () => {

    const [account, setAccount] = useState('0x0')
    const [accountName, setAccountName] = useState('')

    const paths = [
        '/',
        '/app'
    ]

    // This information would live in ColPays backend and be secured in normal application.
    const AccountsToName = {
        '0x60E497A5d341C41C831B3A3929ac096003418563': 'ColPay Admin',
        '0xcA6ac89A2B341B5a587b76e643c18f9F3AbFC2a2': 'Marcus Flanagan',
        '0x04740fBec153a27E49DC58f85608B23FBDbd3458': 'Gonzalo Calleja',
        '0x1686756Cf005277db353ACde42dd466A4c9233D2': 'Joe Maisy',
        '0x68825B1a6a4101Aa84C060C7FBb75aA22b1a70ad': 'Sara Clarke',
        '0xcaB9c47345A384ed10B01B6382E4Aa11228A48DF': 'Peter Sykes',
        '0xaCFB095BC6AC0F2B258bA4E11D3b61Bb71D85dB2': 'John Doe',
        '0x72396Ab101470cfe264E11c4E2c4fF381A60Eb1e': 'Jean Doe',
        '0x8339f82b9bcC39FDF85901daCABD395F20688DB0': 'Chris Collins',
        '0xFd7acFdb450b6c15D0bA5Aa8599518aF6400239C': 'Duarte Gross'
    }

    const onLoadAccount = async (newAccount)=>{
        setAccount(newAccount)
        setAccountName(AccountsToName[newAccount])
    }    

    const [mobileOpen, setMobileOpen] = useState(false)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div>
            <CssBaseline />
            <Router>
                <Navbar account={account} accountName={accountName} handleDrawerToggle={handleDrawerToggle}/>
                <div>
                    { (!paths.includes(window.location.pathname)) && <Route render={()=>(<Redirect to='/'/>)} /> }
                    <Route path='/' exact component={LandingPage} /> 
                    <Route path='/app' exact component={()=>{return(<DashboardColPay onLoadAccount={onLoadAccount} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>)}} />
                </div>
                <Footer/>
            </Router>
        </div>
    )
}

export default App
