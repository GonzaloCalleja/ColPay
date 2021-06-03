// Library Elements
import { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

// Components
import LandingPage from './mainComponents/LandingPage.js'
import ColPayAppLogic from './mainComponents/ColPayAppLogic.js'
import Navbar from './mainComponents/Navbar.js'
import Footer from './mainComponents/Footer.js'
import ScrollToTop from './smallComponents/ScrollToTop.js'

const App = () => {

    const [account, setAccount] = useState('0x0')
    const [accountName, setAccountName] = useState('')


    const paths = useState(
        {
        home: '/',
        appMain: '/app',
        appMyAccount: '/app/my-account',
        appMyProfile: '/app/my-profile',
        appCreateContract: '/app/create-contract',
        appReviewContract: '/app/review-contract',
        appUpload: '/app/upload-invoice',
        appRequest: '/app/request-payment',
        appRecurring: '/app/recurring-transaction',
        appTransactions: '/app/all-transactions',
        appContractsOverview: '/app/all-conracts',
        appRecipients: '/app/view-recipients',
        appMore: '/app/more',
        appTrends: '/app/Trends',
        appHelp: '/app/Help'
        }
    )
    // This information would live in ColPays backend and be secured in normal application.
    const AccountsToName = useState({
        '0x60E497A5d341C41C831B3A3929ac096003418563': 'ColPay Admin',
        '0xcA6ac89A2B341B5a587b76e643c18f9F3AbFC2a2': 'Marcus Flanagan',
        '0x04740fBec153a27E49DC58f85608B23FBDbd3458': 'Gonzalo Calleja',
        '0x1686756Cf005277db353ACde42dd466A4c9233D2': 'Joe Maisy',
        '0x68825B1a6a4101Aa84C060C7FBb75aA22b1a70ad': 'Sara Clarke',
        '0xcaB9c47345A384ed10B01B6382E4Aa11228A48DF': 'Peter Sykes',
        '0xaCFB095BC6AC0F2B258bA4E11D3b61Bb71D85dB2': 'Claire Du Bois',
        '0x72396Ab101470cfe264E11c4E2c4fF381A60Eb1e': 'Jean Doe',
        '0x8339f82b9bcC39FDF85901daCABD395F20688DB0': 'Chris Collins',
        '0xFd7acFdb450b6c15D0bA5Aa8599518aF6400239C': 'Duarte Jameson'
    })

    const onLoadAccount = async (newAccount)=>{
        setAccount(newAccount)
        setAccountName(AccountsToName[0][newAccount])
    }    

    const [mobileOpen, setMobileOpen] = useState(false)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    return (
        <div>
            <CssBaseline />
            <Router>
                <ScrollToTop />
                <Navbar account={account} accountName={accountName} handleDrawerToggle={handleDrawerToggle} paths={paths}/>
                <div>
                    { !Object.values(paths[0]).includes(window.location.pathname) && <Route render={()=>(<Redirect to={paths[0].home}/>)} /> }
                    <Switch>
                        <Route path={paths[0].home} exact component={LandingPage} /> 
                        <Route path={paths[0].appMain} component={()=>{return(<ColPayAppLogic AccountsToName={AccountsToName} paths={paths} onLoadAccount={onLoadAccount} accountName={accountName} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>)}} />
                    </Switch>
                </div>
                <Footer paths={paths}/>
            </Router>
        </div>
    )
}

export default App
