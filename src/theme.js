import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3a8f69',
    },
    secondary: {
      main: '#fff',
    },
    darkBackground: {
      main: '#333333'
    }
  },
  mixins: {
    toolbar:{
      minHeight: 100,
    }
  }
});

export default theme

/*

dark: #333333
background: #FCFAF9
other background: #E6E8E3

*/

