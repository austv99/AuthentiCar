import React from 'react';
import TopBar from '../components/TopBar';
import data from '../constants/car-items.json'
import CarComponent from '../components/CarComponent';
import Grid from '@material-ui/core/Grid';
// import hondaNsx from '../assets/honda.jpg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(them => ({
    itemGrid: {
        marginTop: 64,
    }

}))

const MainContainer = props => {
    const classes = useStyles();
    return (
    <>
    <TopBar />
    <Grid 
        container 
        spacing={2} 
        justify='center' 
        className={classes.itemGrid}
    >
        {data.items.map(x => (
            <Grid item key={x.id}>
                <CarComponent {...x}/>
            </Grid>
        ))}
        
     </Grid>
     </>
    )
};

export default MainContainer; 