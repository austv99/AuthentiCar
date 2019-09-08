import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
  



const TopBar = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Grid item>
              <Typography variant="h6" className={classes.title}>
                AuthentiCar
              </Typography>
              </Grid>
              <Grid item>
              <Button color="inherit">Login</Button>
                </Grid>
            </Toolbar>
          </AppBar>
        </div>
      );
}

export default TopBar;