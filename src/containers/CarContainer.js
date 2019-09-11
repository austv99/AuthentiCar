import React from 'react';
import TopBar from '../components/TopBar';
// import CarComponent from '../components/CarComponent';
import Grid from '@material-ui/core/Grid';
import hondaNsx from '../assets/honda.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(them => ({
    itemGrid: {
        marginTop: 64,
    },
    media: {
        height: 245,
    }

}))

const CarContainer = props => {
    const classes = useStyles();
    return (
    <>
    <TopBar />
    <Grid container spacing={2} justify='center' className={classes.itemGrid}>
        <Grid item>
        <Typography gutterBottom variant="h5" component="h2">
            Honda NSX
          </Typography>
        </Grid>
        <Grid item>
            <img src={hondaNsx} className={classes.media}/>
        </Grid>

        <Grid item>
        <Typography gutterBottom variant="h5" component="h2">
        
          </Typography>
        </Grid>
        

     
        
     </Grid>
     </>
    )
};

export default CarContainer; 