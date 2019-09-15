import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import SavedContext from '../contexts/SavedContext';
import PropsContext from '../contexts/PropsContext';
import LoginContext from '../contexts/LoginContext';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    title: {
      flexGrow: 1,
    },
  }));

  const clearAll = (savedContext, propsContext, loginContext) => {
    savedContext.clearSaved();
    propsContext.clearProps();
    loginContext.clearLogin();
    
  }
  



const AccountTopBar = (props) => {
    const classes = useStyles();
    const savedContext = useContext(SavedContext);
    const propsContext = useContext(PropsContext);
    const loginContext = useContext(LoginContext);
    let log = [];
    if (loginContext.loginCount > 0) {
      log.push(
        <Grid item>
                <Button 
                  color="inherit"
                  component={Link}
                  to="/log"
                  >
                  Log Car
                </Button>
              </Grid>
      );
    }

    return (
        <div className={classes.root}>
          <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Grid item>
              {/* <Typography 
                variant="h6" 
                className={classes.title}
                component={Route}
                path="/"
                >
                AuthentiCar
              </Typography> */}
              <Button 
                color="inherit"
                component={Link}
                to="/"
              >
                AuthentiCar
              </Button>
              </Grid>
              {log}
              <Grid item>
                <Button 
                  color="inherit"
                  component={Link}
                  to="/login"
                  onClick={() => {
                    clearAll(savedContext, propsContext, loginContext);
                  }}
                  >
                  Sign Out
                </Button>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>
      );
}

export default AccountTopBar;