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

    const onLoadAccount = async (newAccount)=>{
        setAccount(newAccount)
    }
    return (
        <div>
            <CssBaseline />
            <Router>
                <Navbar account={account}/>
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
