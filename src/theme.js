import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3a8f69'
    },
    secondary: {
      main: '#fff',
    },

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

