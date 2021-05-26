// Library Elements
import { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

// Components
import LandingPage from './LandingPage.js'
import DashboardColPay from './DashboardColPay.js'
import Navbar from './Navbar.js'
import Footer from './Footer.js'

const App = () => {

    const [account, setAccount] = useState('0x0')
    const [accountName, setAccountName] = useState('')

    const AccountsToName = {
        '0x60E497A5d341C41C831B3A3929ac096003418563': 'ColPay Admin',
        '0xcA6ac89A2B341B5a587b76e643c18f9F3AbFC2a2': 'Marcus Flanagan',
        '0x04740fBec153a27E49DC58f85608B23FBDbd3458': 'Gonzalo Calleja',
        '0x1686756Cf005277db353ACde42dd466A4c9233D2': 'Joe Maisy',
        '0x68825B1a6a4101Aa84C060C7FBb75aA22b1a70ad': 'Sara Clarke',
        '0xcaB9c47345A384ed10B01B6382E4Aa11228A48DF': 'Peter Sykes'
    }

    const onLoadAccount = async (newAccount)=>{
        setAccount(newAccount)
        setAccountName(AccountsToName[newAccount])
    }
    return (
        <div>
            <CssBaseline />
            <Router>
                <Navbar account={account} accountName={accountName}/>
                <div>
                    <Route path='/' exact component={LandingPage} /> 
                    <Route path='/app' exact component={()=>{return(<DashboardColPay onLoadAccount={onLoadAccount}/>)}} />
                </div>
                <Footer/>
            </Router>
        </div>
    )
}

export default App
