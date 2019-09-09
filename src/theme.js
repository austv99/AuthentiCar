import {createMuiTheme} from '@material-ui/core/styles';
import {blue, cyan} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: cyan,
    },
    
    typography: { fontFamily: ['system-ui', 'sans-serif'].join(',')},
    shape:{borderRadius: 10},
    overrides: {
        MuiButton: {
            label: {
                '& > svg': {marginLeft: 8 },
            },
        },
    },

});



export default theme;
