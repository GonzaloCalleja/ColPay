// Library Elements
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

// Components
import LandingPage from './LandingPage.js'
import DashboardColPay from './DashboardColPay.js'
import Footer from './Footer.js'

const App = () => {
    return (
        <div>
            <CssBaseline />
            <Router>
                <div>
                    <Route path='/' exact component={LandingPage} /> 
                    <Route path='/account' exact component={DashboardColPay} />
                </div>
            </Router>
            <Footer/>
        </div>
    )
}

export default App
